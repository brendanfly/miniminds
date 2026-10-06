# MiniMinds game garden

This is a living idea backlog, not a promise to ship 50 games. Keep proposed games out of the playable catalog until their interactions and learning objectives work end to end.

**Current inventory: 27 playable / 23 proposed.** The original seven-game v0.1.0 and the separate 17-game release stay on their own branches. The next batch adds exactly ten user-approved games, two in each subject, without building platformers or making the remaining proposals clickable.

## Design agreements

- Keep the family pilot local: no accounts, child analytics, ads, uploads, or purchases.
- Use subject and learning-stage filters together. Ages are approximate guides, never ability gates.
- Little Explorers: roughly 3-4, with colors, matching, listening, and small quantities.
- Kindergarten Crew: roughly 5-6, with letter sounds, blending, familiar words, simple sentences, and early arithmetic.
- Growing Thinkers: roughly 7, with more independent reading, number strategies, experiments, and money choices.
- Prefer short, untimed rounds, gentle retries, optional spoken help, and large touch targets. Keyboard operation must work too.
- Combine familiar words with future sound/blending activities; word recognition alone is not a reading curriculum.
- Start everyday-quantity learning with non-currency tokens, then visible pretend whole-dollar quantities. Explore choices without judging generosity, household income, saving/spending, or culturally dependent needs and wants.
- In science, use predict -> try -> observe, and explain the limits of simplified simulations.
- Test with the family before describing any age or skill fit as validated.

## Implementation waves

| Wave | Scope | State |
|---|---|---|
| 1 | Subject/stage filters, catalog metadata, and two modes in the original three games | Playable pilot |
| 2 | Word Builder Workshop, Sight Word Picnic, Snack-Time Addition, Keep, Give, Count | Playable pilot |
| 3 | Alphabet Garden, Silly Sentence Kitchen, Rainbow Mixer, Pattern Painter, Number Train, Take-Away Pond, Grow a Little Garden, Float or Sink Lab, Little Toy Shop, Can I Buy It? | Playable ten-game expansion |
| 4 | Rhyme Time, Story Detective, Color Hunt, Shape Stamp Studio, Number Match, More/Less/Same, Animal Home Match, Life-Cycle Sequencer, Token Jar, Save for Something Special | Playable next ten-game batch |
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

### What the next ten actually shipped

- Rhyme Time has four familiar whole-word picture pairs: cat/hat, sun/bun, hen/pen, duck/truck. Gentle mode gives an ending guide and two choices; growing has three choices without that guide. Optional whole-word synthesis is not reviewed phoneme instruction.
- Story Detective has three coherent original stories, each with explicit who/what/where evidence and questions. Gentle uses one sentence/two choices; growing uses slightly longer text/three choices. Reading or listening is optional support, not a complete reading curriculum.
- Color Hunt has three one-target and three two-target recipes, named paints, labeled circle/square/triangle controls, and undo/reset. Correct completion checks every requested color and that other shapes remain unpainted.
- Shape Stamp Studio uses a labeled nine-square tap/keyboard canvas. Free creation celebrates one finished nonempty picture; growing checks every shape and position in house, stepping-stone, and tower recipes, including empty non-target squares. Undo/reset and stamp replacement work before solving; no drag input, uploads, or remote images.
- Number Match matches numerals with countable berry groups from 1-5 or up to 10, with adjacent distractor quantities and optional spoken counting. More/Less/Same explicitly compares A with B, covers all relations, equality, and empty groups in 0-5/0-10 modes, and adds a pairing guide in gentle mode.
- Animal Home Match specifies mallard swimming/feeding water, common-frog egg-laying freshwater, dry farm shelter for a domestic hen, and a clownfish's natural warm saltwater reef. Gentle adds suitability explanations/two choices; growing uses three choices and a post-answer observation. Options are intentionally unambiguous for the stated situation, not universal one-home rules.
- Life-Cycle Sequencer has reversible illustrated selections and exact order validation. Gentle guides four-stage bean/butterfly cycles; growing adds five-stage common-frog and bean sequences and less-guided butterfly stages. Observations connect new eggs/seeds back to another cycle and explain real elapsed time, species, and conditions. Growth is simplified, not instant or a fixed-duration claim; no waits.
- Token Jar changes non-currency token amounts to visible goals, with add/remove/undo/reset and 0-5/0-10 ranges. Growing includes a no-change goal; both include zero. It is quantity groundwork, not a shop.
- Save for Something Special plans the start-to-goal gap before contributing one or two pretend tokens, then observes remaining amounts and checks the exact goal. Both 0-5/0-10 modes include already-reached goals requiring zero more; extras can be removed or undone. Gentle explains the gap; growing omits the extra guide. No real earning, waiting, streaks, purchases, household finances, or moral ranking.

Live metadata now recommends 15 scaffolded activities for E (adult help with science), all 27 for K, and 26 for T because Letter Friends remains a 3-6 recommendation. Life-cycle sequences, new reading comprehension/rhymes, and savings recommend K/T based on their current instruction demands. Money + E now shows Token Jar. Every current subject/stage intersection is nonempty; no empty catalog is invented. These are implementation-based recommendations, not child-tested age claims.

### Implementation-derived refinements (not child observations)

