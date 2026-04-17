"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { TrailerModal } from "./TrailerModal";
import { TrailerSources } from "./TrailerSources";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  // Background video starts muted to comply with browser autoplay policy;
  // a visible speaker button lets the visitor unmute with one click.
  const [isMuted, setIsMuted] = useState(true);
  const crispVideoRef = useRef<HTMLVideoElement>(null);

  const hasTrailer = Boolean(profile.trailerUrl || profile.trailerUrlLandscape);

  const handlePlayTrailer = () => {
    if (hasTrailer) {
      setIsTrailerOpen(true);
    } else {
      document.getElementById("carousels")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMute = () => {
    const video = crispVideoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    // Set the DOM property directly; this keeps the user gesture attached to
    // the unmute action (safer than waiting for React to re-render the prop).
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end pb-28 sm:pb-32 md:pb-40 bg-gradient-to-br from-neutral-900 via-red-950/30 to-neutral-900">
      {/* Background — looping trailer video if available, otherwise animated gradient.
          Single full-bleed video: browser picks portrait or landscape source based on viewport,
          so `object-cover` fills cleanly with minimal cropping. */}
      {hasTrailer ? (
        <video
          ref={crispVideoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <TrailerSources
            portrait={profile.trailerUrl}
            landscape={profile.trailerUrlLandscape}
          />
        </video>
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-red-950/30 to-neutral-900"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.05] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/50 to-transparent" />

      <div className="relative z-10 px-6 md:px-12 max-w-2xl">
        <motion.p
          className="text-netflix-red text-xs tracking-[0.3em] mb-3"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A {profile.brandName} ORIGINAL
        </motion.p>

        <motion.h1
          className="font-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wider mb-3"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-2"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="text-sm text-netflix-gray mb-4 sm:mb-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {profile.genres}
        </motion.p>

        <motion.div
          className="flex gap-3"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <button
            onClick={handlePlayTrailer}
            className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2 rounded font-semibold text-sm hover:bg-white/80 transition-colors"
          >
            <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-black" />
            Play Trailer
          </button>
        </motion.div>
      </div>

      {hasTrailer && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
          className="absolute right-6 md:right-12 bottom-24 sm:bottom-[15%] w-10 h-10 rounded-full border border-white/60 bg-black/40 text-white hover:bg-black/60 hover:border-white transition-colors z-10 flex items-center justify-center"
        >
          {isMuted ? (
            // Muted: speaker with slash
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            // Unmuted: speaker with sound waves
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}

      <div className="absolute right-6 md:right-12 bottom-12 sm:bottom-[8%] bg-neutral-800/70 border-l-2 border-gray-400 px-4 py-1 text-sm text-gray-300 hidden sm:block">
        TV-MA
      </div>

      {hasTrailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          portrait={profile.trailerUrl}
          landscape={profile.trailerUrlLandscape}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </section>
  );
}
