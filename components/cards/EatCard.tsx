import type { CSSProperties } from "react";
import { show } from "@/lib/mock";
import type { EatItem } from "@/types/chat";
import { CardBody, CardFrame, CardLabel, cardSub, cardTitle } from "./CardFrame";

// EAT: short amber band instead of a photo; price as a $-scale, location as a walk-time chip.
export default function EatCard({ item, style }: { item: EatItem; style?: CSSProperties }) {
  const level = item.price_band?.length ?? 0;
  return (
    <CardFrame style={style}>
      <div className="grid h-24 place-items-center bg-amber/90 text-5xl" aria-hidden>
        🍜
      </div>
      <CardBody href={item.link}>
        <CardLabel className="text-amber-700">Eat</CardLabel>
        <h3 className={cardTitle}>{show(item.name)}</h3>
        <p className={cardSub}>
          {show(item.cuisine)} · {show(item.meal)} · {show(item.area)}
        </p>
        <p className="mt-3 text-lg font-extrabold tracking-wide" aria-label={`Price level ${level} of 4`}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={n <= level ? "text-neutral-900" : "text-neutral-300"}>
              $
            </span>
          ))}
          <span className="ml-2 text-[13px] font-medium tracking-normal text-neutral-500">
            ~${show(item.est_cost)} for 2
          </span>
        </p>
        <p className="mt-3 inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-semibold text-amber-900">
          🚶 {show(item.walk_min)} min walk from your stay
        </p>
        <p className="mt-2 text-xs text-neutral-500">{show(item.note)}</p>
      </CardBody>
    </CardFrame>
  );
}