Keep object **form** as well as material in future science datasets; the solid aluminum/empty foil boat contrast remains a bounded alternative to vague "metal sinks" prompts. Life-cycle sequences now reuse staged plant art and add a seed-pod illustration, with no real-time wait. Future cycles should retain a named species, a defined starting stage, and an explanation of how reproduction begins another cycle. Habitat prompts should state the animal and its current need, not claim one universal home. Empty/equal comparison and already-reached savings goals are valuable boundaries, not errors. Named grid positions make shape recipes testable without drag-only input; non-target emptiness is part of recipe correctness. Expand story/rhyme vocabulary only when original art and explicit evidence support it. Review phoneme audio separately before Sound Safari or Blend & Find; letter-name synthesis is not a substitute. No child observations were used to validate this batch's age recommendations.

## 50-game backlog

E = Little Explorers; K = Kindergarten Crew; T = Growing Thinkers. Stages here are tentative product ideas; the live catalog is authoritative for currently implemented stage recommendations.

### Reading

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 1 | Letter Friends | E, K | Match uppercase shapes or uppercase/lowercase pairs. | Playable |
| 2 | Alphabet Garden | E, K, T | Match all 26 uppercase shapes or uppercase/lowercase pairs to grow flowers. | Playable |
| 3 | Sound Safari | K | Match a beginning sound with a pictured object. Use reviewed phoneme audio rather than synthesized letter names. | Proposed |
| 4 | Rhyme Time | K, T | Four labeled whole-word picture pairs; guided two-choice or less-guided three-choice matching. | Playable |
| 5 | Word Builder Workshop | K, T | Arrange tiles to copy or spell cat, sun, hen, and duck with different levels of support. | Playable |
| 6 | Blend & Find | K | Blend separate sounds and choose a picture. Needs reviewed phoneme audio. | Proposed |
| 7 | Sight Word Picnic | K, T | Match six familiar words or complete a sentence with spoken help. | Playable |
| 8 | Silly Sentence Kitchen | K, T | Arrange four original sentences with a guide or distractor, then see matching art. | Playable |
| 9 | Story Detective | K, T | Three original stories with nine explicit who/what/where questions; short/two-choice or longer/three-choice modes. | Playable |
| 10 | Word Quest | T | Explore a gentle platforming level with stopped reading checkpoints. | Proposed |

### Coloring and creativity

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 11 | Coloring Garden | E, K, T | Free-color flower and house pictures, or follow a color recipe. More pictures are future additions. | Playable |
| 12 | Color Hunt | E, K, T | Follow one- or two-target named color/shape recipes; undo/reset and check untouched shapes too. | Playable |
| 13 | Rainbow Mixer | E, K, T | Explore two equal primary-color scoops or follow orange/green/purple recipes in an explicit simplified model. | Playable |
| 14 | Shape Stamp Studio | E, K, T | Tap a labeled nine-square canvas for free creation or three exactly checked shape/location recipes. | Playable |
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
| 22 | Number Match | E, K, T | Match numerals to countable berry groups from 1-5 or up to 10. | Playable |
| 23 | More, Less, Same | E, K, T | Compare group A to B from 0-5 or 0-10, including genuine equality and empty groups. | Playable |
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
| 31 | Animal Home Match | E, K, T | Four specified animal/need situations; guided or less-guided suitable-place choices with explanatory observations. | Playable |
| 32 | Weather Wardrobe | E | Choose clothing for different weather; accept reasonable alternatives. | Proposed |
| 33 | Five Senses Detective | E, K | Explore how senses help us investigate; include accessible alternatives. | Proposed |
| 34 | Grow a Little Garden | E, K, T | Guided or less-guided prediction/care/observation in three explicitly simulated plant-growth steps. | Playable |
| 35 | Float or Sink Lab | E, K, T | Predict, test, and observe three clue-supported or six specified object forms in a virtual tub. | Playable |
| 36 | Magnet Explorer | K | Predict and test attraction for specific materials, not all metals. | Proposed |
| 37 | Life-Cycle Sequencer | K, T | Reversibly order guided bean/butterfly or less-guided common-frog/bean/butterfly stages; explain cycles and elapsed-time limits. | Playable |
| 38 | Shadow Playground | K, T | Move a light and observe shadows. | Proposed |
| 39 | Ramp Racers | T | Change ramp height or surface and compare a toy's travel. | Proposed |
| 40 | Habitat Helpers | T | Provide appropriate food, water, shelter, and space. | Proposed |

### Money and everyday choices

| # | Game | Stage | Idea / learning objective | State |
|---|---|---|---|---|
| 41 | Token Jar | E, K, T | Change non-currency token amounts to visible 0-5/0-10 goals, including zero and no change. | Playable |
| 42 | Keep, Give, Count | K, T | Start with pretend dollars, move a requested amount, and count what remains. Includes an empty wallet. | Playable |
| 43 | Little Toy Shop | K, T | Pay exact $1-$5 or $1-$10 prices with reversible pretend tokens. | Playable |
| 44 | Can I Buy It? | K, T | Compare $0-$5 or $0-$10 wallets and prices, including less/equal/more cases. | Playable |
| 45 | Save for Something Special | K, T | Plan remaining tokens, make reversible pretend contributions, and exactly reach goals to 5/10, including already-reached goals. | Playable |
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
