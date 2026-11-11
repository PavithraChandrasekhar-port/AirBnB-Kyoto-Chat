// Field names match the spec's card table and mock response word for word.
export interface StayItem {
  type: "stay";
  title: string;
  photos?: string[];
  highlight?: string;
  property_type?: string;
  neighbourhood?: string;
  dates?: string;
  nights?: number;
  nightly_price?: number;
  total_price?: number;
  rating?: number;
  reviews?: number;
  link: string;
}

export interface ExperienceItem {
  type: "experience";
  title: string;
  category?: string;
  host?: string;
  date?: string;
  start?: string;
  duration?: number;
  price_per_person?: number;
  rating?: number;
  meeting_point?: string;
  availability?: string;
  link: string;
}

export interface EatItem {
  type: "eat";
  name: string;
  cuisine?: string;
  meal?: string;
  price_band?: string;
  est_cost?: number;
  area?: string;
  walk_min?: number;
  note?: string;
  link: string;
}

export type Itinerary = readonly [StayItem, ExperienceItem, EatItem];

export type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; kind: "thinking" }
  | { id: string; role: "assistant"; kind: "cards"; items: Itinerary }
  | { id: string; role: "assistant"; kind: "error" };
