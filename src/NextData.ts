import type { Difficulty } from './games';

export type NextPicture = 'cat' | 'sun' | 'hen' | 'duck' | 'butterfly' | 'ball' | 'red-ball' | 'seed' | 'sprout' | 'leaf' | 'plant' | 'seeds' | 'hat' | 'bun' | 'pen' | 'truck' | 'kite' | 'frog' | 'legs' | 'young-frog' | 'fish' | 'egg' | 'eggs' | 'caterpillar' | 'chrysalis' | 'tadpole' | 'jar';

export const rhymeRounds = [
  { word: 'cat', match: 'hat', other: ['sun', 'pen'], clue: 'Listen for the ending: cat, hat.' },
  { word: 'sun', match: 'bun', other: ['duck', 'cat'], clue: 'Listen for the ending: sun, bun.' },
  { word: 'hen', match: 'pen', other: ['hat', 'truck'], clue: 'Listen for the ending: hen, pen.' },
  { word: 'duck', match: 'truck', other: ['bun', 'hen'], clue: 'Listen for the ending: duck, truck.' },
] as const;

export const storyRounds = [
  { short: 'Mia carries a red ball to the park.', long: 'Mia carries a red ball to the park. She rolls it on the grass, then puts it in her bag.', questions: [
    { ask: 'Who carries the ball?', answer: 'Mia', choices: ['Mia', 'Ben', 'Ada'] },
    { ask: 'What does Mia carry?', answer: 'A red ball', choices: ['A kite', 'A red ball', 'A book'] },
    { ask: 'Where does Mia go?', answer: 'The park', choices: ['The beach', 'The park', 'The kitchen'] },
  ], picture: 'red-ball' },
  { short: 'Ben takes a kite to the beach.', long: 'Ben takes a kite to the beach. The wind lifts the kite. Ben holds its string beside the sand.', questions: [
    { ask: 'Who takes the kite?', answer: 'Ben', choices: ['Mia', 'Ben', 'Ada'] },
    { ask: 'What does Ben take?', answer: 'A kite', choices: ['A kite', 'A ball', 'A bun'] },
    { ask: 'Where does Ben go?', answer: 'The beach', choices: ['The park', 'The kitchen', 'The beach'] },
  ], picture: 'kite' },
  { short: 'Ada puts a bun on a plate in the kitchen.', long: 'Ada puts a bun on a plate in the kitchen. She sits at the table and shares the bun with Ben.', questions: [
    { ask: 'Who puts the bun on a plate?', answer: 'Ada', choices: ['Ben', 'Mia', 'Ada'] },
    { ask: 'What does Ada put on a plate?', answer: 'A bun', choices: ['A ball', 'A bun', 'A kite'] },
    { ask: 'Where is Ada?', answer: 'The kitchen', choices: ['The kitchen', 'The park', 'The beach'] },
  ], picture: 'bun' },
] as const;

export const stampShapes = ['circle', 'square', 'triangle'] as const;
export type StampShape = typeof stampShapes[number];
export const gridPlaces = ['top left', 'top middle', 'top right', 'middle left', 'center', 'middle right', 'bottom left', 'bottom middle', 'bottom right'] as const;
export const stampRecipes: { name: string; stamps: { place: number; shape: StampShape }[] }[] = [
  { name: 'Little house', stamps: [{ place: 1, shape: 'triangle' }, { place: 4, shape: 'square' }, { place: 7, shape: 'square' }] },
  { name: 'Three stepping stones', stamps: [{ place: 6, shape: 'circle' }, { place: 7, shape: 'circle' }, { place: 8, shape: 'circle' }] },
  { name: 'Shape tower', stamps: [{ place: 1, shape: 'circle' }, { place: 4, shape: 'triangle' }, { place: 7, shape: 'square' }] },
];
export const huntColors = { Red: '#e77b68', Blue: '#94bcc9', Yellow: '#edc65e', Green: '#86ae74' };
export type HuntColor = keyof typeof huntColors;
export const huntPalette: HuntColor[] = ['Red', 'Blue', 'Yellow', 'Green'];
export const huntRounds: Record<Difficulty, { object: StampShape; color: HuntColor }[][]> = {
  gentle: [[{ object: 'circle', color: 'Red' }], [{ object: 'triangle', color: 'Blue' }], [{ object: 'square', color: 'Yellow' }]],
  growing: [[{ object: 'circle', color: 'Red' }, { object: 'square', color: 'Blue' }], [{ object: 'triangle', color: 'Green' }, { object: 'circle', color: 'Yellow' }], [{ object: 'square', color: 'Yellow' }, { object: 'triangle', color: 'Red' }]],
};
export const matchRounds: Record<Difficulty, number[]> = { gentle: [3, 1, 5, 2, 4], growing: [8, 6, 10, 7, 9, 1, 5] };
export const comparisonRounds: Record<Difficulty, { left: number; right: number }[]> = {
  gentle: [{ left: 2, right: 4 }, { left: 3, right: 3 }, { left: 5, right: 1 }, { left: 0, right: 0 }, { left: 0, right: 2 }],
  growing: [{ left: 10, right: 7 }, { left: 6, right: 9 }, { left: 8, right: 8 }, { left: 0, right: 10 }, { left: 10, right: 0 }, { left: 0, right: 0 }],
};
export function comparison(left: number, right: number) { return left < right ? 'Less' : left > right ? 'More' : 'Same'; }

