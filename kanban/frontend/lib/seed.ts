import type { Column } from "./types";

export const initialColumns: Column[] = [
  {
    id: "col-backlog",
    title: "Backlog",
    cards: [
      {
        id: "card-1",
        title: "Audit onboarding funnel",
        details: "Pull drop-off numbers for each signup step and note the worst two.",
      },
      {
        id: "card-2",
        title: "Refresh pricing page copy",
        details: "Marketing wants the enterprise tier described in plainer language.",
      },
      {
        id: "card-3",
        title: "Evaluate error tracking vendors",
        details: "Compare pricing and retention across the three shortlisted tools.",
      },
    ],
  },
  {
    id: "col-todo",
    title: "To Do",
    cards: [
      {
        id: "card-4",
        title: "Add keyboard shortcuts to editor",
        details: "Cover save, duplicate and delete. Document them in the help panel.",
      },
      {
        id: "card-5",
        title: "Split billing service from API",
        details: "Move invoice generation behind its own queue so retries stop blocking requests.",
      },
    ],
  },
  {
    id: "col-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-6",
        title: "Rebuild the settings layout",
        details: "Two column layout with a sticky sidebar. Mobile falls back to tabs.",
      },
      {
        id: "card-7",
        title: "Cache dashboard aggregates",
        details: "Charts recompute on every load. Precompute nightly and read from cache.",
      },
    ],
  },
  {
    id: "col-review",
    title: "Review",
    cards: [
      {
        id: "card-8",
        title: "Tighten password reset flow",
        details: "Tokens should expire after 30 minutes and be single use.",
      },
    ],
  },
  {
    id: "col-done",
    title: "Done",
    cards: [
      {
        id: "card-9",
        title: "Migrate CI to the new runners",
        details: "Build times dropped from eleven minutes to just under four.",
      },
      {
        id: "card-10",
        title: "Fix timezone drift in reports",
        details: "Daily totals were rolling over an hour early for European accounts.",
      },
    ],
  },
];
