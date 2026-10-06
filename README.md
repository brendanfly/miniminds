# MiniMinds

A family-made, touch-friendly learning playground for kids ages 3-7. This expanded private pilot includes **27 fully playable activities** across Reading (7), Coloring/Creativity (5), Math (6), Science (4), and Money (5). The original seven remain:

- **Coloring Garden:** choose colors and tap regions in a flower or house picture, undo a brush choice, and celebrate a finished picture.
- **Letter Friends:** match uppercase letters or find their lowercase friends, with gentle retries and optional spoken prompts.
- **Counting Meadow:** tap flowers to count each once, then choose the matching number. Choose groups up to 5 or up to 10.
- **Word Builder Workshop:** copy three-letter words with a word guide, or spell pictured words with an extra tile to choose from.
- **Sight Word Picnic:** match six high-frequency words or use them to complete short sentences.
- **Snack-Time Addition:** bring two apple groups together and find their total, with totals up to 5 or 10.
- **Keep, Give, Count:** move pretend one-dollar tokens to a friend and count what remains, including zero.

The first ten-game expansion adds:

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

The next ten games add:

| Activity | Gentler mode | Growing mode |
|---|---|---|
| Rhyme Time | Cat/hat, sun/bun, hen/pen, duck/truck with whole-word guides and two illustrated choices | Three choices without the extra guide |
| Story Detective | Three original one-sentence stories, each with who/what/where questions and two choices | Slightly longer stories and three choices |
| Color Hunt | Color one named circle, square, or triangle; leave other shapes unpainted | Three two-target color/shape recipes |
| Shape Stamp Studio | Free creation on a labeled nine-square canvas; undo/reset/finish | Three exact shape/location recipes, checked against placed stamps |
| Number Match | Numerals and visible berry groups from 1-5 | Larger groups up to 10; optional counting help in both modes |
| More, Less, Same | Compare group A to B from 0-5 with a pairing guide | Groups from 0-10 including equal, empty, greater, and lesser cases |
| Animal Home Match | Four specified animal situations, two choices and a suitability guide | Three choices followed by an explanatory observation |
| Life-Cycle Sequencer | Guided four-stage bean and butterfly sequences | Less-guided common frog, bean, and butterfly sequences of four or five stages |
| Token Jar | Reversibly change non-currency token quantities to goals from 0-5 | Changes from one quantity to another from 0-10, including no change |
| Save for Something Special | Plan the remaining amount, then try reversible contributions toward goals to 5 | Goals to 10 with less support; exact and already-reached goals |

Built with React, TypeScript, and Vite. All illustrations are original SVG artwork stored in the app. There are no external fonts, image requests, accounts, ads, analytics, or uploads.

## Stages and difficulty

Subject and learning-stage filters intersect. Choose Reading, Coloring, Math, Science, or Money, then optionally Little Explorers (roughly 3-4), Kindergarten Crew (5-6), or Growing Thinkers (7). Ages are suggestions, not restrictions. All stages shows all 27 games. Little Explorers recommends 15 supported matching, creative, ordering, counting, and animal/plant science activities; adult help is recommended with science instructions. Kindergarten Crew shows all 27; Growing Thinkers shows 26 (Letter Friends remains recommended for ages 3-6). Life-cycle and new reading/savings tasks recommend K/T because of their instruction and sequencing demands. Money + Little Explorers now truthfully shows Token Jar, not an empty state. All current subject/stage intersections have at least one game; the empty-state component remains for genuinely empty future combinations. Proposed games never appear as playable.

Little Explorers starts compatible games in gentler modes. Kindergarten starts letter matching with uppercase/lowercase and counting up to 10; its new reading, addition, and money games begin with more support. Growing Thinkers starts compatible games in their more challenging modes. All stages uses each game's default. Every game allows manual difficulty changes, which reset the current activity but preserve this tab's happy stars. Going back to the catalog preserves both filters.

Coloring offers free play and a color-recipe challenge for both pictures. Word-building practice currently covers cat, sun, hen, and duck across its modes. Sight-word practice covers see, the, can, my, is, and we. These are small pilot sets, not comprehensive curricula.

