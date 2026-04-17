"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Show } from "@/types/resume";

type DetailModalProps = {
  show: Show | null;
  onClose: () => void;
};

export function DetailModal({ show, onClose }: DetailModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 top-[5vh] md:top-[5vh] md:w-[min(850px,90vw)] md:-translate-x-1/2 bottom-4 z-50 overflow-y-auto rounded-lg bg-netflix-dark shadow-2xl"
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className={`relative h-[300px] md:h-[400px] bg-gradient-to-br ${show.gradient}`}
            >
              {show.headerImage && (
                <Image
                  src={show.headerImage}
                  alt={show.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 850px, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/40 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-netflix-dark/80 flex items-center justify-center text-white hover:bg-netflix-dark transition-colors z-10"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <motion.h2
                  className="font-title text-4xl md:text-5xl tracking-wider text-white mb-2"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {show.title}
                </motion.h2>
                <p className="text-sm" style={{ color: show.accentColor }}>
                  ★ {show.subtitle} · {show.locations.join(" · ")}
                </p>
              </div>
            </div>

            <div className="px-6 md:px-8 pb-8">
              <motion.p
                className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 mt-4"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {show.synopsis}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-x-8 gap-y-2 mb-8 text-sm"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <span className="text-netflix-gray">Period: </span>
                  <span className="text-gray-200">{show.timePeriod}</span>
                </div>
                <div>
                  <span className="text-netflix-gray">Locations: </span>
                  <span className="text-gray-200">
                    {show.locations.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-netflix-gray">Inspired by: </span>
                  <span className="text-gray-200 italic">
                    {show.movieInspiration}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="mb-8"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-white font-semibold mb-3">Episodes</h3>
                <div className="flex flex-col gap-2">
                  {show.episodes.map((ep) => (
                    <div
                      key={ep.number}
                      className="flex items-center gap-4 px-4 py-3 bg-white/5 rounded"
                    >
                      <span className="text-netflix-gray text-xs font-mono w-5">
                        {ep.number}
                      </span>
                      <span className="text-gray-300 text-sm">{ep.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {show.genreTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full border border-neutral-700 text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {show.photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {show.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="relative aspect-square bg-neutral-800 rounded overflow-hidden"
                    >
                      <Image
                        src={photo}
                        alt={`${show.title} - photo ${i + 1}`}
                        fill
                        sizes="(min-width: 768px) 278px, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-neutral-700 rounded-lg p-6 text-center">
                  <p className="text-neutral-600 text-sm">
                    Photos coming soon
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
