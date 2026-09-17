import {
  SYSTEM_PROMPT,
  offlineAnswer,
  resolveProvider,
} from "@/lib/twin";

export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 12;
const MAX_CHARS = 1200;

/* -------------------------- rate limiting -------------------------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 25;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_REQUESTS;
}

/* ----------------------------- helpers ----------------------------- */

function textStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const chunks = text.match(/\S+\s*/g) ?? [text];
  let i = 0;

  return new ReadableStream({
    async pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[i++]));
      await new Promise((r) => setTimeout(r, 18));
    },
  });
}

/** Re-emits an OpenAI-compatible SSE stream as plain text deltas. */
function relayStream(upstream: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const parser = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });

      // SSE frames are newline-delimited; keep the trailing partial line.
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;

        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;

        try {
          const json = JSON.parse(payload);
          const delta = json.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length) {
            controller.enqueue(encoder.encode(delta));
          }
        } catch {
          // Keep-alive or non-JSON frame — nothing to emit.
        }
      }
    },
  });

  return upstream.pipeThrough(parser);
}

const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store, no-transform",
  "X-Accel-Buffering": "no",
};

/* ------------------------------ handler ---------------------------- */

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (rateLimited(ip)) {
    return new Response(
      "I've hit my limit for now — give it a few minutes, or email gabriel.f.umbelino@gmail.com directly.",
      { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body?.messages)) messages = body.messages;
  } catch {
    return new Response("Malformed request.", { status: 400 });
  }

  const history = messages
    .filter(
      (m): m is ChatMessage =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  const lastUser = [...history].reverse().find((m) => m.role === "user");
  if (!lastUser) return new Response("No question provided.", { status: 400 });

  const provider = resolveProvider();

  // No key configured — fall back to the deterministic local responder so the
  // feature still works out of the box.
  if (!provider.apiKey) {
    return new Response(textStream(offlineAnswer(lastUser.content)), {
      headers: { ...STREAM_HEADERS, "X-Twin-Mode": "offline" },
    });
  }

  try {
    const upstream = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        stream: true,
        max_tokens: 500,
        temperature: 0.6,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => "");
      console.error(
        `[twin] ${provider.name} responded ${upstream.status}: ${detail.slice(0, 400)}`
      );
      return new Response(textStream(offlineAnswer(lastUser.content)), {
        headers: { ...STREAM_HEADERS, "X-Twin-Mode": "offline-fallback" },
      });
    }

    return new Response(relayStream(upstream.body), {
      headers: { ...STREAM_HEADERS, "X-Twin-Mode": "live" },
    });
  } catch (error) {
    console.error("[twin] upstream request failed:", error);
    return new Response(textStream(offlineAnswer(lastUser.content)), {
      headers: { ...STREAM_HEADERS, "X-Twin-Mode": "offline-fallback" },
    });
  }
}
