# Kyoto weekend chat

A one-page chat prototype that plans a Kyoto weekend (11–13 Apr). It shows a thinking bubble, then three cards: a stay, an experience and a place to eat. If it can't build all three, it shows a calm error bubble with a Try again button.

## Screenshots (desktop)

**1. Thinking.** Sending locks the input and shows pulsing dots in the reply bubble.

![Thinking state](docs/1-thinking.jpg)

**2. Cards.** Stay, experience and eat appear one after another, side by side.

![Stay, experience and eat cards together](docs/2-cards.jpg)

**3. Error.** With Force error on, the reply is a calm message with Try again inside it.

![Error state](docs/3-error.jpg)

**4. Try again clicked.** It turns Force error off, thinks, and brings the three cards back.

![After Try again](docs/4-try-again.jpg)

## Screenshots (mobile)

On a phone-sized screen (iPhone 14, 390 px wide) the cards become a swipeable carousel that snaps card to card.

| 1. Thinking | 2. Cards | 3. Swiped to eat | 4. Error | 5. Try again clicked |
|---|---|---|---|---|
| <img src="docs/m1-thinking.jpg" width="170" alt="Mobile thinking state"> | <img src="docs/m2-cards.jpg" width="170" alt="Mobile cards, stay card first"> | <img src="docs/m3-swiped.jpg" width="170" alt="Mobile carousel swiped to the eat card"> | <img src="docs/m4-error.jpg" width="170" alt="Mobile error state"> | <img src="docs/m5-try-again.jpg" width="170" alt="Mobile after Try again"> |

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other scripts: `npm run build`, `npm run typecheck`.

## Pass checklist

Tick each box when the check passes. Items marked ✅ were checked in a browser while building; the rest need a person or an account I didn't have.

**Page**
- [x] ✅ One page with a header, a scrolling thread and a text box with a Send button.
- [x] ✅ The thread opens with the user's Kyoto weekend message already sent.

**Thinking state**
- [x] ✅ Sending a message locks the text box and the Send button.
- [x] ✅ Pulsing dots show in the reply bubble before any cards appear.
- [x] ✅ The dots are replaced by the result, never stacked with it.

**Cards**
- [x] ✅ Exactly three cards appear: stay (11–13 Apr), experience, then eat, in that order.
- [x] ✅ The cards fade in one after another (0.1 s, 0.45 s, 0.8 s).
- [x] ✅ Each card has its own layout and accent colour: coral stay, teal experience, amber eat.
- [x] ✅ All three share one design system: same radius, shadow, centred text and label.
- [x] ✅ Price and location are drawn differently on each card (see the table below).
- [x] ✅ Content comes from one row per sheet of the Kyoto Weekend Prototype Content Pack, and empty fields show "TBC".
- [x] ✅ The stay card has a photo carousel with arrows and dots, and a Reserve button that toggles to "Reserved ✓".
- [ ] The experience card uses a real photo (the pack has none, so it shows a gradient).

**Error state**
- [x] ✅ The Force error switch in the header makes the next reply fail.
- [x] ✅ The error bubble is a calm plain message with no icon and no red, with a Try again button inside it.
- [x] ✅ Try again turns Force error off, shows the dots, then shows the three cards.
- [x] ✅ The error bubble and the cards never show together.
- [ ] `?forceError=1` also forces the error (the spec mentions it; the switch is the only trigger so far).

**Responsive and look**
- [x] ✅ Desktop (md and up): the three cards sit side by side.
- [x] ✅ Mobile: the cards are a swipeable carousel that snaps card to card (screenshots above).
- [x] ✅ Light mode only.

**Live link and scope**
- [x] The live link https://air-bn-b-kyoto-chat.vercel.app/ opens the chat (checked by the project owner).
- [x] ✅ No login: the app has no sign-in or accounts, and the local build opens straight into the chat.
- [x] No login on the live link either (checked by the project owner).
- [x] ✅ Mocked data: every card comes from the sample rows in `lib/mock.ts`. There are no API calls, and the listings, prices and availability are not real.
- [x] ✅ No booking: Reserve only toggles the card to "Reserved ✓". No booking, payment or account is created and nothing is sent anywhere.

**Code and repo**
- [x] ✅ Next.js app router, React 19, strict TypeScript, Tailwind. `npm run typecheck` and `npm run build` pass.
- [x] ✅ The project is lightweight (about 2 MB without `node_modules`, screenshots included).
- [x] ✅ The README shows desktop screenshots of thinking, cards, error and Try again.
- [x] ✅ The README shows mobile screenshots (iPhone 14 size, from the local build): thinking, cards, carousel swiped to the eat card, error and Try again.
- [ ] The project is pushed to GitHub (no GitHub account was linked in the session).

| | Stay | Experience | Eat |
|---|---|---|---|
| Price | Large coral total, nightly price beside it | Filled teal pill, "$58 per guest" | `$` scale with the level filled, plus "~$34 for 2" |
| Location | Neighbourhood in the subtitle | Meeting point in a pale teal box | Amber walk-time chip |

## What it does

- Sending a message locks the input and shows pulsing dots in the reply bubble before any cards appear.
- The three cards fade in one after another. On desktop they sit side by side; on mobile they're a swipeable carousel.
- The stay card has a photo carousel and a Reserve button. The experience card shows its price as a pill and its meeting point in a row. The eat card shows a `$` scale and a walk-time chip.
- The **Force error** switch in the header makes the next reply fail so you can see the error bubble. **Try again** turns the switch off, thinks, and brings the three cards back.
- Light mode only.

## Stack

Next.js (app router), React 19, TypeScript (strict), Tailwind CSS v4.

## Layout

- `app/`: page, layout, Tailwind theme and animations
- `components/Chat.tsx`: thread, thinking, error and retry logic
- `components/cards/`: `StayCard`, `ExperienceCard`, `EatCard`, plus the shared `CardFrame`
- `lib/mock.ts`: sample reply built from one row per sheet of the Kyoto Weekend Prototype Content Pack (empty fields show "TBC")
- `types/chat.ts`: message and card types
- `public/`: stay photos
