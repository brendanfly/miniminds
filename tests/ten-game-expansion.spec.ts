import { expect, test, type Page } from '@playwright/test';
import { alphabetRounds, buyRounds, floatRounds, gardenRounds, mixingRecipes, mixPaints, patternPieces, patternRounds, patternTask, pondRounds, sentenceRounds, toyRounds, trainRounds } from '../src/ExpansionData';
import { games, type Difficulty } from '../src/games';

async function open(page: Page, title: string) {
  await page.goto('/');
  await page.getByRole('button', { name: `Play ${title}`, exact: true }).click();
}
async function mode(page: Page, title: string, difficulty: Difficulty) {
  const game = games.find(game => game.title === title);
  if (!game) throw new Error(`Unknown test game ${title}`);
  await page.getByRole('button', { name: game.modes[difficulty].label, exact: true }).click();
}
async function stars(page: Page, count: number) {
  await expect(page.locator('.session-stars')).toHaveText(`${count} happy ${count === 1 ? 'star' : 'stars'}`);
}
async function next(page: Page) {
  await page.getByRole('button', { name: 'Play another', exact: true }).click();
  await expect(page.locator('.game-instruction')).toBeFocused();
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('alphabet garden covers all 26 uppercase shapes and lowercase pairs with single stars', async ({ page }) => {
  await open(page, 'Alphabet Garden');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Alphabet Garden', difficulty);
    await expect(page.getByLabel('Uppercase guide: A')).toBeVisible();
    for (const task of alphabetRounds) {
      const wrong = task.choices.find(value => value !== task.letter);
      if (!wrong) throw new Error('Alphabet distractor missing');
      await page.getByRole('button', { name: `Choose ${difficulty === 'gentle' ? wrong : wrong.toLowerCase()}`, exact: true }).click();
      await stars(page, solved);
      await expect(page.locator('.answer-feedback')).toContainText('Good try');
      const answer = page.getByRole('button', { name: `Choose ${difficulty === 'gentle' ? task.letter : task.letter.toLowerCase()}`, exact: true });
      await answer.click();
      await stars(page, ++solved);
      await expect(answer).toBeDisabled();
      await expect(page.locator('.alphabet-plot svg')).toBeVisible();
      await next(page);
    }
    await expect(page.getByLabel('Uppercase guide: A')).toBeVisible();
  }
});

