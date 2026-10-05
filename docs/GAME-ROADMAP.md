# MiniMinds game garden

This is a living idea backlog, not a promise to ship 50 games. Keep proposed games out of the playable catalog until their interactions and learning objectives work end to end.

**Current inventory: 17 playable / 33 proposed.** The original seven-game v0.1.0 stays on its original branch. The expansion adds exactly ten games, two in each subject, without building platformers or making the other proposals clickable.

## Design agreements

- Keep the family pilot local: no accounts, child analytics, ads, uploads, or purchases.
- Use subject and learning-stage filters together. Ages are approximate guides, never ability gates.
- Little Explorers: roughly 3-4, with colors, matching, listening, and small quantities.
- Kindergarten Crew: roughly 5-6, with letter sounds, blending, familiar words, simple sentences, and early arithmetic.
- Growing Thinkers: roughly 7, with more independent reading, number strategies, experiments, and money choices.
- Prefer short, untimed rounds, gentle retries, optional spoken help, and large touch targets. Keyboard operation must work too.
- Combine familiar words with future sound/blending activities; word recognition alone is not a reading curriculum.
- Start money learning with visible whole-dollar tokens. Explore choices without judging generosity, household income, or culturally dependent needs and wants.
- In science, use predict -> try -> observe, and explain the limits of simplified simulations.
- Test with the family before describing any age or skill fit as validated.

## Implementation waves

| Wave | Scope | State |
|---|---|---|
| 1 | Subject/stage filters, catalog metadata, and two modes in the original three games | Playable pilot |
| 2 | Word Builder Workshop, Sight Word Picnic, Snack-Time Addition, Keep, Give, Count | Playable pilot |
| 3 | Alphabet Garden, Silly Sentence Kitchen, Rainbow Mixer, Pattern Painter, Number Train, Take-Away Pond, Grow a Little Garden, Float or Sink Lab, Little Toy Shop, Can I Buy It? | Playable ten-game expansion |
| 4 | Consider Number Match, More/Less/Same, or Life-Cycle Sequencer after family feedback | Proposed next candidates |
| 5 | One short Word Quest or Number-Line Hopper level, only after checking the experiment boundaries below | Proposed experiment |

The first two waves are intentionally small datasets; the expansion is still a bounded pilot, not a curriculum. Expand prompts, vocabulary, and difficulty after observing whether the mechanics make sense to the children.

## What the expansion actually shipped

- Alphabet Garden covers all 26 English letters in uppercase matching and uppercase/lowercase pair modes; optional speech says letter names, not reviewed phonemes.
- Sentence Kitchen has four grammatical three-word targets with explicit meaning prompts, undo/removable slots, a guide or distractor mode, and matching original illustrations after solving. Alternate stories, free sentence generation, and a full reading curriculum are not implemented.
- Rainbow Mixer accepts two equal primary-color scoops. Its explicit model maps red/yellow to orange, yellow/blue to green, red/blue to purple, and same-color pairs to that color. Free discovery and three guided recipes are playable. Real pigments, ratios, white/black paint, and RGB averaging are not simulated.
- Pattern Painter has three AB units and ABC/AAB/ABB units. Every piece has both a distinct shape and a readable color/shape label; no timer or color-only answer.
- Number Train uses tap/keyboard carriage ordering in small 1-5 sequences and missing-number questions at the start, middle, and end of 1-10 sequences. Undo is available for ordering; drag-and-drop is unnecessary.
- Take-Away Pond requires moving the requested ducks before choosing how many remain. Pond/shore moves are reversible; both 1-5 and 1-10 modes include an empty pond.
- Grow a Little Garden runs three untimed growth observations from seed through flowering plant. Both modes require prediction and observation; gentle adds a care guide. Damp soil and light permit growth in the model, and damp soil cannot receive more water. Real plants take days/weeks and need other conditions: air, nutrients, warmth, and space are explained but not simulated.
- Float or Sink Lab requires prediction -> test -> recorded observation, with three clue-supported or six less-guided object rounds. Dry cork, solid steel, solid granite, a sealed air-filled ball, solid aluminum without trapped air, and an empty open-side-up aluminum foil boat have specified outcomes in still fresh water. Shape and air change results; this is not a universal "wood/plastic/metal" rule. Changed predictions are discoveries, not errors.
- Little Toy Shop has every exact whole-dollar price from $1-$5 or $1-$10, with add/remove/undo pretend tokens. Can I Buy It? includes less/equal/more and $0 wallets in both ranges; equal money is enough. Neither asks about family finances or enables real payments.

