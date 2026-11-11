import type { Itinerary } from "@/types/chat";

// One row per sheet from Kyoto_Weekend_Prototype_Content_Pack.xlsx (S1, E1, F1).
export const MOCK_ITINERARY: Itinerary = [
  {
    type: "stay",
    title: "Restored machiya townhouse near Gion",
    photos: ["/stay-1.jpg", "/stay-2.jpg", "/stay-3.jpg", "/stay-4.jpg"],
    highlight: "Private garden and cedar soaking tub",
    property_type: "Entire townhouse",
    neighbourhood: "Gion",
    dates: "11–13 Apr",
    nights: 2,
    nightly_price: 168,
    total_price: 366,
    rating: 4.92,
    reviews: 214,
    link: "/rooms/mock-stay",
  },
  {
    type: "experience",
    title: "Tea ceremony in a 100-year-old machiya",
    category: "Culture",
    host: "Mei",
    date: "Sat 12 Apr",
    start: "10:30",
    duration: 2,
    price_per_person: 58,
    rating: 4.96,
    meeting_point: "Outside Gion-Shijo Station, exit 6",
    availability: "Spots open",
    link: "/experiences/mock-experience",
  },
  {
    type: "eat",
    name: "Menya Inoichi",
    cuisine: "Ramen",
    meal: "Dinner",
    price_band: "$",
    est_cost: 34,
    area: "Gion",
    walk_min: 8,
    note: "No reservations – arrive before 18:00",
    link: "/places/mock-eat",
  },
];

const FILLER = "TBC";
export const show = (v: string | number | undefined): string =>
  v === undefined || v === "" ? FILLER : String(v);