export const animalRounds = [
  { animal: 'duck', context: 'A mallard duck is looking for water to swim and feed.', home: 'Freshwater pond', choices: ['Dry desert dune', 'Freshwater pond', 'Icy open ocean'], observation: 'A freshwater pond provides swimming water and food for this mallard. Mallards also use land and other wetlands.' },
  { animal: 'frog', context: 'A common frog needs a place to lay eggs in water.', home: 'Freshwater pond', choices: ['Freshwater pond', 'Dry sand tray', 'Dry cupboard'], observation: 'Common frogs lay eggs in freshwater. Adults can spend time on damp land too.' },
  { animal: 'hen', context: 'A domestic hen needs dry shelter and a safe place to rest on a farm.', home: 'Sheltered chicken coop', choices: ['Underwater pool', 'Sheltered chicken coop', 'Open icy sea'], observation: 'A dry, ventilated coop with a perch shelters this domestic hen. Hens also need outdoor space, food, and water.' },
  { animal: 'fish', context: 'A clownfish needs its natural saltwater habitat.', home: 'Warm ocean reef', choices: ['Dry meadow', 'Freshwater puddle', 'Warm ocean reef'], observation: 'Clownfish live in warm saltwater reefs, often among sea anemones. Other fish need different habitats.' },
] as const;

export const cycleRounds: Record<Difficulty, { name: string; stages: string[]; art: NextPicture[]; observation: string }[]> = {
  gentle: [
    { name: 'Bean plant', stages: ['Seed', 'Sprout', 'Flowering plant', 'New seeds'], art: ['seed', 'sprout', 'plant', 'seeds'], observation: 'A bean seed sprouts and grows. Flowers can lead to pods with new seeds, which can start another cycle. This takes real time and suitable conditions.' },
    { name: 'Butterfly', stages: ['Egg', 'Caterpillar', 'Chrysalis', 'Adult butterfly'], art: ['egg', 'caterpillar', 'chrysalis', 'butterfly'], observation: 'A butterfly begins as an egg, becomes a caterpillar, then a chrysalis, then an adult. Adults can lay eggs and start another cycle. Timing varies by species and conditions.' },
  ],
  growing: [
    { name: 'Common frog', stages: ['Eggs in water', 'Tadpole', 'Tadpole with legs', 'Young frog', 'Adult frog'], art: ['eggs', 'tadpole', 'legs', 'young-frog', 'frog'], observation: 'This simplified common-frog sequence shows growth from aquatic eggs and tadpoles to frogs. Adults can lay eggs, beginning another cycle. Species differ; there is no single fixed duration.' },
    { name: 'Bean plant', stages: ['Seed', 'Sprout', 'Leafy plant', 'Flowering plant', 'Pod with seeds'], art: ['seed', 'sprout', 'leaf', 'plant', 'seeds'], observation: 'After growth, pollinated bean flowers can form pods containing new seeds. Seeds can start another cycle. Days and weeks are compressed here; water, light, air, nutrients, warmth, and space matter.' },
    { name: 'Butterfly', stages: ['Egg', 'Caterpillar', 'Chrysalis', 'Adult butterfly'], art: ['egg', 'caterpillar', 'chrysalis', 'butterfly'], observation: 'The adult can lay eggs to begin another cycle. These pictures are a simplified sequence, not instant transformation. Timing depends on species and conditions.' },
  ],
};
export const jarRounds: Record<Difficulty, { start: number; goal: number }[]> = {
  gentle: [{ start: 0, goal: 3 }, { start: 4, goal: 0 }, { start: 1, goal: 5 }, { start: 5, goal: 2 }],
  growing: [{ start: 8, goal: 3 }, { start: 2, goal: 10 }, { start: 10, goal: 0 }, { start: 6, goal: 6 }, { start: 0, goal: 7 }],
};
export const savingsRounds: Record<Difficulty, { toy: 'kite' | 'ball' | 'truck'; start: number; goal: number }[]> = {
  gentle: [{ toy: 'kite', start: 1, goal: 4 }, { toy: 'ball', start: 0, goal: 5 }, { toy: 'truck', start: 3, goal: 3 }, { toy: 'kite', start: 0, goal: 1 }],
  growing: [{ toy: 'truck', start: 3, goal: 10 }, { toy: 'kite', start: 5, goal: 8 }, { toy: 'ball', start: 0, goal: 10 }, { toy: 'truck', start: 7, goal: 7 }],
};
