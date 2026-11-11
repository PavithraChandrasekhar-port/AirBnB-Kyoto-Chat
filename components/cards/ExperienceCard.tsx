import type { CSSProperties } from "react";
import { show } from "@/lib/mock";
import type { ExperienceItem } from "@/types/chat";
import { CardBody, CardFrame, CardLabel, cardSub, cardTitle } from "./CardFrame";

// EXPERIENCE: wide teal photo area with a duration chip; price as a filled pill,
// location as a meeting-point row.
export default function ExperienceCard({ item, style }: { item: ExperienceItem; style?: CSSProperties }) {
  return (
    <CardFrame style={style}>
      <div className="relative grid aspect-[16/10] place-items-center bg-gradient-to-br from-teal-100 via-teal-300 to-teal">
        <span className="text-6xl opacity-80" aria-hidden>🍵</span>
        <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-teal">
          {show(item.duration)} hrs
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
          ★ {show(item.rating)}
        </span>
      </div>
      <CardBody href={item.link}>
        <CardLabel className="text-teal">Experience</CardLabel>
        <h3 className={cardTitle}>{show(item.title)}</h3>
        <p className={cardSub}>
          {show(item.category)} · with {show(item.host)}
        </p>
        <p className="mt-2 text-[13px] text-neutral-500">
          {show(item.date)} · {show(item.start)}
        </p>
        <p className="mt-3 rounded-2xl bg-teal-50 px-3 py-2 text-sm text-teal-900">
          📍 {show(item.meeting_point)}
        </p>
        <p className="mt-3 inline-block rounded-full bg-teal px-4 py-1.5 text-base font-extrabold text-white">
          ${show(item.price_per_person)} <span className="text-[13px] font-medium">per guest</span>
        </p>
        <p className="mt-1 text-xs text-neutral-500">{show(item.availability)}</p>
      </CardBody>
    </CardFrame>
  );
}
