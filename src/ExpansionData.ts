import type { Picture } from './Art';
import type { Difficulty } from './games';

export const alphabetRounds = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter, index, letters) => ({
  letter,
  choices: [letters[(index + 7) % 26], letter, letters[(index + 1) % 26]].sort((a, b) => a.localeCompare(b)),
}));

export const sentenceRounds: { words: string[]; picture: Picture; meaning: string; distractor: string }[] = [
  { words: ['The', 'cat', 'smiles.'], picture: 'cat', meaning: 'Tell us that the cat smiles.', distractor: 'swims.' },
  { words: ['The', 'duck', 'swims.'], picture: 'duck', meaning: 'Tell us that the duck swims.', distractor: 'shines.' },
  { words: ['The', 'sun', 'shines.'], picture: 'sun', meaning: 'Tell us that the sun shines.', distractor: 'swims.' },
  { words: ['The', 'hen', 'stands.'], picture: 'hen', meaning: 'Tell us that the hen stands.', distractor: 'shines.' },
];

export type PrimaryPaint = 'Red' | 'Yellow' | 'Blue';
export type PaintColor = PrimaryPaint | 'Orange' | 'Green' | 'Purple';
export const paintColors: Record<PaintColor, string> = {
  Red: '#e77b68', Yellow: '#edc65e', Blue: '#94bcc9',
  Orange: '#eba45c', Green: '#86ae74', Purple: '#b8a3d0',
};
export const primaryPaints: PrimaryPaint[] = ['Red', 'Yellow', 'Blue'];
export const mixingRecipes: PaintColor[] = ['Orange', 'Green', 'Purple'];
export function mixPaints(a: PrimaryPaint, b: PrimaryPaint): PaintColor {
  if (a === b) return a;
  if (a !== 'Blue' && b !== 'Blue') return 'Orange';
  if (a !== 'Red' && b !== 'Red') return 'Green';
  return 'Purple';
}

export const patternPieces = [
  { label: 'Red circle', color: paintColors.Red, shape: 'circle' },
  { label: 'Blue square', color: paintColors.Blue, shape: 'square' },
  { label: 'Yellow triangle', color: paintColors.Yellow, shape: 'triangle' },
] as const;
export const patternRounds: Record<Difficulty, number[][]> = {
  gentle: [[0, 1], [1, 2], [2, 0]],
  growing: [[0, 1, 2], [0, 0, 1], [2, 1, 1]],
};
export function patternTask(unit: number[]) {
  const shown = Array.from({ length: unit.length * 2 + 1 }, (_, i) => unit[i % unit.length]);
  return { shown, answer: unit[shown.length % unit.length] };
}

export const trainRounds: Record<Difficulty, { sequence: number[]; missing: number }[]> = {
  gentle: [
    { sequence: [1, 2, 3], missing: 1 },
    { sequence: [2, 3, 4, 5], missing: 2 },
    { sequence: [1, 2, 3, 4, 5], missing: 3 },
  ],
  growing: [0, 4, 9].map(missing => ({ sequence: Array.from({ length: 10 }, (_, i) => i + 1), missing })),
};
export const pondRounds: Record<Difficulty, { start: number; away: number }[]> = {
  gentle: [{ start: 4, away: 1 }, { start: 5, away: 2 }, { start: 2, away: 2 }, { start: 3, away: 1 }],
  growing: [{ start: 8, away: 3 }, { start: 10, away: 4 }, { start: 6, away: 6 }, { start: 9, away: 1 }],
};
export const toyRounds: Record<Difficulty, { name: string; picture: Picture; price: number }[]> = {
  gentle: [3, 1, 5, 2, 4].map((price, i) => ({ name: i % 2 ? 'toy cat' : 'toy duck', picture: i % 2 ? 'cat' : 'duck', price })),
  growing: [7, 10, 1, 6, 9, 2, 8, 3, 5, 4].map((price, i) => ({ name: i % 2 ? 'toy cat' : 'toy duck', picture: i % 2 ? 'cat' : 'duck', price })),
};
export const buyRounds: Record<Difficulty, { wallet: number; price: number }[]> = {
  gentle: [{ wallet: 2, price: 3 }, { wallet: 3, price: 3 }, { wallet: 5, price: 3 }, { wallet: 0, price: 1 }, { wallet: 1, price: 1 }],
  growing: [{ wallet: 6, price: 7 }, { wallet: 10, price: 10 }, { wallet: 9, price: 7 }, { wallet: 0, price: 5 }, { wallet: 7, price: 7 }],
};

export type LabObject = 'cork' | 'spoon' | 'stone' | 'ball' | 'foil-ball' | 'foil-boat';
export type FloatOutcome = 'Float' | 'Sink';
export const floatRounds: { id: LabObject; name: string; outcome: FloatOutcome; clue: string; observation: string }[] = [
  { id: 'cork', name: 'Dry cork stopper', outcome: 'Float', clue: 'Dry cork is less dense than water.', observation: 'The dry cork floats at the surface. Dry cork is less dense than water.' },
  { id: 'spoon', name: 'Solid steel spoon', outcome: 'Sink', clue: 'Solid steel is denser than water.', observation: 'The solid steel spoon sinks to the bottom. Steel is denser than water.' },
  { id: 'stone', name: 'Solid granite pebble', outcome: 'Sink', clue: 'This solid granite pebble is denser than water.', observation: 'The solid granite pebble sinks. Not all rocks behave the same way; some porous rocks can float.' },
  { id: 'ball', name: 'Sealed air-filled beach ball', outcome: 'Float', clue: 'The sealed ball has lots of air inside.', observation: 'The sealed air-filled beach ball floats. Its air-filled form matters, not just its outer material.' },
  { id: 'foil-ball', name: 'Tightly compressed solid aluminum ball', outcome: 'Sink', clue: 'There are no trapped air pockets in this solid ball.', observation: 'The tightly compressed solid aluminum ball sinks. Aluminum is denser than water.' },
  { id: 'foil-boat', name: 'Empty aluminum foil boat, open side up', outcome: 'Float', clue: 'This wide, empty boat holds air above the water.', observation: 'The empty aluminum foil boat floats while water stays out. Its shape displaces enough water; it can sink if filled.' },
];
export const gardenRounds = [
  { water: false, light: false },
  { water: true, light: false },
  { water: false, light: true },
];
export const growthStages = ['Seed', 'Sprout', 'Leafy plant', 'Flowering plant'];