Live stage metadata recommends scaffolded matching, creative, sequencing, and science exploration for E (adult help with science), and short sentence, subtraction, and money tasks for K/T. All stages shows 17 games; E shows 9, K shows 17, and T shows 16 because the original Letter Friends remains a 3-6 recommendation. These are implementation-based recommendations, not child-tested age claims.

### Implementation-derived refinements (not child observations)

Keep object **form** as well as material in future science datasets; the solid aluminum/empty foil boat contrast is a useful bounded alternative to vague "metal sinks" prompts. Future life-cycle sequencing could reuse the staged plant art without adding a real-time wait. More/Less/Same and Number Match can reuse readable object trays and explicit equality boundaries. Expand original sentence vocabulary only when the illustration can communicate the requested meaning. Review phoneme audio separately before Sound Safari or Blend & Find; letter-name synthesis is not a substitute.

## 50-game backlog

E = Little Explorers; K = Kindergarten Crew; T = Growing Thinkers. Stages here are tentative product ideas; the live catalog is authoritative for currently implemented stage recommendations.

### Reading

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 1 | Letter Friends | E, K | Match uppercase shapes or uppercase/lowercase pairs. | Playable |
| 2 | Alphabet Garden | E, K, T | Match all 26 uppercase shapes or uppercase/lowercase pairs to grow flowers. | Playable |
| 3 | Sound Safari | K | Match a beginning sound with a pictured object. Use reviewed phoneme audio rather than synthesized letter names. | Proposed |
| 4 | Rhyme Time | K | Find rhyming picture pairs. | Proposed |
| 5 | Word Builder Workshop | K, T | Arrange tiles to copy or spell cat, sun, hen, and duck with different levels of support. | Playable |
| 6 | Blend & Find | K | Blend separate sounds and choose a picture. Needs reviewed phoneme audio. | Proposed |
| 7 | Sight Word Picnic | K, T | Match six familiar words or complete a sentence with spoken help. | Playable |
| 8 | Silly Sentence Kitchen | K, T | Arrange four original sentences with a guide or distractor, then see matching art. | Playable |
| 9 | Story Detective | T | Read a tiny original story and answer who, what, or where questions. | Proposed |
| 10 | Word Quest | T | Explore a gentle platforming level with stopped reading checkpoints. | Proposed |

### Coloring and creativity

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 11 | Coloring Garden | E, K, T | Free-color flower and house pictures, or follow a color recipe. More pictures are future additions. | Playable |
| 12 | Color Hunt | E | Find and color objects matching a named color. | Proposed |
| 13 | Rainbow Mixer | E, K, T | Explore two equal primary-color scoops or follow orange/green/purple recipes in an explicit simplified model. | Playable |
| 14 | Shape Stamp Studio | E | Make pictures with large shape stamps. | Proposed |
| 15 | Pattern Painter | E, K, T | Finish labeled color/shape AB, ABC, AAB, and ABB patterns. | Playable |
| 16 | Symmetry Butterflies | K, T | Paint one wing and investigate its mirror. | Proposed |
| 17 | Listen & Color | K | Follow increasingly complex spoken coloring instructions. | Proposed |
| 18 | Pixel Picture Puzzle | T | Follow a small color grid to reveal a picture. | Proposed |
| 19 | Feelings Faces | E, K, T | Create expressions and discuss feelings without assigning a single emotion to every face. | Proposed |
| 20 | My Storybook Studio | K, T | Illustrate short original stories with backgrounds, stickers, and captions. | Proposed |

