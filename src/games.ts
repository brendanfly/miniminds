import type { Picture } from './Art';

export type Subject = 'reading' | 'coloring' | 'math' | 'science' | 'money';
export type Category = 'all' | Subject;
export type Stage = 'explorers' | 'kindergarten' | 'thinkers';
export type StageFilter = 'all' | Stage;
export type Difficulty = 'gentle' | 'growing';
export type NextGameId = 'rhyme-time' | 'story-detective' | 'color-hunt' | 'shape-studio' | 'number-match' | 'more-less-same' | 'animal-home' | 'life-cycle' | 'token-jar' | 'save-special';
export type ExpansionGameId = 'alphabet-garden' | 'sentence-kitchen' | 'rainbow-mixer' | 'pattern-painter' | 'number-train' | 'take-away-pond' | 'grow-garden' | 'float-sink' | 'toy-shop' | 'can-buy' | NextGameId;
export type PackGameId = 'word-builder' | 'sight-words' | 'addition' | 'give-count';
export type GameId = 'coloring' | 'letters' | 'numbers' | PackGameId | ExpansionGameId;

export const stages: { id: StageFilter; label: string; age: string; description: string }[] = [
  { id: 'all', label: 'All stages', age: '', description: 'A little adventure for every learner.' },
  { id: 'explorers', label: 'Little Explorers', age: '3-4', description: 'Explore colors, letter shapes, and counting up to 5.' },
  { id: 'kindergarten', label: 'Kindergarten Crew', age: '5-6', description: 'Discover words, bigger numbers, and everyday money choices.' },
  { id: 'thinkers', label: 'Growing Thinkers', age: '7', description: 'Try less help, sentence practice, and bigger number challenges.' },
];

type Game = {
  id: GameId;
  title: string;
  subtitle: string;
  subject: Subject;
  category: string;
  age: string;
  stages: Stage[];
  skills: string[];
  interaction: 'coloring' | 'matching' | 'word-building' | 'object-manipulation' | 'sequencing' | 'experiment';
  invitation: string;
  defaultDifficulty: Difficulty;
  modes: Record<Difficulty, { label: string; description: string }>;
};