Sentence Kitchen targets "The cat smiles.", "The duck swims.", "The sun shines.", and "The hen stands." It checks the requested meaning and word order, not arbitrary arrangements, then reveals original artwork. Filled word slots, train carriages, paint scoops, ducks, and payment tokens are reversible before solving. Alphabet Garden teaches letter names/shapes, not phonemes.

Rainbow Mixer uses an explicit simplified equal-scoop paint model: red + yellow = orange, yellow + blue = green, red + blue = purple; equal colors stay the same. It is not RGB averaging or a claim that all pigments mix identically. Plant growth compresses days/weeks into three untimed observation steps. Damp soil and light support growth in the model; extra water is disabled when soil is already damp. Air, nutrients, temperature, space, plant variation, and real elapsed time are discussed but not simulated.

The float lab specifies a dry cork stopper (floats), solid steel spoon (sinks), solid granite pebble (sinks), sealed air-filled beach ball (floats), tightly compressed solid aluminum ball with no air pockets (sinks), and empty aluminum foil boat kept open-side-up and dry inside (floats). Results assume still fresh water. Form and trapped air matter; a water-filled boat can sink. Every round requires a prediction, a test, and a recorded observation. A differing prediction is a discovery, not a failure. Garden stars acknowledge completing all three observations, not guessing correctly.

Rhyme Time uses four familiar English whole-word pairs, visible labels, original pictures, and optional whole-word synthesis; this is not reviewed phoneme instruction. Story Detective asks nine explicit who/what/where questions supported by three tiny original stories, not a full reading curriculum. Creative recipes check all requested targets and require other regions/squares to stay empty; paints and stamps can be undone or reset before solving. Free stamp creation celebrates a finished nonempty picture once, not every tap.

Animal Home Match specifies a mallard seeking swimming/feeding water, a common frog laying eggs in freshwater, a domestic hen needing dry farm shelter, and a clownfish needing its natural warm saltwater reef habitat. Choices are intentionally unambiguous for that situation; animals can use several habitats. Life-cycle sequencing explains how new eggs/seeds can begin another cycle. Bean stages are simplified, butterfly stages include a chrysalis, and the common-frog model includes aquatic eggs/tadpoles and leg development. Species and conditions vary; pictures compress real elapsed time, with no fixed duration or mandatory wait.

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
npm run dev -- --port 5177 --strictPort
```

This serves the 27-game worktree at `http://localhost:5177`. Keep the original server on 5173 and the separate 17-game preview on 5175 unchanged. `--strictPort` fails explicitly if the chosen port is occupied.

## Build and check

```powershell
npm run build
npx playwright install chromium
npm test
```

The build includes strict TypeScript checking. Browser tests cover both filters, stage presets, difficulty changes, all 27 game interactions and their round data, prediction -> test -> observation, zero/equality comparisons, exact-price and savings boundaries, life-cycle order, undo/reset, one star per round, parent gating, optional/unavailable speech, keyboard play, genuine touch input, reduced motion, and 320px layouts on desktop Chromium, iPad Mini, and iPhone 13 emulation. `npm run preview` serves the production build for local review.

Tests launch their own strict-port server from this worktree on **5174**, never reuse an existing server, and stop that bounded helper afterwards. The `browser-test` Vite mode also uses a separate optimized-dependency cache so a live preview and the suite can run together without mixing React modules. If 5174 is in use, choose a free port:

```powershell
$env:MINIMINDS_PORT = '5176'
npm test
```

Keep the test port different from any ongoing preview (and from the original v0.1.0 server on 5173). Install dependencies only when setting up a checkout; `npm ci` restores the lockfile versions. Install Chromium if Playwright reports a missing browser.

## Cloudflare hosting

The app needs static hosting only. Cloudflare Pages and Workers Static Assets can both serve it without a backend, database, Worker script, or Vite/Cloudflare plugin.

Select the branch containing the intended release, with the project root at the repository root where `package.json` lives. The committed 17-game release is on `brflynn-microsoft-miniminds-game-expansion`. This next-ten worktree is `brflynn-microsoft-miniminds-next-ten-games`; its uncommitted changes are not a deployed release. Do not change the production source branch merely to preview this work. A repository with only README/license files cannot build the app.

