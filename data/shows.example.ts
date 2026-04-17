import type { Show } from "@/types/resume";

const gradients = [
  "from-purple-950 via-rose-950 to-neutral-950",
  "from-amber-950 via-orange-950 to-neutral-950",
  "from-green-950 via-emerald-950 to-neutral-950",
  "from-blue-950 via-indigo-950 to-neutral-950",
  "from-yellow-950 via-amber-950 to-neutral-950",
  "from-red-950 via-rose-950 to-neutral-950",
  "from-purple-950 via-violet-950 to-neutral-950",
  "from-orange-950 via-amber-950 to-neutral-950",
  "from-pink-950 via-rose-950 to-neutral-950",
  "from-teal-950 via-cyan-950 to-neutral-950",
  "from-indigo-950 via-blue-950 to-neutral-950",
  "from-rose-950 via-pink-950 to-neutral-950",
  "from-emerald-950 via-green-950 to-neutral-950",
  "from-violet-950 via-purple-950 to-neutral-950",
  "from-cyan-950 via-teal-950 to-neutral-950",
  "from-fuchsia-950 via-pink-950 to-neutral-950",
];

const colors = [
  "#e50914", "#f5c518", "#4caf50", "#2196f3",
  "#c9a84c", "#e50914", "#9c27b0", "#ff9800",
  "#ff6b9d", "#00bcd4", "#3f51b5", "#e91e63",
  "#4caf50", "#7c4dff", "#00acc1", "#d500f9",
];

function makeShow(index: number): Show {
  const num = index + 1;
  return {
    id: `chapter-${num}`,
    title: `Chapter ${num}`,
    subtitle: "A short subtitle for this chapter",
    movieInspiration: "Your movie inspiration here",
    synopsis:
      "Write 2-3 cinematic sentences about this career chapter. What happened, what was at stake, and how it changed you.",
    episodes: [
      { number: "E1", title: "Your first key achievement" },
      { number: "E2", title: "Another milestone or turning point" },
      { number: "E3", title: "The result or impact" },
    ],
    timePeriod: `e.g. ${2014 + index * 2}-${2016 + index * 2}`,
    locations: ["Your City"],
    genreTags: ["Your skill", "Your domain", "Your role"],
    accentColor: colors[index % colors.length],
    gradient: gradients[index % gradients.length],
    photos: [],
  };
}

export const shows = Array.from({ length: 16 }, (_, i) =>
  makeShow(i)
) satisfies Show[];

export function getShowById(id: string): Show | undefined {
  return shows.find((show) => show.id === id);
}
