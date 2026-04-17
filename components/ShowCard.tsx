"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Show } from "@/types/resume";

type ShowCardProps = {
  show: Show;
  onSelect: (showId: string) => void;
};

export function ShowCard({ show, onSelect }: ShowCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={`View ${show.title}`}
      className="relative flex-shrink-0 w-[150px] sm:w-[200px] md:w-[240px] cursor-pointer text-left"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(show.id)}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.2,
              zIndex: 30,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }
      }
    >
      <div
        className={`relative aspect-[2/3] rounded overflow-hidden bg-gradient-to-b ${show.gradient}`}
      >
        {show.coverImage && (
          <Image
            src={show.coverImage}
            alt={show.title}
            fill
            sizes="(min-width: 768px) 240px, (min-width: 640px) 200px, 150px"
            className="object-cover"
          />
        )}

        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t ${show.coverImage ? "from-black from-20% via-black/90 via-50% to-transparent pt-20" : "from-black/90 via-black/60 to-transparent"}`}>
          <p
            className="text-[10px] tracking-wider mb-1 font-semibold"
            style={{ color: show.accentColor }}
          >
            {show.genreTags.slice(0, 2).join(" · ").toUpperCase()}
          </p>
          <h3 className="font-title text-base sm:text-xl text-white tracking-wide">
            {show.title}
          </h3>
          <p className="text-xs text-netflix-gray mt-0.5">
            {show.locations.join(" · ")}
          </p>
        </div>
      </div>

      {isHovered && !shouldReduceMotion && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-netflix-card rounded-b shadow-2xl p-3 hidden md:block"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-netflix-gray">{show.timePeriod}</span>
            <span className="text-xs text-netflix-gray italic">
              {show.movieInspiration}
            </span>
          </div>
          <div className="flex gap-1 flex-wrap mb-2">
            {show.genreTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border border-neutral-700 text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-neutral-400 line-clamp-2">
            {show.synopsis}
          </p>
        </motion.div>
      )}
    </motion.button>
  );
}
