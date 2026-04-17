"use client";

import { useState, useCallback, useEffect } from "react";

export function useModal() {
  const [activeShowId, setActiveShowId] = useState<string | null>(null);

  useEffect(() => {
    if (activeShowId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeShowId]);

  const openModal = useCallback((showId: string) => {
    setActiveShowId(showId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveShowId(null);
  }, []);

  return { activeShowId, openModal, closeModal };
}
