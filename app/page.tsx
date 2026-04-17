"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Carousel } from "@/components/Carousel";
import { DetailModal } from "@/components/DetailModal";
import { useModal } from "@/hooks/useModal";
import { getShowById } from "@/data/shows";
import { rows } from "@/data/rows";

export default function Home() {
  const { activeShowId, openModal, closeModal } = useModal();
  const activeShow = activeShowId ? getShowById(activeShowId) ?? null : null;

  return (
    <>
      <Navbar />
      <Hero />

      <div id="carousels" className="relative z-10 -mt-16 pb-20">
        {rows.map((row) => {
          const rowShows = row.showIds
            .map((id) => getShowById(id))
            .filter((s): s is NonNullable<typeof s> => s !== undefined);

          return (
            <Carousel
              key={row.id}
              title={row.title}
              badge={row.badge}
              shows={rowShows}
              onSelectShow={openModal}
            />
          );
        })}
      </div>

      <DetailModal show={activeShow} onClose={closeModal} />
    </>
  );
}
