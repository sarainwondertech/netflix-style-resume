"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TrailerSources } from "./TrailerSources";

type TrailerModalProps = {
  isOpen: boolean;
  portrait?: string;
  landscape?: string;
  onClose: () => void;
};

export function TrailerModal({ isOpen, portrait, landscape, onClose }: TrailerModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  // Default to 16:9 until the video's real dimensions load, then match them
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Pause and reset when closing so reopening starts from the beginning
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
              style={
                aspectRatio < 1
                  ? // Portrait: height drives size, width derives from aspect-ratio
                    { aspectRatio, height: "min(80vh, 820px)", maxWidth: "92vw" }
                  : // Landscape: width drives size, height derives from aspect-ratio
                    { aspectRatio, width: "min(820px, 92vw)", maxHeight: "80vh" }
              }
            >
              {/* Blurred background fill — same video, muted, covers the frame */}
              <video
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70 pointer-events-none"
              >
                <TrailerSources portrait={portrait} landscape={landscape} />
              </video>

              {/* Foreground video at natural aspect ratio */}
              <video
                ref={videoRef}
                autoPlay
                controls
                playsInline
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  if (v.videoWidth && v.videoHeight) {
                    setAspectRatio(v.videoWidth / v.videoHeight);
                  }
                }}
                className="relative w-full h-full object-contain z-10"
              >
                <TrailerSources portrait={portrait} landscape={landscape} />
              </video>

              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition-colors z-20"
                aria-label="Close trailer"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