export const games: Game[] = [
  {
    id: 'rhyme-time', title: 'Rhyme Time', subtitle: 'Listen for familiar word endings.',
    subject: 'reading', category: 'WHOLE-WORD RHYMES', age: 'Ages 5-7 with help',
    stages: ['kindergarten', 'thinkers'], skills: ['rhyming whole words', 'listening and matching'],
    interaction: 'matching', invitation: 'Find a rhyming pair', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Rhyme guide', description: 'Four familiar illustrated pairs with an ending guide and two choices.' }, growing: { label: 'Rhyme explorer', description: 'Find rhyming words among three labeled pictures without the extra guide.' } },
  },
  {
    id: 'story-detective', title: 'Story Detective', subtitle: 'Tiny stories. Thoughtful discoveries.',
    subject: 'reading', category: 'WHO, WHAT & WHERE', age: 'Ages 5-7 with help',
    stages: ['kindergarten', 'thinkers'], skills: ['story comprehension', 'finding evidence'],
    interaction: 'matching', invitation: 'Explore a little story', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Short story guide', description: 'Listen or read one sentence and answer who, what, or where with two choices.' }, growing: { label: 'Story explorer', description: 'Explore longer original stories with three answer choices.' } },
  },
  {
    id: 'color-hunt', title: 'Color Hunt', subtitle: 'Find a shape. Follow a color clue.',
    subject: 'coloring', category: 'NAMED COLORS & SHAPES', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['color names', 'following instructions'],
    interaction: 'coloring', invitation: 'Follow a color hunt', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'One color clue', description: 'Color one named shape and leave the others unpainted.' }, growing: { label: 'Two color clues', description: 'Follow two named shape/color instructions with reversible paints.' } },
  },
  {
    id: 'shape-studio', title: 'Shape Stamp Studio', subtitle: 'Little shapes make your own picture.',
    subject: 'coloring', category: 'SHAPES & POSITIONS', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['shape recognition', 'spatial position'],
    interaction: 'object-manipulation', invitation: 'Stamp a shape picture', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Free stamp picture', description: 'Tap a nine-square canvas to create with circles, squares, and triangles.' }, growing: { label: 'Stamp recipes', description: 'Follow three recipes checked against actual shapes and labeled positions.' } },
  },
  {
    id: 'number-match', title: 'Number Match', subtitle: 'A numeral meets a countable group.',
    subject: 'math', category: 'NUMERALS & QUANTITIES', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['numeral recognition', 'counting correspondence'],
    interaction: 'matching', invitation: 'Match a berry group', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Groups to 5', description: 'Match numerals to visible berry groups from 1-5 with a counting guide.' }, growing: { label: 'Groups to 10', description: 'Match larger visible groups up to 10 without the extra guide.' } },
  },
  {
    id: 'more-less-same', title: 'More, Less, Same', subtitle: 'Compare two little berry groups.',
    subject: 'math', category: 'COMPARE QUANTITIES', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['quantity comparison', 'equality and zero'],
    interaction: 'matching', invitation: 'Compare A with B', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Compare groups to 5', description: 'Use small visible groups and a pairing guide, including equality and zero.' }, growing: { label: 'Compare groups to 10', description: 'Compare quantities to 10, including empty groups and equal amounts.' } },
  },
  {
    id: 'animal-home', title: 'Animal Home Match', subtitle: 'Find a place that suits this animal.',
    subject: 'science', category: 'SPECIFIED ANIMALS & NEEDS', age: 'Ages 3-7 with help',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['animal needs', 'habitat suitability'],
    interaction: 'matching', invitation: 'Explore suitable homes', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Animal home guide', description: 'Four specified animal situations with an explanatory guide and two choices.' }, growing: { label: 'Habitat choices', description: 'Choose among three places, then observe why one suits the specified animal.' } },
  },
  {
    id: 'life-cycle', title: 'Life-Cycle Sequencer', subtitle: 'See how growing stages connect.',
    subject: 'science', category: 'SEQUENCES & CYCLES', age: 'Ages 5-7 with help',
    stages: ['kindergarten', 'thinkers'], skills: ['life-cycle order', 'observation of change'],
    interaction: 'sequencing', invitation: 'Connect growing stages', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Cycle sequence guide', description: 'Order four illustrated bean or butterfly stages with a written sequence guide.' }, growing: { label: 'Cycle explorer', description: 'Order less-guided common frog, bean, or butterfly sequences of four or five stages.' } },
  },
  {
    id: 'token-jar', title: 'Token Jar', subtitle: 'Add, remove, and match a little goal.',
    subject: 'money', category: 'NON-CURRENCY QUANTITIES', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['quantity adjustment', 'zero and matching'],
    interaction: 'object-manipulation', invitation: 'Change a pretend jar', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Jar quantities to 5', description: 'Add or remove non-currency tokens to match visible goals from 0-5.' }, growing: { label: 'Jar changes to 10', description: 'Change starting quantities to goals from 0-10, including no change and zero.' } },
  },
  {
    id: 'save-special', title: 'Save for Something Special', subtitle: 'Plan and explore a pretend savings goal.',
    subject: 'money', category: 'PRETEND GOAL PLANNING', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['remaining amounts', 'planning contributions'],
    interaction: 'object-manipulation', invitation: 'Explore pretend savings', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Savings guide to 5', description: 'Plan how many more tokens are needed, then contribute toward goals to 5.' }, growing: { label: 'Savings planner to 10', description: 'Plan and make reversible contributions toward exact goals to 10, including already-reached goals.' } },
  },
  {
    id: 'coloring', title: 'Coloring Garden', subtitle: 'A little color. A lot of imagination.',
    subject: 'coloring', category: 'CREATE & EXPLORE', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['color recognition', 'following instructions'],
    interaction: 'coloring', invitation: 'Make it your own', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Free coloring', description: 'Choose any colors and make it your own.' }, growing: { label: 'Color challenge', description: 'Follow a little color recipe. Switching modes starts a fresh picture.' } },
  },
  {
    id: 'letters', title: 'Letter Friends', subtitle: 'Meet the ABCs, one friend at a time.',
    subject: 'reading', category: 'LETTER NAMES & SHAPES', age: 'Ages 3-6',
    stages: ['explorers', 'kindergarten'], skills: ['letter recognition', 'uppercase and lowercase'],
    interaction: 'matching', invitation: 'Find a letter friend', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Big letters', description: 'Match uppercase letter shapes.' }, growing: { label: 'Big & little', description: 'Match a big letter with its lowercase friend.' } },
  },
  {
    id: 'numbers', title: 'Counting Meadow', subtitle: 'Little numbers, big discoveries.',
    subject: 'math', category: 'NUMBERS & COUNTING', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['one-to-one counting', 'numerals'],
    interaction: 'object-manipulation', invitation: 'Count along with us', defaultDifficulty: 'growing',
    modes: { gentle: { label: 'Count to 5', description: 'Count little groups of 1-5 flowers.' }, growing: { label: 'Count to 10', description: 'Explore groups of 1-10 flowers.' } },
  },
  {
    id: 'word-builder', title: 'Word Builder Workshop', subtitle: 'Little letters make wonderful words.',
    subject: 'reading', category: 'BUILD & READ', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['letter sequencing', 'word spelling'],
    interaction: 'word-building', invitation: 'Build a little word', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'With a word guide', description: 'Copy a three-letter word using letter tiles.' }, growing: { label: 'Picture challenge', description: 'Spell the pictured word with an extra letter to choose from. Hear the word if you need help.' } },
  },
  {
    id: 'sight-words', title: 'Sight Word Picnic', subtitle: 'Pack a picnic with familiar words.',
    subject: 'reading', category: 'WORDS & SENTENCES', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['high-frequency words', 'sentence practice'],
    interaction: 'matching', invitation: 'Find a picnic word', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Word match', description: 'Match a familiar word to the word guide.' }, growing: { label: 'Sentence picnic', description: 'Choose a word to finish a short sentence. Hear the whole sentence for help.' } },
  },
  {
    id: 'addition', title: 'Snack-Time Addition', subtitle: 'Bring little groups together.',
    subject: 'math', category: 'ADD & DISCOVER', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['addition', 'counting on'],
    interaction: 'object-manipulation', invitation: 'Pack a tasty picnic', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Totals to 5', description: 'Combine two small groups of apples.' }, growing: { label: 'Totals to 10', description: 'Combine bigger groups and find the total.' } },
  },
  {
    id: 'give-count', title: 'Keep, Give, Count', subtitle: 'Little dollars. Thoughtful choices.',
    subject: 'money', category: 'PRETEND MONEY & SUBTRACTION', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['subtraction', 'money quantities'],
    interaction: 'object-manipulation', invitation: 'Explore pretend dollars', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Dollars to 5', description: 'Move pretend one-dollar tokens and count what remains.' }, growing: { label: 'Dollars to 10', description: 'Explore larger amounts, including an empty wallet.' } },
  },
  {
    id: 'alphabet-garden', title: 'Alphabet Garden', subtitle: 'Let all 26 letter flowers bloom.',
    subject: 'reading', category: 'LETTER NAMES & PAIRS', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['26 letter shapes', 'uppercase and lowercase'],
    interaction: 'matching', invitation: 'Grow a letter flower', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Letter shapes', description: 'Match all 26 uppercase English letters, one flower at a time.' }, growing: { label: 'Letter pairs', description: 'Find each uppercase letter\'s lowercase partner.' } },
  },
  {
    id: 'sentence-kitchen', title: 'Silly Sentence Kitchen', subtitle: 'A few words. A little picture story.',
    subject: 'reading', category: 'WORDS IN ORDER', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['sentence order', 'sentence meaning'],
    interaction: 'word-building', invitation: 'Cook a little sentence', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Sentence guide', description: 'Copy an original sentence with reversible word tiles.' }, growing: { label: 'Sentence chef', description: 'Build the requested sentence without a written guide, with one extra word.' } },
  },
  {
    id: 'rainbow-mixer', title: 'Rainbow Mixer', subtitle: 'Two little scoops. A new discovery.',
    subject: 'coloring', category: 'PRETEND PAINT LAB', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['color names', 'simplified paint mixing'],
    interaction: 'experiment', invitation: 'Mix pretend paints', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Free mixing', description: 'Explore two equal scoops of red, yellow, or blue pretend paint.' }, growing: { label: 'Mixing recipes', description: 'Discover recipes for orange, green, and purple in our simplified model.' } },
  },
  {
    id: 'pattern-painter', title: 'Pattern Painter', subtitle: 'Spot a pattern. Paint what comes next.',
    subject: 'coloring', category: 'SHAPES & PATTERNS', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['repeating patterns', 'shape recognition'],
    interaction: 'matching', invitation: 'Complete a pattern', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Two-part patterns', description: 'Finish repeating AB patterns with labeled shapes and colors.' }, growing: { label: 'Pattern puzzles', description: 'Explore ABC, AAB, and ABB repeating patterns.' } },
  },
  {
    id: 'number-train', title: 'Number Train', subtitle: 'All aboard the counting line!',
    subject: 'math', category: 'NUMBER ORDER', age: 'Ages 3-7',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['number sequencing', 'missing numbers'],
    interaction: 'sequencing', invitation: 'Line up the carriages', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Small train', description: 'Tap to arrange sequences of 3-5 carriages, using numbers 1-5.' }, growing: { label: 'Missing carriage', description: 'Find missing numbers in sequences from 1 through 10.' } },
  },
  {
    id: 'take-away-pond', title: 'Take-Away Pond', subtitle: 'Some ducks wander. Some ducks stay.',
    subject: 'math', category: 'TAKE AWAY & COUNT', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['subtraction', 'counting remaining objects'],
    interaction: 'object-manipulation', invitation: 'Move and count ducks', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Pond to 5', description: 'Move the requested ducks to shore, then count those left. Includes zero.' }, growing: { label: 'Pond to 10', description: 'Explore groups up to 10, with reversible moves and an empty pond.' } },
  },
  {
    id: 'grow-garden', title: 'Grow a Little Garden', subtitle: 'Care, wonder, and watch a plant.',
    subject: 'science', category: 'CARE & OBSERVE', age: 'Ages 3-7 with help',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['plant needs', 'prediction and observation'],
    interaction: 'experiment', invitation: 'Care for a pretend plant', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Guided garden', description: 'Use a care guide to predict and explore three untimed simulated growth steps.' }, growing: { label: 'Garden predictions', description: 'Predict whether current conditions support growth without the extra guide, then observe and adjust care.' } },
  },
  {
    id: 'float-sink', title: 'Float or Sink Lab', subtitle: 'Make a guess. Try it. Notice what happens.',
    subject: 'science', category: 'PREDICT & TEST', age: 'Ages 3-7 with help',
    stages: ['explorers', 'kindergarten', 'thinkers'], skills: ['testing predictions', 'material and form'],
    interaction: 'experiment', invitation: 'Explore a virtual tub', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'With material clues', description: 'Predict and test three specified objects with helpful clues.' }, growing: { label: 'Lab explorer', description: 'Explore six specified materials and forms without the extra clue.' } },
  },
  {
    id: 'toy-shop', title: 'Little Toy Shop', subtitle: 'Count pretend dollars for a toy.',
    subject: 'money', category: 'EXACT PRETEND PAYMENT', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['exact quantities', 'whole-dollar prices'],
    interaction: 'object-manipulation', invitation: 'Pay a pretend price', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Prices to 5', description: 'Add or remove pretend $1 tokens to match prices from $1-$5.' }, growing: { label: 'Prices to 10', description: 'Match prices from $1-$10 exactly. No real money or shopping.' } },
  },
  {
    id: 'can-buy', title: 'Can I Buy It?', subtitle: 'Compare a wallet and a price.',
    subject: 'money', category: 'ENOUGH OR NOT ENOUGH', age: 'Ages 5-7',
    stages: ['kindergarten', 'thinkers'], skills: ['quantity comparison', 'equal amounts'],
    interaction: 'matching', invitation: 'Compare pretend dollars', defaultDifficulty: 'gentle',
    modes: { gentle: { label: 'Compare to 5', description: 'Use visible tokens and amounts from $0-$5 to compare a wallet with a price.' }, growing: { label: 'Compare to 10', description: 'Compare amounts from $0-$10, including exact prices and an empty wallet.' } },
  },
];