### Math

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 21 | Counting Meadow | E, K, T | Count each flower once; choose quantity ranges up to 5 or 10. | Playable |
| 22 | Number Match | E | Match numerals with groups of objects. | Proposed |
| 23 | More, Less, Same | E, K | Compare berries, toys, or other groups. | Proposed |
| 24 | Shape Builders | E | Assemble houses and creatures from shapes. | Proposed |
| 25 | Number Train | E, K, T | Tap to order small sequences to 5 or find missing numbers in sequences to 10. | Playable |
| 26 | Snack-Time Addition | K, T | Bring two apple groups together and find totals up to 5 or 10. | Playable |
| 27 | Take-Away Pond | K, T | Move the requested ducks and count remaining groups to 5 or 10, including zero. | Playable |
| 28 | Ten-Frame Fireflies | K, T | Explore combinations that fill a ten-frame jar. | Proposed |
| 29 | Measure the Monsters | K, T | Compare lengths with equal-sized blocks, then introduce rulers. | Proposed |
| 30 | Number-Line Hopper | T | Move along a number line for addition and subtraction. | Proposed |

### Science

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 31 | Animal Home Match | E | Match familiar animals with suitable habitats. | Proposed |
| 32 | Weather Wardrobe | E | Choose clothing for different weather; accept reasonable alternatives. | Proposed |
| 33 | Five Senses Detective | E, K | Explore how senses help us investigate; include accessible alternatives. | Proposed |
| 34 | Grow a Little Garden | E, K, T | Guided or less-guided prediction/care/observation in three explicitly simulated plant-growth steps. | Playable |
| 35 | Float or Sink Lab | E, K, T | Predict, test, and observe three clue-supported or six specified object forms in a virtual tub. | Playable |
| 36 | Magnet Explorer | K | Predict and test attraction for specific materials, not all metals. | Proposed |
| 37 | Life-Cycle Sequencer | K, T | Order butterfly, frog, or plant life-cycle stages. | Proposed |
| 38 | Shadow Playground | K, T | Move a light and observe shadows. | Proposed |
| 39 | Ramp Racers | T | Change ramp height or surface and compare a toy's travel. | Proposed |
| 40 | Habitat Helpers | T | Provide appropriate food, water, shelter, and space. | Proposed |

### Money and everyday choices

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 41 | Token Jar | E | Add/remove pretend tokens before introducing currency. | Proposed |
| 42 | Keep, Give, Count | K, T | Start with pretend dollars, move a requested amount, and count what remains. Includes an empty wallet. | Playable |
| 43 | Little Toy Shop | K, T | Pay exact $1-$5 or $1-$10 prices with reversible pretend tokens. | Playable |
| 44 | Can I Buy It? | K, T | Compare $0-$5 or $0-$10 wallets and prices, including less/equal/more cases. | Playable |
| 45 | Save for Something Special | K, T | Add pretend money toward a chosen goal. No daily streaks or real-world earning requirements. | Proposed |
| 46 | Spend, Save, Share | K, T | Explore multiple ways to divide an amount without a morally preferred answer. | Proposed |
| 47 | Two-Item Basket | T | Combine two prices to find a total. | Proposed |
| 48 | Change Checker | T | Pay more than the price and calculate change. | Proposed |
| 49 | Picnic Budget Planner | T | Choose pretend supplies within a budget, with multiple valid baskets. | Proposed |
| 50 | Same Goal, Different Choices | T | Compare buying now, choosing an alternative, or saving longer. | Proposed |

## Platformer experiment boundaries

Build one short level before committing to an engine. Adventure mode stops at learning checkpoints; children should not have to read and dodge at the same time. Movement mode can separately explore coordination with predictable hazards, adjustable speed, and easy restarts.

Support Space/arrow keys and equally usable large touch controls. Include a slower or untimed alternative and reduced-motion behavior. Do not gate educational content behind reaction speed, lives, streaks, or competitive scores.

## Adding and evaluating ideas

Record observations manually with a grown-up; do not introduce child analytics for this pilot. Focus on whether a child can start without help, understands the task, gets frustrated, or voluntarily returns. Avoid recording identifying child details in this repository.

For each new idea, copy this structure into the idea log below:

- **Working title / subject / suggested stages:**
- **One learning objective:**
- **Play loop:** What does the child actually tap, move, or choose?
- **Support and challenge:** How do modes differ meaningfully?
- **Access:** Touch, keyboard, readable instructions, speech alternatives, reduced motion.
- **Content needs:** Original art, reviewed vocabulary/audio, or simulation assumptions.
- **Observation that prompted it:** Non-identifying family feedback.
- **Smallest playable experiment:**
- **Decision / next step:** Proposed, trying, revising, or parked.

## Idea log

No family observations recorded yet. The 50 ideas above are the starting backlog, not evidence of demand or educational effectiveness.