test('sentence kitchen enforces meaningful word order, reversible slots and every sentence in both modes', async ({ page }) => {
  await open(page, 'Silly Sentence Kitchen');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Silly Sentence Kitchen', difficulty);
    for (const task of sentenceRounds) {
      const sentence = task.words.join(' ');
      await expect(page.getByLabel(`Sentence guide: ${sentence}`, { exact: true })).toHaveCount(difficulty === 'gentle' ? 1 : 0);
      await expect(page.getByRole('button', { name: 'Check sentence' })).toBeDisabled();
      for (const word of [...task.words].reverse()) await page.getByRole('button', { name: `Add word ${word}`, exact: true }).click();
      await page.getByRole('button', { name: 'Check sentence' }).click();
      await expect(page.locator('.answer-feedback')).toContainText('Try a different order');
      await stars(page, solved);
      for (let i = 0; i < task.words.length; i++) await page.getByRole('button', { name: 'Undo word', exact: true }).click();
      if (difficulty === 'growing') {
        await page.getByRole('button', { name: `Add word ${task.distractor}`, exact: true }).click();
        await page.getByRole('button', { name: 'Remove word 1', exact: true }).click();
        await expect(page.getByRole('button', { name: `Add word ${task.distractor}`, exact: true })).toBeEnabled();
      }
      for (const word of task.words) await page.getByRole('button', { name: `Add word ${word}`, exact: true }).click();
      await page.getByRole('button', { name: 'Check sentence' }).click();
      await expect(page.getByRole('img', { name: `Illustration: ${sentence}`, exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Check sentence' })).toBeDisabled();
      await stars(page, ++solved);
      await next(page);
      await expect(page.getByRole('button', { name: 'Undo word', exact: true })).toBeDisabled();
    }
  }
});

test('rainbow mixer uses explicit equal-scoop paint rules and guided recipes with undo and retries', async ({ page }) => {
  await open(page, 'Rainbow Mixer');
  await expect(page.getByText(/Real pigments and amounts can mix differently/)).toBeVisible();
  const mixtures = [
    ['Red', 'Red', 'Red'], ['Yellow', 'Yellow', 'Yellow'], ['Blue', 'Blue', 'Blue'],
    ['Red', 'Yellow', 'Orange'], ['Yellow', 'Red', 'Orange'],
    ['Yellow', 'Blue', 'Green'], ['Blue', 'Yellow', 'Green'],
    ['Red', 'Blue', 'Purple'], ['Blue', 'Red', 'Purple'],
  ];
  let solved = 0;
  for (const [a, b, color] of mixtures) {
    await expect(page.getByRole('button', { name: 'Mix paints' })).toBeDisabled();
    await page.getByRole('button', { name: `Add ${a} paint` }).click();
    await page.getByRole('button', { name: 'Undo scoop' }).click();
    await page.getByRole('button', { name: `Add ${a} paint` }).click();
    await page.getByRole('button', { name: `Add ${b} paint` }).click();
    await page.getByRole('button', { name: 'Mix paints' }).click();
    await expect(page.getByRole('img', { name: `Mixed paint: ${color}` })).toBeVisible();
    await stars(page, ++solved);
    await expect(page.getByRole('button', { name: 'Mix paints' })).toBeDisabled();
    await next(page);
  }
  await mode(page, 'Rainbow Mixer', 'growing');
  await page.getByRole('button', { name: 'Add Blue paint' }).click();
  await page.getByRole('button', { name: 'Add Blue paint' }).click();
  await page.getByRole('button', { name: 'Mix paints' }).click();
  await expect(page.locator('.answer-feedback')).toContainText('That mixture makes Blue');
  await stars(page, solved);
  await page.getByRole('button', { name: 'Undo scoop' }).click();
  await page.getByRole('button', { name: 'Undo scoop' }).click();
  for (const [a, b, color] of [['Yellow', 'Red', 'Orange'], ['Blue', 'Yellow', 'Green'], ['Blue', 'Red', 'Purple']]) {
    await page.getByRole('button', { name: `Add ${a} paint` }).click();
    await page.getByRole('button', { name: `Add ${b} paint` }).click();
    await page.getByRole('button', { name: 'Mix paints' }).click();
    await expect(page.getByRole('img', { name: `Mixed paint: ${color}` })).toBeVisible();
    await stars(page, ++solved);
    await next(page);
  }
});

test('pattern painter validates AB ABC AAB and ABB patterns with labeled shapes', async ({ page }) => {
  await open(page, 'Pattern Painter');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Pattern Painter', difficulty);
    for (const unit of patternRounds[difficulty]) {
      const task = patternTask(unit);
      await expect(page.locator('.pattern-strip .pattern-piece')).toHaveCount(task.shown.length + 1);
      await page.getByRole('button', { name: `Choose ${patternPieces[(task.answer + 1) % 3].label}`, exact: true }).click();
      await stars(page, solved);
      await page.getByRole('button', { name: `Choose ${patternPieces[task.answer].label}`, exact: true }).click();
      await expect(page.locator('.missing-piece')).toContainText(patternPieces[task.answer].label);
      await stars(page, ++solved);
      await next(page);
    }
  }
});

test('number train orders small sequences with undo and locates beginning middle and end gaps to 10', async ({ page }) => {
  await open(page, 'Number Train');
  let solved = 0;
  for (const task of trainRounds.gentle) {
    await expect(page.getByRole('button', { name: 'Check train' })).toBeDisabled();
    for (const value of [...task.sequence].reverse()) await page.getByRole('button', { name: `Add carriage ${value}`, exact: true }).click();
    await page.getByRole('button', { name: 'Check train' }).click();
    await expect(page.locator('.answer-feedback')).toContainText('try counting in order');
    await stars(page, solved);
    for (let i = 0; i < task.sequence.length; i++) await page.getByRole('button', { name: 'Undo carriage' }).click();
    for (const value of task.sequence) await page.getByRole('button', { name: `Add carriage ${value}`, exact: true }).click();
    await page.getByRole('button', { name: 'Check train' }).click();
    await stars(page, ++solved);
    await next(page);
  }
  await mode(page, 'Number Train', 'growing');
  for (const task of trainRounds.growing) {
    await expect(page.locator('.train-carriage').nth(task.missing)).toHaveText('?');
    await page.getByRole('button', { name: `Choose ${task.sequence[task.missing]}`, exact: true }).click();
    await stars(page, ++solved);
    await next(page);
  }
});

test('pond requires exact duck manipulation, returns ducks, and supports zero in both modes', async ({ page }) => {
  await open(page, 'Take-Away Pond');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Take-Away Pond', difficulty);
    for (const task of pondRounds[difficulty]) {
      const remaining = task.start - task.away;
      const answer = page.getByRole('button', { name: `Choose ${remaining}`, exact: true });
      await expect(answer).toBeDisabled();
      for (let i = 0; i < task.away; i++) await page.getByRole('button', { name: `Move duck ${i + 1} to shore`, exact: true }).click();
      await page.getByRole('button', { name: 'Return duck 1 to pond', exact: true }).click();
      await expect(answer).toBeDisabled();
      await page.getByRole('button', { name: 'Move duck 1 to shore', exact: true }).click();
      if (remaining > 0) {
        await page.getByRole('button', { name: `Move duck ${task.away + 1} to shore`, exact: true }).click();
        await expect(answer).toBeDisabled();
        await page.getByRole('button', { name: `Return duck ${task.away + 1} to pond`, exact: true }).click();
      }
      await expect(page.getByRole('button', { name: /^Move duck/ })).toHaveCount(remaining);
      await answer.click();
      await stars(page, ++solved);
      await expect(answer).toBeDisabled();
      await next(page);
      await expect(page.getByRole('button', { name: /^Return duck/ })).toHaveCount(0);
    }
  }
});