export function filterGames(category: Category, stage: StageFilter): Game[] {
  return games.filter(game => (category === 'all' || game.subject === category) && (stage === 'all' || game.stages.includes(stage)));
}

export function startingDifficulty(game: Game, stage: StageFilter): Difficulty {
  if (stage === 'explorers') return 'gentle';
  if (stage === 'thinkers' || (stage === 'kindergarten' && (game.id === 'letters' || game.id === 'numbers'))) return 'growing';
  return game.defaultDifficulty;
}

export const letterRounds = [
  { letter: 'A', word: 'apple', picture: 'apple', choices: ['A', 'B', 'C'] },
  { letter: 'B', word: 'butterfly', picture: 'butterfly', choices: ['D', 'B', 'A'] },
  { letter: 'C', word: 'cat', picture: 'cat', choices: ['B', 'D', 'C'] },
  { letter: 'D', word: 'duck', picture: 'duck', choices: ['D', 'C', 'A'] },
  { letter: 'F', word: 'flower', picture: 'flower', choices: ['B', 'F', 'D'] },
  { letter: 'S', word: 'sun', picture: 'sun', choices: ['A', 'C', 'S'] },
] as const;

export const countRounds = [3, 1, 4, 2, 5, 6, 8, 7, 9, 10];

export function numberChoices(answer: number, minimum = 0, maximum = 10): number[] {
  const start = Math.max(minimum, Math.min(answer - 1, maximum - 2));
  return [start, start + 1, start + 2];
}

