# MiniMinds

A family-made, touch-friendly learning playground for kids ages 3-7. This expanded private pilot includes **17 fully playable activities** across Reading (5), Coloring/Creativity (3), Math (4), Science (2), and Money (3). The original seven remain:

- **Coloring Garden:** choose colors and tap regions in a flower or house picture, undo a brush choice, and celebrate a finished picture.
- **Letter Friends:** match uppercase letters or find their lowercase friends, with gentle retries and optional spoken prompts.
- **Counting Meadow:** tap flowers to count each once, then choose the matching number. Choose groups up to 5 or up to 10.
- **Word Builder Workshop:** copy three-letter words with a word guide, or spell pictured words with an extra tile to choose from.
- **Sight Word Picnic:** match six high-frequency words or use them to complete short sentences.
- **Snack-Time Addition:** bring two apple groups together and find their total, with totals up to 5 or 10.
- **Keep, Give, Count:** move pretend one-dollar tokens to a friend and count what remains, including zero.

The ten-game expansion adds:

| Activity | Gentler mode | Growing mode |
|---|---|---|
| Alphabet Garden | Match all 26 uppercase English letters to grow flowers | Match all 26 uppercase/lowercase pairs |
| Silly Sentence Kitchen | Copy four original three-word sentences | Build the requested sentence without a written guide, with a distractor |
| Rainbow Mixer | Explore two equal scoops of red/yellow/blue, including same-color mixtures | Make orange, green, and purple recipes |
| Pattern Painter | Three repeating AB color/shape patterns | ABC, AAB, and ABB patterns, with visible shape names |
| Number Train | Arrange sequences of 3-5 carriages using numbers 1-5 | Find gaps at the beginning, middle, or end of 1-10 sequences |
| Take-Away Pond | Move requested ducks and count remaining groups up to 5, including zero | Groups up to 10, including zero |
| Grow a Little Garden | Use a care guide to predict and observe seed -> sprout -> leafy plant -> flowering plant | Predict without the extra guide, observe conditions, and adjust care |
| Float or Sink Lab | Predict/test three specified objects with material clues | Six specified materials/forms without the extra clues |
| Little Toy Shop | Pay exact prices from $1-$5 with reversible $1 tokens | Prices from $1-$10 |
| Can I Buy It? | Compare visible wallet/price tokens from $0-$5 | Compare amounts from $0-$10, with visible wallet tokens |

Built with React, TypeScript, and Vite. All illustrations are original SVG artwork stored in the app. There are no external fonts, image requests, accounts, ads, analytics, or uploads.

## Stages and difficulty

Subject and learning-stage filters intersect. Choose Reading, Coloring, Math, Science, or Money, then optionally Little Explorers (roughly 3-4), Kindergarten Crew (5-6), or Growing Thinkers (7). Ages are suggestions, not restrictions. All stages shows all 17 games. Little Explorers recommends nine supported matching, creative, ordering, counting, and science activities; adult help is recommended with science instructions. Kindergarten Crew shows all 17; Growing Thinkers shows 16 (Letter Friends remains recommended for ages 3-6). Both science games have scaffolding for all three stages. Proposed activities are never shown as playable; an empty state appears only for an actually empty filter intersection, such as Money + Little Explorers.

Little Explorers starts compatible games in gentler modes. Kindergarten starts letter matching with uppercase/lowercase and counting up to 10; its new reading, addition, and money games begin with more support. Growing Thinkers starts compatible games in their more challenging modes. All stages uses each game's default. Every game allows manual difficulty changes, which reset the current activity but preserve this tab's happy stars. Going back to the catalog preserves both filters.

Coloring offers free play and a color-recipe challenge for both pictures. Word-building practice currently covers cat, sun, hen, and duck across its modes. Sight-word practice covers see, the, can, my, is, and we. These are small pilot sets, not comprehensive curricula.

Sentence Kitchen targets "The cat smiles.", "The duck swims.", "The sun shines.", and "The hen stands." It checks the requested meaning and word order, not arbitrary arrangements, then reveals original artwork. Filled word slots, train carriages, paint scoops, ducks, and payment tokens are reversible before solving. Alphabet Garden teaches letter names/shapes, not phonemes.

Rainbow Mixer uses an explicit simplified equal-scoop paint model: red + yellow = orange, yellow + blue = green, red + blue = purple; equal colors stay the same. It is not RGB averaging or a claim that all pigments mix identically. Plant growth compresses days/weeks into three untimed observation steps. Damp soil and light support growth in the model; extra water is disabled when soil is already damp. Air, nutrients, temperature, space, plant variation, and real elapsed time are discussed but not simulated.

The float lab specifies a dry cork stopper (floats), solid steel spoon (sinks), solid granite pebble (sinks), sealed air-filled beach ball (floats), tightly compressed solid aluminum ball with no air pockets (sinks), and empty aluminum foil boat kept open-side-up and dry inside (floats). Results assume still fresh water. Form and trapped air matter; a water-filled boat can sink. Every round requires a prediction, a test, and a recorded observation. A differing prediction is a discovery, not a failure. Garden stars acknowledge completing all three observations, not guessing correctly.

The 50-game idea backlog, proposed waves, and an idea-capture template live in [docs/GAME-ROADMAP.md](docs/GAME-ROADMAP.md). Add observations and better ideas there before committing to more builds.

