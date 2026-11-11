import EatCard from "./cards/EatCard";
import ExperienceCard from "./cards/ExperienceCard";
import StayCard from "./cards/StayCard";
import type { Itinerary } from "@/types/chat";

const STAGGER_MS = 350;

// Mobile: swipeable carousel. Desktop (md+): three cards side by side.
// Cards fade in one after another: stay, experience, eat.
export default function CardsReply({ items }: { items: Itinerary }) {
  const [stay, experience, eat] = items;
  const delay = (i: number) => ({ animationDelay: `${100 + i * STAGGER_MS}ms` });
  const slot = "w-[85%] shrink-0 snap-center md:w-auto";
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="max-w-[88%]">Here’s a weekend in Kyoto for 11–13 Apr.</p>
      <div
        role="list"
        aria-label="Kyoto weekend suggestions"
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-3 md:items-start md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <div role="listitem" className={slot}><StayCard item={stay} style={delay(0)} /></div>
        <div role="listitem" className={slot}><ExperienceCard item={experience} style={delay(1)} /></div>
        <div role="listitem" className={slot}><EatCard item={eat} style={delay(2)} /></div>
      </div>
    </div>
  );
}