test('toy shop matches every whole-dollar price with reversible exact payment', async ({ page }) => {
  await open(page, 'Little Toy Shop');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Little Toy Shop', difficulty);
    for (const task of toyRounds[difficulty]) {
      await expect(page.getByRole('button', { name: 'Pay exact price' })).toBeDisabled();
      await page.getByRole('button', { name: 'Add $1 token', exact: true }).click();
      await page.getByRole('button', { name: 'Remove payment dollar 1', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Pay exact price' })).toBeDisabled();
      if (task.price > 1) {
        await page.getByRole('button', { name: 'Add $1 token', exact: true }).click();
        await page.getByRole('button', { name: 'Pay exact price' }).click();
        await expect(page.locator('.answer-feedback')).toContainText('Add more');
        await stars(page, solved);
        await page.getByRole('button', { name: 'Undo dollar' }).click();
      }
      for (let i = 0; i < task.price; i++) await page.getByRole('button', { name: 'Add $1 token', exact: true }).click();
      const max = difficulty === 'gentle' ? 5 : 10;
      if (task.price < max) {
        await page.getByRole('button', { name: 'Add $1 token', exact: true }).click();
        await page.getByRole('button', { name: 'Pay exact price' }).click();
        await expect(page.locator('.answer-feedback')).toContainText('Return extra');
        await page.getByRole('button', { name: 'Undo dollar' }).click();
      }
      await page.getByRole('button', { name: 'Pay exact price' }).click();
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Pay exact price' })).toBeDisabled();
      await next(page);
      await expect(page.getByRole('button', { name: /^Remove payment dollar/ })).toHaveCount(0);
    }
  }
});

test('can I buy it compares less equal more and empty wallets without judgment', async ({ page }) => {
  await open(page, 'Can I Buy It?');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Can I Buy It?', difficulty);
    for (const task of buyRounds[difficulty]) {
      const enough = task.wallet >= task.price;
      await page.getByRole('button', { name: enough ? 'Not enough' : 'Enough', exact: true }).click();
      await stars(page, solved);
      await page.getByRole('button', { name: enough ? 'Enough' : 'Not enough', exact: true }).click();
      if (task.wallet === task.price) await expect(page.locator('.answer-feedback')).toContainText('exactly enough');
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Enough', exact: true })).toBeDisabled();
      await next(page);
    }
  }
});

