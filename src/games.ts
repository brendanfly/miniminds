import type { Picture } from './Art';

export type Subject = 'reading' | 'coloring' | 'math' | 'science' | 'money';
export type Category = 'all' | Subject;
export type Stage = 'explorers' | 'kindergarten' | 'thinkers';
export type StageFilter = 'all' | Stage;
export type Difficulty = 'gentle' | 'growing';
export type GameId = 'coloring' | 'letters' | 'numbers' | 'word-builder' | 'sight-words' | 'addition' | 'give-count';
export type PackGameId = Exclude<GameId, 'coloring' | 'letters' | 'numbers'>;

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
  interaction: 'coloring' | 'matching' | 'word-building' | 'object-manipulation';
  invitation: string;
  defaultDifficulty: Difficulty;
  modes: Record<Difficulty, { label: string; description: string }>;
};

export const games: Game[] = [
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