export function countChoices(answer: number, maximum = 10): number[] {
  return numberChoices(answer, 1, maximum);
}

export const wordRounds: Record<Difficulty, { word: string; picture: Picture }[]> = {
  gentle: [{ word: 'cat', picture: 'cat' }, { word: 'sun', picture: 'sun' }, { word: 'hen', picture: 'hen' }],
  growing: [{ word: 'duck', picture: 'duck' }, { word: 'hen', picture: 'hen' }, { word: 'cat', picture: 'cat' }, { word: 'sun', picture: 'sun' }],
};

export function wordTiles(word: string, difficulty: Difficulty): string[] {
  const tiles = [...word].reverse();
  if (difficulty === 'growing') tiles.splice(1, 0, 'm');
  return tiles;
}

export const sightWordRounds = [
  { word: 'see', before: 'I', after: 'a cat.', choices: ['the', 'see', 'we'], picture: 'cat' },
  { word: 'the', before: 'Look at', after: 'sun.', choices: ['the', 'you', 'can'], picture: 'sun' },
  { word: 'can', before: 'A duck', after: 'swim.', choices: ['is', 'the', 'can'], picture: 'duck' },
  { word: 'my', before: 'This is', after: 'apple.', choices: ['we', 'my', 'see'], picture: 'apple' },
  { word: 'is', before: 'The flower', after: 'pink.', choices: ['is', 'you', 'can'], picture: 'flower' },
  { word: 'we', before: 'Together,', after: 'can see a butterfly.', choices: ['the', 'my', 'we'], picture: 'butterfly' },
] satisfies { word: string; before: string; after: string; choices: string[]; picture: Picture }[];

