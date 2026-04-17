import type { CarouselRow } from "@/types/resume";

export const rows = [
  {
    id: "where-it-all-started",
    title: "Where It All Started",
    showIds: ["chapter-1", "chapter-2", "chapter-3", "chapter-4"],
  },
  {
    id: "plot-twists",
    title: "Plot Twists",
    showIds: ["chapter-5", "chapter-6", "chapter-7", "chapter-8"],
  },
  {
    id: "critically-acclaimed",
    title: "Critically Acclaimed",
    showIds: ["chapter-9", "chapter-10", "chapter-11", "chapter-12"],
  },
  {
    id: "trending-now",
    title: "Trending Now",
    badge: "NEW",
    showIds: ["chapter-13", "chapter-14", "chapter-15", "chapter-16"],
  },
] satisfies CarouselRow[];
