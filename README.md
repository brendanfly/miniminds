# MiniMinds

A family-made, touch-friendly learning playground for kids ages 3-7. This private pilot includes seven original activities:

- **Coloring Garden:** choose colors and tap regions in a flower or house picture, undo a brush choice, and celebrate a finished picture.
- **Letter Friends:** match uppercase letters or find their lowercase friends, with gentle retries and optional spoken prompts.
- **Counting Meadow:** tap flowers to count each once, then choose the matching number. Choose groups up to 5 or up to 10.
- **Word Builder Workshop:** copy three-letter words with a word guide, or spell pictured words with an extra tile to choose from.
- **Sight Word Picnic:** match six high-frequency words or use them to complete short sentences.
- **Snack-Time Addition:** bring two apple groups together and find their total, with totals up to 5 or 10.
- **Keep, Give, Count:** move pretend one-dollar tokens to a friend and count what remains, including zero.

Built with React, TypeScript, and Vite. All illustrations are original SVG artwork stored in the app. There are no external fonts, image requests, accounts, ads, analytics, or uploads.

## Stages and difficulty

Subject and learning-stage filters intersect. Choose Reading, Coloring, Math, Science, or Money, then optionally Little Explorers (roughly 3-4), Kindergarten Crew (5-6), or Growing Thinkers (7). Ages are suggestions, not restrictions. Science has an explicit empty state: proposed activities are never shown as playable.

Little Explorers starts compatible games in gentler modes. Kindergarten starts letter matching with uppercase/lowercase and counting up to 10; its new reading, addition, and money games begin with more support. Growing Thinkers starts compatible games in their more challenging modes. All stages uses each game's default. Every game allows manual difficulty changes, which reset the current activity but preserve this tab's happy stars. Going back to the catalog preserves both filters.

Coloring offers free play and a color-recipe challenge for both pictures. Word-building practice currently covers cat, sun, hen, and duck across its modes. Sight-word practice covers see, the, can, my, is, and we. These are small pilot sets, not comprehensive curricula.

The 50-game idea backlog, proposed waves, and an idea-capture template live in [docs/GAME-ROADMAP.md](docs/GAME-ROADMAP.md). Add observations and better ideas there before committing to more builds.

## Run locally

Requires Node.js 22.12+ (or 20.19+) and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. To play on a tablet or phone on the same trusted home network, open `http://<your-computer-LAN-IP>:5173`. The development server listens on all network interfaces; allow it only on a trusted private network, and do not forward the port to the internet.

## Build and check

```powershell
npm run build
npx playwright install chromium
npm test
```

The build includes strict TypeScript checking. Browser tests cover both filters, stage presets, difficulty changes, all seven game interactions and their round data, parent gating, optional speech, keyboard play, and desktop, tablet, and phone layouts. `npm run preview` serves the production build for local review.

## Family pilot boundaries

The app has no backend or authentication. "Private" means locally hosted, not access-controlled. The grown-up panel uses a three-second hold as a child-oriented interaction gate, not a security boundary.

Artwork, filter choices, difficulty choices, and happy-star counts are held in memory only. They reset on reload; switching away from an activity clears its unfinished round or picture. No child names or other personal data are requested or stored. Sound is off by default. Optional speech uses the browser's built-in speech synthesis and may rely on device/browser-provider services. A prompt can also be spoken on demand without enabling all sound. Visual guides and readable instructions remain available when speech is unavailable.

The pilot has no timers, penalties, purchases, external links in the child experience, or competitive scores. It works with touch, mouse, and keyboard, respects reduced-motion preferences, and uses large controls. Younger children may need a grown-up's help with instructions; the age range is a design target, not a validated educational assessment. Reading activities teach letter names/shapes, word spelling, and familiar words, not a complete phonics curriculum. Synthesized letter names are not phoneme instruction.

Money games use pretend dollars only. Moving a token is reversible; children must move the requested amount before answering what remains. Stars acknowledge solving a subtraction problem, not how much a child gives or keeps. No real currency is transferred, and no family financial information is requested.

Before any public launch, add appropriate access control and hosting, review children's privacy obligations in the intended markets, conduct accessibility and child usability testing, and decide on a data-minimization policy before introducing profiles or saved progress. No public deployment is included in this pilot.