## Run locally

Requires Node.js 22.12+ (or 20.19+) and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. To play on a tablet or phone on the same trusted home network, open `http://<your-computer-LAN-IP>:5173`. The development server listens on all network interfaces; allow it only on a trusted private network, and do not forward the port to the internet.

To keep a separate original-version server undisturbed, use another port:

```powershell
npm run dev -- --port 5175 --strictPort
```

This serves the expansion at `http://localhost:5175`. `--strictPort` fails explicitly if the port is occupied.

## Build and check

```powershell
npm run build
npx playwright install chromium
npm test
```

The build includes strict TypeScript checking. Browser tests cover both filters, stage presets, difficulty changes, all 17 game interactions and their round data, prediction -> test -> observation, zero subtraction, exact-price boundaries, undo/reset, one star per round, parent gating, optional speech, keyboard play, genuine touch input, reduced motion, and 320px layouts on desktop Chromium, iPad Mini, and iPhone 13 emulation. `npm run preview` serves the production build for local review.

Tests launch their own strict-port server from this worktree on **5174**, never reuse an existing server, and stop that bounded helper afterwards. The `browser-test` Vite mode also uses a separate optimized-dependency cache so a live preview and the suite can run together without mixing React modules. If 5174 is in use, choose a free port:

```powershell
$env:MINIMINDS_PORT = '5176'
npm test
```

Keep the test port different from any ongoing preview (and from the original v0.1.0 server on 5173). Install dependencies only when setting up a checkout; `npm ci` restores the lockfile versions. Install Chromium if Playwright reports a missing browser.

## Cloudflare hosting

The app only needs static hosting. Both Cloudflare Pages and Workers Static Assets can serve it; neither requires a backend, database, or application server.

First push the branch containing the actual application. The committed 17-game release is on `brflynn-microsoft-miniminds-game-expansion`, not necessarily on the repository's `main` branch. Select that branch as the deployment source until the release is merged into `main`. A repository containing only README/license files cannot build the app. The Cloudflare project root must be the repository root, where `package.json` lives.

### Workers (the `npx wrangler deploy` flow)

The checked-in `wrangler.json` tells Wrangler to run the strict Vite build and serve `dist`. No Worker script or Vite/Cloudflare plugin is needed for this static-only app. Set the Cloudflare Worker name to `miniminds`, matching the configuration, and keep the deploy command as `npx wrangler deploy`. Use Node.js 22.12+ or 20.19+; dependency installation must complete before deployment.

Cloudflare can install dependencies from the repository's manifest and lockfile. If its build settings require an explicit install step, use `npm ci`. Leave a separate build command empty when Wrangler runs the configured build, or use `npm run build` there if a duplicate build is acceptable. Do not publish `src` or commit generated `dist` files.

Local commands:

```powershell
npm ci
npx wrangler deploy --dry-run
```

The dry run builds and validates the deployment without publishing it. An actual `npx wrangler deploy` additionally requires Cloudflare authentication and intentionally publishes the site; it is not part of `npm test`.

### Pages (the Git-connected static-site flow)

Import the repository as a **Pages** project, choose the application branch, set the build command to `npm run build`, and set the output directory to `dist`. Pages handles dependency installation and publication; it does not need a Wrangler deploy command and ignores the Worker configuration for this build flow.

For either option, a push to the configured branch can trigger a new build. No additional GitHub Action is required for Cloudflare's Git integration. GitHub Actions can separately run build/browser checks before merging releases. Feature branches should not accidentally change the production source branch.

A hosted URL is public unless access restrictions are explicitly configured. Keep a family-only pilot behind an access gate; an unlisted URL and the grown-up panel are not authentication. Browser-local stats, if added later, would be separate from host access logs and would not require a hosted database.

## Family pilot boundaries

The app has no backend or authentication. "Private" means locally hosted, not access-controlled. The grown-up panel uses a three-second hold as a child-oriented interaction gate, not a security boundary.

Artwork, filter choices, difficulty choices, and happy-star counts are held in memory only. They reset on reload; switching away from an activity clears its unfinished round or picture. No child names or other personal data are requested or stored. Sound is off by default. Optional speech uses the browser's built-in speech synthesis and may rely on device/browser-provider services. A prompt can also be spoken on demand without enabling all sound. Visual guides and readable instructions remain available when speech is unavailable.

The pilot has no timers, penalties, purchases, external links in the child experience, or competitive scores. It works with touch, mouse, and keyboard, respects reduced-motion preferences, and uses large controls. Younger children may need a grown-up's help with instructions; the age range is a design target, not a validated educational assessment. Reading activities teach letter names/shapes, word spelling, and familiar words, not a complete phonics curriculum. Synthesized letter names are not phoneme instruction.

Money games use pretend dollars only. Moving a token is reversible; children must move the requested amount before answering what remains. Toy Shop checks an exact token payment, while Can I Buy It? treats equal funds as enough and includes less/more and empty-wallet cases. Stars acknowledge the math, not how much a child gives, keeps, or spends. No real currency is transferred, no shopping links exist, and no family financial information is requested.

Before any public launch, add appropriate access control and hosting, review children's privacy obligations in the intended markets, conduct accessibility and child usability testing, and decide on a data-minimization policy before introducing profiles or saved progress. Deployment configuration is included, but this task has not published a public site.