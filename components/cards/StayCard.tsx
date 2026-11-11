"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { show } from "@/lib/mock";
import { CardBody, CardFrame, CardLabel, cardSub, cardTitle } from "./CardFrame";
import type { StayItem } from "@/types/chat";

// STAY: photo carousel (arrows + dots) on top, centred text below, coral accent.
export default function StayCard({ item, style }: { item: StayItem; style?: CSSProperties }) {
  const photos = item.photos ?? [];
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [reserved, setReserved] = useState(false);

  const go = (to: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: to * el.clientWidth, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const arrow =
    "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-neutral-200/85 text-neutral-800 backdrop-blur-sm transition hover:bg-white";

  return (
    <CardFrame style={style}>
      <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-200 to-coral">
        <div
          ref={track}
          onScroll={onScroll}
          className="flex size-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((src, i) => (
            <div key={src} className="relative size-full flex-none snap-center">
              <Image
                src={src}
                alt={`${show(item.title)}, photo ${i + 1} of ${photos.length}`}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 320px, 85vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {index > 0 && (
          <button type="button" aria-label="Previous photo" onClick={() => go(index - 1)} className={`${arrow} left-3`}>
            ‹
          </button>
        )}
        {index < photos.length - 1 && (
          <button type="button" aria-label="Next photo" onClick={() => go(index + 1)} className={`${arrow} right-3`}>
            ›
          </button>
        )}

        {photos.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden>
            {photos.map((_, i) => (
              <span
                key={i}
                className={`size-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/55"}`}
              />
            ))}
          </div>
        )}
      </div>

      <CardBody href={item.link}>
        <CardLabel className="text-coral">Stay</CardLabel>
        <h3 className={cardTitle}>{show(item.title)}</h3>
        <p className={cardSub}>
          {show(item.property_type)} · {show(item.neighbourhood)}
        </p>
        <p className="mt-2 text-sm text-neutral-500">{show(item.highlight)}</p>
        <p className="mt-3 text-[13px] text-neutral-500">
          {show(item.dates)} · {show(item.nights)} nights · ★ {show(item.rating)} ({show(item.reviews)})
        </p>
        <p className="mt-1 text-lg font-extrabold text-coral">
          ${show(item.total_price)} <span className="text-[13px] font-medium text-neutral-500">total · ${show(item.nightly_price)}/night</span>
        </p>
      </CardBody>
      <div className="-mt-2 px-5 pb-5">
        <button
          type="button"
          aria-pressed={reserved}
          onClick={() => setReserved((r) => !r)}
          className={`w-full rounded-full px-5 py-3 text-base font-bold transition ${
            reserved
              ? "border-2 border-coral bg-white text-coral"
              : "bg-coral text-white hover:brightness-95 active:scale-[0.98]"
          }`}
        >
          {reserved ? `Reserved ✓ ${show(item.dates)}` : "Reserve"}
        </button>
        <p className="mt-2 text-center text-xs text-neutral-500" aria-live="polite">
          {reserved ? "Tap again to cancel" : "You won’t be charged yet"}
        </p>
      </div>
    </CardFrame>
  );
}