export const additionRounds: Record<Difficulty, { left: number; right: number }[]> = {
  gentle: [{ left: 1, right: 2 }, { left: 2, right: 3 }, { left: 2, right: 2 }, { left: 1, right: 1 }],
  growing: [{ left: 4, right: 3 }, { left: 5, right: 5 }, { left: 2, right: 4 }, { left: 4, right: 4 }, { left: 5, right: 4 }],
};

export const moneyRounds: Record<Difficulty, { start: number; give: number }[]> = {
  gentle: [{ start: 4, give: 1 }, { start: 5, give: 2 }, { start: 3, give: 1 }, { start: 2, give: 2 }],
  growing: [{ start: 8, give: 3 }, { start: 10, give: 4 }, { start: 7, give: 2 }, { start: 6, give: 6 }, { start: 9, give: 1 }],
};

export const colorRecipes: Record<'flower' | 'house', { region: string; color: string }[]> = {
  flower: [
    ...Array.from({ length: 6 }, (_, i) => ({ region: `petal ${i + 1}`, color: 'Pink' })),
    { region: 'flower center', color: 'Yellow' }, { region: 'stem', color: 'Green' },
    { region: 'left leaf', color: 'Green' }, { region: 'right leaf', color: 'Green' },
  ],
  house: [
    { region: 'sun', color: 'Yellow' }, { region: 'house wall', color: 'Yellow' },
    { region: 'roof', color: 'Coral' }, { region: 'door', color: 'Blue' },
    { region: 'left window', color: 'Purple' }, { region: 'right window', color: 'Purple' },
    { region: 'grass', color: 'Green' },
  ],
};
