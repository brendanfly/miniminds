import { expect, test, type Page } from '@playwright/test';
import { additionRounds, colorRecipes, countChoices, countRounds, filterGames, games, letterRounds, moneyRounds, numberChoices, sightWordRounds, stages, startingDifficulty, wordRounds, wordTiles, type Category, type Difficulty } from '../src/games';

async function expectNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test('all subject and stage filters intersect without showing unfinished games', async ({ page }) => {
  await page.goto('/');
  const subjects: { id: Category; label: string }[] = [
    { id: 'all', label: 'All activities' }, { id: 'coloring', label: 'Coloring' }, { id: 'reading', label: 'Reading' },
    { id: 'math', label: 'Math' }, { id: 'science', label: 'Science' }, { id: 'money', label: 'Money' },
  ];
  for (const subject of subjects) {
    await page.getByRole('group', { name: 'Filter by subject' }).getByRole('button', { name: subject.label, exact: true }).click();
    for (const stage of stages) {
      const button = page.getByRole('group', { name: 'Filter by learning stage' }).getByRole('button', { name: new RegExp(`^${stage.label}`) });
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      const expected = filterGames(subject.id, stage.id);
      await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(expected.length);
      for (const game of expected) await expect(page.getByRole('button', { name: `Play ${game.title}`, exact: true })).toBeVisible();
      await expect(page.getByRole('status')).toContainText(`${expected.length} ${expected.length === 1 ? 'adventure' : 'adventures'}`);
      await expectNoOverflow(page);
    }
  }
  await page.getByRole('button', { name: 'Science', exact: true }).click();
  await expect(page.getByText("Science games are on our idea list, but aren't playable yet.")).toBeVisible();
  await page.getByRole('button', { name: 'Show every adventure' }).click();
  await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(7);
  await expect(page.getByRole('button', { name: 'All stages', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('stage selects a starting mode and filters survive a game visit', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Math', exact: true }).click();
  await page.getByRole('button', { name: /^Little Explorers/ }).click();
  await page.getByRole('button', { name: 'Play Counting Meadow' }).click();
  await expect(page.getByRole('button', { name: 'Count to 5', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const counts = countRounds.filter(count => count <= 5);
  for (const count of counts) {
    await expect(page.getByRole('button', { name: /^Count flower / })).toHaveCount(count);
    await page.getByRole('button', { name: `Choose ${count}`, exact: true }).click();
    await page.getByRole('button', { name: 'Play another' }).click();
  }
  await expect(page.getByRole('button', { name: /^Count flower / })).toHaveCount(3);
  await page.getByRole('button', { name: 'All activities', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Math', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: /^Little Explorers/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /^Growing Thinkers/ }).click();
  await page.getByRole('button', { name: 'Play Snack-Time Addition' }).click();
  await expect(page.getByRole('button', { name: 'Totals to 10', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('letter challenge matches uppercase to lowercase and switching resets only the activity', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Kindergarten Crew/ }).click();
  await page.getByRole('button', { name: 'Play Letter Friends' }).click();
  await expect(page.getByRole('button', { name: 'Big & little', exact: true })).toHaveAttribute('aria-pressed', 'true');
  for (const task of letterRounds) {
    await expect(page.getByRole('button', { name: `Choose ${task.letter}`, exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: `Choose ${task.letter.toLowerCase()}`, exact: true }).click();
    await page.getByRole('button', { name: 'Play another' }).click();
  }
  await page.getByRole('button', { name: 'Big letters', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Choose A', exact: true })).toBeEnabled();
  await expect(page.getByText('6 happy stars', { exact: true })).toBeVisible();
});

test('color recipe checks actual region colors in both pictures', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Coloring Garden' }).click();
  await page.getByRole('button', { name: 'Color challenge', exact: true }).click();
  for (const picture of ['flower', 'house'] as const) {
    if (picture === 'house') await page.getByRole('button', { name: 'Little house', exact: true }).click();
    for (const item of colorRecipes[picture]) {
      await page.getByRole('button', { name: item.color, exact: true }).click();
      const region = page.getByRole('button', { name: `Color ${item.region}`, exact: true });
      if (item.region === 'house wall') {
        const box = await region.boundingBox();
        if (!box) throw new Error('House wall is not visible');
        await region.click({ position: { x: box.width / 2, y: box.height / 10 } });
      } else {
        await region.click();
      }
    }
    await expect(page.getByRole('button', { name: 'All done' })).toBeEnabled();
    const first = colorRecipes[picture][0];
    await page.getByRole('button', { name: 'Blue', exact: true }).click();
    await page.getByRole('button', { name: `Color ${first.region}`, exact: true }).click();
    await expect(page.getByRole('button', { name: 'All done' })).toBeDisabled();
    await page.getByRole('button', { name: 'Undo', exact: true }).click();
    await page.getByRole('button', { name: 'All done' }).click();
    await expect(page.getByText('A little masterpiece!', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Make another' }).click();
  }
  await expect(page.getByText('2 happy stars', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Free coloring', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Color petal 1', exact: true })).toHaveAttribute('fill', '#fffdf8');
  await expectNoOverflow(page);
});

test('word builder supports undo, retries, every word, and the picture challenge', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Word Builder Workshop' }).click();
  await expect(page.getByRole('button', { name: 'Check word' })).toBeDisabled();
  for (const char of ['t', 'a', 'c']) await page.getByRole('button', { name: `Add ${char}`, exact: true }).click();
  await page.getByRole('button', { name: 'Check word' }).click();
  await expect(page.getByRole('status')).toContainText('Good try');
  for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Undo letter' }).click();
  let stars = 0;
  for (const mode of ['gentle', 'growing'] as const) {
    if (mode === 'growing') await page.getByRole('button', { name: 'Picture challenge', exact: true }).click();
    for (const task of wordRounds[mode]) {
      await expect(page.getByLabel(`Word guide: ${task.word}`, { exact: true })).toHaveCount(mode === 'gentle' ? 1 : 0);
      await expect(page.getByRole('img', { name: `Picture of a ${task.word}`, exact: true })).toBeVisible();
      for (const char of task.word) {
        const tile = page.getByRole('button', { name: `Add ${char}`, exact: true });
        await tile.click();
        await expect(tile).toBeDisabled();
      }
      await page.getByRole('button', { name: 'Check word' }).click();
      stars++;
      await expect(page.getByRole('status')).toContainText(`${task.word}. You built a word!`);
      await expect(page.getByRole('button', { name: 'Check word' })).toBeDisabled();
      await expect(page.getByText(`${stars} happy ${stars === 1 ? 'star' : 'stars'}`, { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Play another' }).click();
      await expectNoOverflow(page);
    }
  }
});

test('sight words support matching and completing all six sentences', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Sight Word Picnic' }).click();
  await page.getByRole('button', { name: 'Choose the', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Good try');
  for (const mode of ['gentle', 'growing'] as const) {
    if (mode === 'growing') await page.getByRole('button', { name: 'Sentence picnic', exact: true }).click();
    for (const task of sightWordRounds) {
      await page.getByRole('button', { name: `Choose ${task.word}`, exact: true }).click();
      await expect(page.getByRole('status')).toContainText(mode === 'gentle' ? `You found "${task.word}"!` : [task.before, task.word, task.after].join(' '));
      await expect(page.getByRole('button', { name: `Choose ${task.word}`, exact: true })).toBeDisabled();
      await page.getByRole('button', { name: 'Play another' }).click();
      await expectNoOverflow(page);
    }
  }
  await expect(page.getByText('12 happy stars', { exact: true })).toBeVisible();
});

test('addition requires combining groups and supports every total through 10', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Snack-Time Addition' }).click();
  for (const mode of ['gentle', 'growing'] as const) {
    if (mode === 'growing') await page.getByRole('button', { name: 'Totals to 10', exact: true }).click();
    for (const task of additionRounds[mode]) {
      const total = task.left + task.right;
      await expect(page.getByRole('button', { name: `Choose ${total}`, exact: true })).toBeDisabled();
      await page.getByRole('button', { name: 'Put the apples together' }).click();
      await expect(page.getByRole('button', { name: /^Count apple / })).toHaveCount(total);
      await page.getByRole('button', { name: 'Count apple 1', exact: true }).click();
      await page.getByRole('button', { name: 'Count apple 1', exact: true }).click();
      await expect(page.locator('.count-badge')).toHaveCount(1);
      await page.getByRole('button', { name: `Choose ${total - 1}`, exact: true }).click();
      await expect(page.getByRole('status')).toContainText('Good try');
      await page.getByRole('button', { name: `Choose ${total}`, exact: true }).click();
      await expect(page.getByRole('status')).toContainText(`${task.left} and ${task.right} make ${total}`);
      await page.getByRole('button', { name: 'Play another' }).click();
      await expect(page.locator('.count-badge')).toHaveCount(0);
      await expectNoOverflow(page);
    }
  }
  await expect(page.getByText('9 happy stars', { exact: true })).toBeVisible();
});

test('money models giving and returning actual tokens, including zero remaining', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Keep, Give, Count' }).click();
  await expect(page.getByText('Pretend dollars only. No real money.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Choose 3 dollars', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Give dollar 1 to friend', exact: true }).click();
  await page.getByRole('button', { name: 'Give dollar 2 to friend', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Choose 3 dollars', exact: true })).toBeDisabled();
  await expect(page.getByText('Move 1 dollar back to your wallet.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Return dollar 2 to wallet', exact: true }).click();
  await page.getByRole('button', { name: 'Choose 2 dollars', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Good try');
  await page.getByRole('button', { name: 'Return dollar 1 to wallet', exact: true }).click();
  for (const mode of ['gentle', 'growing'] as const) {
    if (mode === 'growing') await page.getByRole('button', { name: 'Dollars to 10', exact: true }).click();
    for (const task of moneyRounds[mode]) {
      for (let i = 0; i < task.give; i++) await page.getByRole('button', { name: `Give dollar ${i + 1} to friend`, exact: true }).click();
      await expect(page.getByRole('button', { name: /^Give dollar / })).toHaveCount(task.start - task.give);
      await expect(page.getByRole('button', { name: /^Return dollar / })).toHaveCount(task.give);
      await page.getByRole('button', { name: `Choose ${task.start - task.give} dollars`, exact: true }).click();
      await expect(page.getByRole('status')).toContainText(`You started with ${task.start} dollars and gave ${task.give}`);
      await expect(page.getByRole('button', { name: `Choose ${task.start - task.give} dollars`, exact: true })).toBeDisabled();
      await page.getByRole('button', { name: 'Play another' }).click();
      await expectNoOverflow(page);
    }
  }
  await expect(page.getByText('9 happy stars', { exact: true })).toBeVisible();
});

test('new controls support keyboard play and focus the next prompt', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Word Builder Workshop' }).click();
  for (const char of 'cat') {
    await page.getByRole('button', { name: `Add ${char}`, exact: true }).focus();
    await page.keyboard.press('Space');
  }
  await page.getByRole('button', { name: 'Check word' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Play another' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.game-instruction')).toBeFocused();
  await page.getByRole('button', { name: 'All activities', exact: true }).click();
  await page.getByRole('button', { name: 'Play Keep, Give, Count' }).click();
  await page.getByRole('button', { name: 'Give dollar 1 to friend', exact: true }).focus();
  await page.keyboard.press('Space');
  await page.getByRole('button', { name: 'Choose 3 dollars', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('You have 3 dollars left.');
});

test('spoken helpers are optional and unavailable speech does not block games', async ({ page }) => {
  await page.addInitScript(() => { Reflect.deleteProperty(window, 'speechSynthesis'); });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Turn sound on' })).toBeDisabled();
  await page.getByRole('button', { name: 'Play Sight Word Picnic' }).click();
  await expect(page.getByRole('button', { name: 'Hear the word' })).toBeDisabled();
  await page.getByRole('button', { name: 'Choose see', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('You found "see"!');
});

test('stage filters, word tiles, and money tokens respond to touch', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Touch input is covered by tablet and phone projects.');
  await page.goto('/');
  await page.getByRole('button', { name: /^Kindergarten Crew/ }).tap();
  await page.getByRole('button', { name: 'Play Word Builder Workshop' }).tap();
  for (const char of 'cat') await page.getByRole('button', { name: `Add ${char}`, exact: true }).tap();
  await page.getByRole('button', { name: 'Check word' }).tap();
  await expect(page.getByRole('status')).toContainText('You built a word!');
  await page.getByRole('button', { name: 'All activities', exact: true }).tap();
  await page.getByRole('button', { name: 'Money', exact: true }).tap();
  await page.getByRole('button', { name: 'Play Keep, Give, Count' }).tap();
  await page.getByRole('button', { name: 'Give dollar 1 to friend', exact: true }).tap();
  await page.getByRole('button', { name: 'Choose 3 dollars', exact: true }).tap();
  await expect(page.getByRole('status')).toContainText('You have 3 dollars left.');
});

test('every game and difficulty fits a narrow screen without runtime errors or external requests', async ({ page }) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    const url = new URL(request.url());
    if (url.protocol.startsWith('http') && !['localhost', '127.0.0.1'].includes(url.hostname)) externalRequests.push(request.url());
  });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');
  for (const game of games) {
    await page.getByRole('button', { name: `Play ${game.title}`, exact: true }).click();
    await expect(page.getByRole('heading', { name: game.title, exact: true })).toBeVisible();
    for (const mode of ['gentle', 'growing'] as const) {
      await page.getByRole('button', { name: game.modes[mode].label, exact: true }).click();
      await expectNoOverflow(page);
    }
    await page.getByRole('button', { name: 'All activities', exact: true }).click();
  }
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test('catalog and round data enforce stage, range, and answer contracts', () => {
  expect(new Set(games.map(game => game.id)).size).toBe(7);
  expect(filterGames('science', 'all')).toHaveLength(0);
  for (const game of games) {
    expect(game.stages.length).toBeGreaterThan(0);
    for (const mode of ['gentle', 'growing'] as const) expect(game.modes[mode].label.length).toBeGreaterThan(0);
    expect(startingDifficulty(game, 'explorers')).toBe('gentle');
    expect(startingDifficulty(game, 'thinkers')).toBe('growing');
  }
  for (const mode of ['gentle', 'growing'] as const satisfies Difficulty[]) {
    const max = mode === 'gentle' ? 5 : 10;
    for (const count of countRounds.filter(value => value <= max)) {
      expect(countChoices(count, max).filter(value => value === count)).toHaveLength(1);
      expect(countChoices(count, max).every(value => value >= 1 && value <= max)).toBe(true);
    }
    for (const task of wordRounds[mode]) {
      const tiles = wordTiles(task.word, mode);
      const available = [...tiles];
      for (const char of task.word) {
        const index = available.indexOf(char);
        expect(index).toBeGreaterThanOrEqual(0);
        available.splice(index, 1);
      }
    }
    for (const task of additionRounds[mode]) {
      expect(task.left + task.right).toBeLessThanOrEqual(max);
      const choices = numberChoices(task.left + task.right, 0, max);
      expect(choices.filter(value => value === task.left + task.right)).toHaveLength(1);
      expect(choices.every(value => value >= 0 && value <= max)).toBe(true);
    }
    for (const task of moneyRounds[mode]) {
      expect(task.start).toBeLessThanOrEqual(max);
      expect(task.give).toBeGreaterThan(0);
      expect(task.give).toBeLessThanOrEqual(task.start);
      const choices = numberChoices(task.start - task.give, 0, max);
      expect(choices.filter(value => value === task.start - task.give)).toHaveLength(1);
      expect(choices.every(value => value >= 0 && value <= max)).toBe(true);
    }
  }
  for (const task of sightWordRounds) {
    expect(task.choices.filter(value => value === task.word)).toHaveLength(1);
    expect(new Set(task.choices).size).toBe(task.choices.length);
  }
});
