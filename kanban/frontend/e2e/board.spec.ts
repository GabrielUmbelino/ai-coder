import { expect, test, type Locator, type Page } from "@playwright/test";

const column = (page: Page, name: string) =>
  page.getByRole("region", { name, exact: true });

const cardIn = (page: Page, columnName: string, title: string) =>
  column(page, columnName).getByRole("listitem").filter({ hasText: title });

const titlesIn = (page: Page, columnName: string) =>
  column(page, columnName).getByRole("heading", { level: 3 });

const countIn = (page: Page, columnName: string) =>
  column(page, columnName).locator("header span");

/**
 * dnd-kit listens for pointer events, so `dragTo` is not enough: the pointer
 * has to travel far enough to pass the sensor's activation distance and then
 * settle over the target before release.
 */
async function dragCard(
  page: Page,
  source: Locator,
  target: Locator,
  edge: "center" | "top" = "center",
) {
  const from = (await source.boundingBox())!;
  const to = (await target.boundingBox())!;

  const startX = from.x + from.width / 2;
  const startY = from.y + from.height / 2;
  const endX = to.x + to.width / 2;
  const endY = edge === "top" ? to.y + 4 : to.y + to.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY + 8, { steps: 4 });
  await page.mouse.move(endX, endY, { steps: 25 });
  await page.mouse.move(endX, endY, { steps: 4 });
  await page.mouse.up();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("opens with the seeded board", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Product Board" })).toBeVisible();
  await expect(page.getByRole("region")).toHaveCount(5);

  for (const [name, count] of [
    ["Backlog", "3"],
    ["To Do", "2"],
    ["In Progress", "2"],
    ["Review", "1"],
    ["Done", "2"],
  ] as const) {
    await expect(countIn(page, name)).toHaveText(count);
  }

  await expect(titlesIn(page, "Backlog").first()).toHaveText(
    "Audit onboarding funnel",
  );
});

test("renames a column", async ({ page }) => {
  await page.getByRole("button", { name: "Backlog", exact: true }).click();

  const input = page.getByRole("textbox", { name: "Column name" });
  await input.fill("Ideas");
  await input.press("Enter");

  await expect(page.getByRole("button", { name: "Ideas", exact: true })).toBeVisible();
  await expect(column(page, "Ideas")).toBeVisible();
  await expect(page.getByRole("region", { name: "Backlog" })).toHaveCount(0);
});

test("adds a card to the end of a column", async ({ page }) => {
  const review = column(page, "Review");

  await review.getByRole("button", { name: "Add card" }).click();
  await review.getByLabel("Card title").fill("Review the release notes");
  await review.getByLabel("Card details").fill("Check the breaking changes list");
  await review.getByRole("button", { name: "Add card" }).click();

  await expect(countIn(page, "Review")).toHaveText("2");
  await expect(titlesIn(page, "Review").last()).toHaveText(
    "Review the release notes",
  );
  await expect(
    review.getByText("Check the breaking changes list"),
  ).toBeVisible();
});

test("deletes a card", async ({ page }) => {
  const card = cardIn(page, "Backlog", "Refresh pricing page copy");
  await card.hover();
  await card.getByRole("button", { name: /^Delete/ }).click();

  await expect(countIn(page, "Backlog")).toHaveText("2");
  await expect(titlesIn(page, "Backlog")).toHaveText([
    "Audit onboarding funnel",
    "Evaluate error tracking vendors",
  ]);
});

test("drags a card into another column", async ({ page }) => {
  await dragCard(
    page,
    cardIn(page, "Backlog", "Audit onboarding funnel"),
    cardIn(page, "In Progress", "Rebuild the settings layout"),
  );

  await expect(countIn(page, "Backlog")).toHaveText("2");
  await expect(countIn(page, "In Progress")).toHaveText("3");
  await expect(titlesIn(page, "In Progress")).toContainText([
    "Audit onboarding funnel",
  ]);
  await expect(titlesIn(page, "Backlog")).toHaveText([
    "Refresh pricing page copy",
    "Evaluate error tracking vendors",
  ]);
});

test("drags a card into an empty column", async ({ page }) => {
  const review = cardIn(page, "Review", "Tighten password reset flow");
  await review.getByRole("button", { name: /^Delete/ }).click();
  await expect(countIn(page, "Review")).toHaveText("0");

  await dragCard(
    page,
    cardIn(page, "Done", "Fix timezone drift in reports"),
    column(page, "Review"),
  );

  await expect(countIn(page, "Review")).toHaveText("1");
  await expect(titlesIn(page, "Review")).toHaveText([
    "Fix timezone drift in reports",
  ]);
});

test("reorders cards within a column", async ({ page }) => {
  await dragCard(
    page,
    cardIn(page, "Backlog", "Evaluate error tracking vendors"),
    cardIn(page, "Backlog", "Audit onboarding funnel"),
    "top",
  );

  await expect(countIn(page, "Backlog")).toHaveText("3");
  await expect(titlesIn(page, "Backlog")).toHaveText([
    "Evaluate error tracking vendors",
    "Audit onboarding funnel",
    "Refresh pricing page copy",
  ]);
});