test('float lab requires prediction test and observation, welcomes changed predictions, and tests every specified form', async ({ page }) => {
  await open(page, 'Float or Sink Lab');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Float or Sink Lab', difficulty);
    const rounds = difficulty === 'gentle' ? floatRounds.slice(0, 3) : floatRounds;
    for (const task of rounds) {
      await expect(page.getByRole('button', { name: 'Test in water' })).toBeDisabled();
      await expect(page.getByRole('button', { name: 'Record observation' })).toHaveCount(0);
      await expect(page.locator('.material-clue')).toHaveCount(difficulty === 'gentle' ? 1 : 0);
      const opposite = task.outcome === 'Float' ? 'sink' : 'float';
      await page.getByRole('button', { name: `Predict ${task.outcome.toLowerCase()}`, exact: true }).click();
      await page.getByRole('button', { name: `Predict ${opposite}`, exact: true }).click();
      await page.getByRole('button', { name: 'Test in water' }).click();
      await stars(page, solved);
      await expect(page.getByRole('img', { name: `${task.name}: ${task.outcome === 'Float' ? 'floating at the surface' : 'sunk to the bottom'}`, exact: true })).toBeVisible();
      await expect(page.locator('.science-observation')).toContainText(task.observation);
      await expect(page.locator('.science-observation')).toContainText('That is a discovery, too!');
      await expect(page.getByRole('button', { name: 'Test in water' })).toBeDisabled();
      await page.getByRole('button', { name: 'Record observation' }).click();
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Record observation' })).toBeDisabled();
      await next(page);
      await expect(page.getByRole('button', { name: 'Test in water' })).toBeDisabled();
    }
  }
});

test('garden observes missing care and three growth steps, prevents excess water, and resets across modes and rounds', async ({ page }) => {
  await open(page, 'Grow a Little Garden');
  let solved = 0;
  for (const difficulty of ['gentle', 'growing'] as const) {
    await mode(page, 'Grow a Little Garden', difficulty);
    for (let round = 0; round < gardenRounds.length; round++) {
      await expect(page.getByRole('img', { name: 'Growth stage: Seed', exact: true })).toBeVisible();
      await expect(page.locator('.material-clue')).toHaveCount(difficulty === 'gentle' ? 1 : 0);
      await expect(page.getByRole('button', { name: 'Observe a pretend time step' })).toBeDisabled();
      await page.getByRole('button', { name: 'Predict growth', exact: true }).click();
      await page.getByRole('button', { name: 'Observe a pretend time step' }).click();
      await expect(page.locator('.science-observation')).toContainText('No new growth');
      await stars(page, solved);
      for (const stage of ['Sprout', 'Leafy plant', 'Flowering plant']) {
        const water = page.getByRole('button', { name: 'Add a little water', exact: true });
        const light = page.getByRole('button', { name: 'Give light', exact: true });
        if (await water.isEnabled()) await water.click();
        await expect(water).toBeDisabled();
        if (await light.isEnabled()) await light.click();
        await expect(page.getByRole('button', { name: 'Observe a pretend time step' })).toBeDisabled();
        await page.getByRole('button', { name: 'Predict growth', exact: true }).click();
        await page.getByRole('button', { name: 'Observe a pretend time step' }).click();
        await expect(page.getByRole('img', { name: `Growth stage: ${stage}`, exact: true })).toBeVisible();
        await expect(page.locator('.science-observation')).toContainText('days or weeks');
        if (stage !== 'Flowering plant') await stars(page, solved);
      }
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Observe a pretend time step' })).toBeDisabled();
      await next(page);
    }
  }
});