For **Workers** (`npx wrangler deploy`), `wrangler.json` runs `npm run build` and serves `dist`. Match the dashboard Worker name to `miniminds`, install lockfile dependencies before deployment (`npm ci` if an explicit install step is needed), and use Node.js 22.12+ or 20.19+. A separate build command can stay empty because Wrangler runs it, or duplicate `npm run build` if desired. Do not publish `src` or commit generated `dist`.

```powershell
npm ci
npx wrangler deploy --dry-run
```

A dry run builds and validates without publishing; it does not exercise the local Workers runtime. Actual `npx wrangler deploy` requires Cloudflare authentication and intentionally publishes the site; it is not part of browser testing.

The empty `previews` block enables the current Cloudflare `npx wrangler preview` flow for non-production builds. That command publishes a remote preview; it is not a local inspection or authorization to deploy. Production builds use `deploy`. The compatibility date is conservatively set to `2026-10-01`.

To check the full browser suite against actual **local** Workers static assets (no publication), use a free test port separate from ongoing previews:

```powershell
$env:MINIMINDS_SERVER = 'workers'
$env:MINIMINDS_PORT = '5176'
npm test
Remove-Item Env:MINIMINDS_SERVER
Remove-Item Env:MINIMINDS_PORT
```

The optional Workers test mode uses `npx wrangler@4.143.0 dev --local` with metrics disabled, builds via the Wrangler configuration, refuses server reuse, and stops its helper afterwards. The default remains isolated Vite `browser-test` mode. The test tool version is pinned to the locally available runtime; Cloudflare's dashboard CLI may be newer. Both server mode and port are validated before startup.

For **Pages**, import the repository as a Pages project, choose the intended application branch, use build command `npm run build` and output directory `dist`. Pages handles dependency installation and publication; it does not need a Wrangler deploy command for this flow.

Pushing to a Git-connected hosting source branch can trigger deployment; no additional GitHub Action is required. A hosted URL is public unless access restrictions are explicitly configured. Keep a family-only pilot behind an access gate: neither an unlisted URL nor the grown-up panel is authentication. Browser-local stats, if added later, would be separate from host access logs; no persistence is implemented here.

## Family pilot boundaries

The app has no backend or authentication. "Private" means locally hosted, not access-controlled. The grown-up panel uses a three-second hold as a child-oriented interaction gate, not a security boundary.

Artwork, filter choices, difficulty choices, and happy-star counts are held in memory only. They reset on reload; switching away from an activity clears its unfinished round or picture. No child names or other personal data are requested or stored. Sound is off by default. Optional speech uses the browser's built-in speech synthesis and may rely on device/browser-provider services. A prompt can also be spoken on demand without enabling all sound. Visual guides and readable instructions remain available when speech is unavailable.

The pilot has no timers, penalties, purchases, external links in the child experience, or competitive scores. It works with touch, mouse, and keyboard, respects reduced-motion preferences, and uses large controls. Younger children may need a grown-up's help with instructions; the age range is a design target, not a validated educational assessment. Reading activities teach letter names/shapes, word spelling, and familiar words, not a complete phonics curriculum. Synthesized letter names are not phoneme instruction.

Keep/Give, Toy Shop, and Can I Buy It? use pretend dollars. Moving a token is reversible; children must move the requested amount before answering what remains. Toy Shop checks an exact token payment, while Can I Buy It? treats equal funds as enough and includes less/more and empty-wallet cases. Token Jar instead uses non-currency tokens as quantity groundwork. Save for Something Special plans the start-to-goal gap, then explores one- or two-token pretend contributions and the changing remainder; extras must be removed to match the goal exactly. Already-reached goals correctly need zero more. No streaks, waiting, real earning, real purchase, or judgment about saving/spending is involved. Stars acknowledge the quantity task, not how much a child gives, keeps, or spends. No real currency is transferred, no shopping links exist, and no family financial information is requested.

Before any public launch, add appropriate access control and hosting, review children's privacy obligations in the intended markets, conduct accessibility and child usability testing, and decide on a data-minimization policy before introducing profiles or saved progress. Deployment configuration is included, but this task has not published a public site.