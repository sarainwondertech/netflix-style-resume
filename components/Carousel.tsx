"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ShowCard } from "./ShowCard";
import type { Show } from "@/types/resume";

type CarouselProps = {
  title: string;
  badge?: string;
  shows: Show[];
  onSelectShow: (showId: string) => void;
};

export function Carousel({ title, badge, shows, onSelectShow }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 500;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div ref={ref} className="mb-8 md:mb-12">
      <div className="flex items-center gap-3 px-6 md:px-12 mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          {title}
        </h2>
        {badge && (
          <span className="text-[10px] bg-netflix-red px-2 py-0.5 rounded text-white font-semibold">
            {badge}
          </span>
        )}
      </div>

      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 w-10 z-20 bg-gradient-to-r from-netflix-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <span className="text-white text-2xl">‹</span>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 px-6 md:px-12 overflow-x-auto scrollbar-hide py-4"
        >
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <ShowCard show={show} onSelect={onSelectShow} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 w-10 z-20 bg-gradient-to-l from-netflix-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <span className="text-white text-2xl">›</span>
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-netflix-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