test('new touch controls and keyboard controls perform real reversible and scientific actions', async ({ page, isMobile }) => {
  await open(page, 'Number Train');
  const carriage = page.getByRole('button', { name: 'Add carriage 1', exact: true });
  await carriage.focus();
  await page.keyboard.press('Space');
  await page.getByRole('button', { name: 'Undo carriage' }).focus();
  await page.keyboard.press('Enter');
  await expect(carriage).toBeEnabled();
  for (const n of [1, 2, 3]) {
    await page.getByRole('button', { name: `Add carriage ${n}`, exact: true }).focus();
    await page.keyboard.press('Enter');
  }
  await page.getByRole('button', { name: 'Check train' }).focus();
  await page.keyboard.press('Space');
  await stars(page, 1);
  if (isMobile) {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.getByRole('button', { name: 'All activities', exact: true }).tap();
    await page.getByRole('button', { name: 'Play Rainbow Mixer' }).tap();
    await page.getByRole('button', { name: 'Add Red paint' }).tap();
    await page.getByRole('button', { name: 'Add Blue paint' }).tap();
    await page.getByRole('button', { name: 'Mix paints' }).tap();
    await expect(page.getByRole('img', { name: 'Mixed paint: Purple' })).toBeVisible();
    await page.getByRole('button', { name: 'All activities', exact: true }).tap();
    await page.getByRole('button', { name: 'Play Float or Sink Lab' }).tap();
    await page.getByRole('button', { name: 'Predict sink', exact: true }).tap();
    await page.getByRole('button', { name: 'Test in water' }).tap();
    await expect(page.locator('.science-observation')).toContainText('dry cork floats');
    await page.getByRole('button', { name: 'Record observation' }).tap();
    await stars(page, 3);
    await noOverflow(page);
    async function touchOpen(title: string) {
      await page.getByRole('button', { name: 'All activities', exact: true }).tap();
      await page.getByRole('button', { name: `Play ${title}`, exact: true }).tap();
    }
    await touchOpen('Alphabet Garden');
    await page.getByRole('button', { name: 'Choose A', exact: true }).tap();
    await stars(page, 4);
    await noOverflow(page);
    await touchOpen('Silly Sentence Kitchen');
    for (const word of sentenceRounds[0].words) await page.getByRole('button', { name: `Add word ${word}`, exact: true }).tap();
    await page.getByRole('button', { name: 'Check sentence' }).tap();
    await stars(page, 5);
    await noOverflow(page);
    await touchOpen('Pattern Painter');
    await page.getByRole('button', { name: 'Choose Blue square', exact: true }).tap();
    await stars(page, 6);
    await noOverflow(page);
    await touchOpen('Take-Away Pond');
    await page.getByRole('button', { name: 'Move duck 1 to shore', exact: true }).tap();
    await page.getByRole('button', { name: 'Return duck 1 to pond', exact: true }).tap();
    await expect(page.getByRole('button', { name: 'Choose 3', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Move duck 1 to shore', exact: true }).tap();
    await page.getByRole('button', { name: 'Choose 3', exact: true }).tap();
    await stars(page, 7);
    await noOverflow(page);
    await touchOpen('Little Toy Shop');
    await page.getByRole('button', { name: 'Add $1 token', exact: true }).tap();
    await page.getByRole('button', { name: 'Undo dollar', exact: true }).tap();
    for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Add $1 token', exact: true }).tap();
    await page.getByRole('button', { name: 'Pay exact price' }).tap();
    await stars(page, 8);
    await noOverflow(page);
    await touchOpen('Can I Buy It?');
    await page.getByRole('button', { name: 'Not enough', exact: true }).tap();
    await stars(page, 9);
    await noOverflow(page);
    await touchOpen('Grow a Little Garden');
    await page.getByRole('button', { name: 'Predict growth', exact: true }).tap();
    await page.getByRole('button', { name: 'Observe a pretend time step' }).tap();
    await expect(page.locator('.science-observation')).toContainText('No new growth');
    for (let step = 0; step < 3; step++) {
      for (const name of ['Add a little water', 'Give light']) {
        const action = page.getByRole('button', { name, exact: true });
        if (await action.isEnabled()) await action.tap();
      }
      await page.getByRole('button', { name: 'Predict growth', exact: true }).tap();
      await page.getByRole('button', { name: 'Observe a pretend time step' }).tap();
    }
    await stars(page, 10);
    await noOverflow(page);
    await touchOpen('Number Train');
    for (const n of [1, 2, 3]) await page.getByRole('button', { name: `Add carriage ${n}`, exact: true }).tap();
    await page.getByRole('button', { name: 'Check train' }).tap();
    await stars(page, 11);
    await noOverflow(page);
  } else {
    await page.getByRole('button', { name: 'All activities', exact: true }).click();
    await page.getByRole('button', { name: 'Play Float or Sink Lab' }).click();
    for (const name of ['Predict sink', 'Test in water', 'Record observation']) {
      await page.getByRole('button', { name, exact: true }).focus();
      await page.keyboard.press('Enter');
    }
    await stars(page, 2);
  }
});

test('new completed layouts fit 320px and reduced motion removes tub animation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page, 'Float or Sink Lab');
  await page.getByRole('button', { name: 'Predict sink', exact: true }).click();
  await page.getByRole('button', { name: 'Test in water' }).click();
  await expect(page.locator('.lab-tub > svg')).toHaveCSS('transition-duration', '0s');
  await page.getByRole('button', { name: 'Record observation' }).click();
  await noOverflow(page);
  await page.getByRole('button', { name: 'All activities', exact: true }).click();
  await page.getByRole('button', { name: 'Play Silly Sentence Kitchen' }).click();
  for (const word of sentenceRounds[0].words) await page.getByRole('button', { name: `Add word ${word}`, exact: true }).click();
  await page.getByRole('button', { name: 'Check sentence' }).click();
  await noOverflow(page);
  await page.getByRole('button', { name: 'All activities', exact: true }).click();
  await page.getByRole('button', { name: 'Play Little Toy Shop' }).click();
  await mode(page, 'Little Toy Shop', 'growing');
  for (let i = 0; i < 7; i++) await page.getByRole('button', { name: 'Add $1 token', exact: true }).click();
  await page.getByRole('button', { name: 'Pay exact price' }).click();
  await noOverflow(page);
});

test('expansion datasets independently match the intended concepts and boundaries', () => {
  expect(games.filter(game => game.subject === 'reading')).toHaveLength(5);
  expect(games.filter(game => game.subject === 'coloring')).toHaveLength(3);
  expect(games.filter(game => game.subject === 'math')).toHaveLength(4);
  expect(games.filter(game => game.subject === 'science')).toHaveLength(2);
  expect(games.filter(game => game.subject === 'money')).toHaveLength(3);
  expect(games.filter(game => game.stages.includes('explorers'))).toHaveLength(9);
  expect(games.filter(game => game.stages.includes('kindergarten'))).toHaveLength(17);
  expect(games.filter(game => game.stages.includes('thinkers'))).toHaveLength(16);
  expect(alphabetRounds.map(task => task.letter).join('')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  for (const task of alphabetRounds) {
    expect(new Set(task.choices).size).toBe(3);
    expect(task.choices.filter(value => value === task.letter)).toHaveLength(1);
  }
  expect(sentenceRounds.map(task => task.words.join(' '))).toEqual(['The cat smiles.', 'The duck swims.', 'The sun shines.', 'The hen stands.']);
  expect(mixPaints('Red', 'Yellow')).toBe('Orange');
  expect(mixPaints('Yellow', 'Blue')).toBe('Green');
  expect(mixPaints('Red', 'Blue')).toBe('Purple');
  expect(mixingRecipes).toEqual(['Orange', 'Green', 'Purple']);
  expect(patternRounds.growing.map(unit => patternTask(unit).answer)).toEqual([1, 0, 1]);
  expect(floatRounds.map(task => [task.id, task.outcome])).toEqual([
    ['cork', 'Float'], ['spoon', 'Sink'], ['stone', 'Sink'], ['ball', 'Float'], ['foil-ball', 'Sink'], ['foil-boat', 'Float'],
  ]);
  for (const difficulty of ['gentle', 'growing'] as const) {
    const max = difficulty === 'gentle' ? 5 : 10;
    for (const task of pondRounds[difficulty]) {
      expect(task.start).toBeLessThanOrEqual(max);
      expect(task.away).toBeGreaterThan(0);
      expect(task.away).toBeLessThanOrEqual(task.start);
    }
    expect(pondRounds[difficulty].some(task => task.start === task.away)).toBe(true);
    expect([...toyRounds[difficulty].map(task => task.price)].sort((a, b) => a - b)).toEqual(Array.from({ length: max }, (_, i) => i + 1));
    expect(buyRounds[difficulty].some(task => task.wallet === 0)).toBe(true);
    for (const comparison of [-1, 0, 1]) expect(buyRounds[difficulty].some(task => Math.sign(task.wallet - task.price) === comparison)).toBe(true);
    for (const task of trainRounds[difficulty]) {
      expect(task.sequence.every((n, i, sequence) => i === 0 || n === sequence[i - 1] + 1)).toBe(true);
      expect(task.sequence.every(n => n >= 1 && n <= max)).toBe(true);
    }
  }
});
