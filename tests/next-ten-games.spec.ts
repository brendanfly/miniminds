import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { games, numberChoices, type Difficulty, type NextGameId } from '../src/games';
import { animalRounds, comparison, comparisonRounds, cycleRounds, gridPlaces, huntRounds, jarRounds, matchRounds, rhymeRounds, savingsRounds, stampRecipes, storyRounds } from '../src/NextData';

const newIds: NextGameId[] = ['rhyme-time', 'story-detective', 'color-hunt', 'shape-studio', 'number-match', 'more-less-same', 'animal-home', 'life-cycle', 'token-jar', 'save-special'];
const modes: Difficulty[] = ['gentle', 'growing'];
async function open(page: Page, id: NextGameId) {
  const game = games.find(g => g.id === id);
  if (!game) throw new Error(`Missing game ${id}`);
  await page.goto('/');
  await page.getByRole('button', { name: `Play ${game.title}`, exact: true }).click();
  return game;
}
async function stars(page: Page, value: number) {
  await expect(page.locator('.session-stars')).toHaveText(`${value} happy ${value === 1 ? 'star' : 'stars'}`);
}
async function next(page: Page) {
  await page.getByRole('button', { name: 'Play another', exact: true }).click();
  await expect(page.locator('.game-instruction')).toBeFocused();
}
async function press(page: Page, label: string) {
  await page.getByRole('button', { name: label, exact: true }).click();
}
async function overflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('rhyme pairs have pictures, whole-word guides, distractors, retries and both modes', async ({ page }) => {
  const game = await open(page, 'rhyme-time');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of rhymeRounds) {
      await expect(page.locator('.picture-choices button')).toHaveCount(difficulty === 'gentle' ? 2 : 3);
      await expect(page.locator('.picture-choices svg')).toHaveCount(difficulty === 'gentle' ? 2 : 3);
      await expect(page.locator('.guide-note')).toHaveCount(difficulty === 'gentle' ? 1 : 0);
      await press(page, `Choose ${task.other[0]}`);
      await stars(page, solved);
      await expect(page.locator('.answer-feedback')).toContainText('Listen to the endings');
      await press(page, `Choose ${task.match}`);
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: `Choose ${task.match}`, exact: true })).toBeDisabled();
      await next(page);
    }
  }
});

test('story questions are supported by all three original stories in both modes', async ({ page }) => {
  const game = await open(page, 'story-detective');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const story of storyRounds) for (const task of story.questions) {
      await expect(page.locator('.story-card')).toContainText(difficulty === 'gentle' ? story.short : story.long);
      await expect(page.locator('.answer-options button')).toHaveCount(difficulty === 'gentle' ? 2 : 3);
      const wrong = task.choices.filter(v => v !== task.answer)[0];
      await press(page, `Choose ${wrong}`);
      await stars(page, solved);
      await expect(page.locator('.answer-feedback')).toContainText('Read or listen again');
      await press(page, `Choose ${task.answer}`);
      await stars(page, ++solved);
      await next(page);
    }
  }
});

test('color hunt checks all target colors and untouched shapes, with undo reset and two-step mode', async ({ page }) => {
  const game = await open(page, 'color-hunt');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of huntRounds[difficulty]) {
      await press(page, 'Check colors');
      await stars(page, solved);
      await press(page, 'Color circle');
      await press(page, 'Undo paint');
      await expect(page.getByRole('button', { name: 'Color circle', exact: true })).toContainText('unpainted');
      await press(page, 'Color circle');
      await press(page, 'Reset paints');
      for (const target of task) {
        await press(page, `Paint ${target.color}`);
        await press(page, `Color ${target.object}`);
        await expect(page.getByRole('button', { name: `Color ${target.object}`, exact: true })).toContainText(target.color);
      }
      const extra = ['circle', 'square', 'triangle'].find(s => !task.some(t => t.object === s));
      if (!extra) throw new Error('Hunt must leave a non-target');
      await press(page, `Color ${extra}`);
      await press(page, 'Check colors');
      await stars(page, solved);
      await press(page, 'Undo paint');
      await press(page, 'Check colors');
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Check colors' })).toBeDisabled();
      await next(page);
      await expect(page.getByRole('button', { name: 'Undo paint' })).toBeDisabled();
    }
  }
});

test('stamp studio free creation and every exact position recipe support undo reset and retries', async ({ page }) => {
  const game = await open(page, 'shape-studio');
  await expect(page.getByRole('button', { name: 'Finish picture' })).toBeDisabled();
  await press(page, 'Stamp triangle');
  await page.getByRole('button', { name: /^Place at center:/ }).click();
  await press(page, 'Undo stamp');
  await expect(page.getByRole('button', { name: 'Finish picture' })).toBeDisabled();
  await page.getByRole('button', { name: /^Place at center:/ }).click();
  await press(page, 'Finish picture');
  await stars(page, 1);
  await expect(page.getByRole('button', { name: 'Finish picture' })).toBeDisabled();
  await next(page);
  await press(page, game.modes.growing.label);
  let solved = 1;
  for (const task of stampRecipes) {
    await page.getByRole('button', { name: /^Place at top left:/ }).click();
    await press(page, 'Check stamps');
    await stars(page, solved);
    await expect(page.locator('.answer-feedback')).toContainText('Compare each shape');
    await press(page, 'Reset canvas');
    for (const stamp of task.stamps) {
      await press(page, `Stamp ${stamp.shape}`);
      await page.getByRole('button', { name: new RegExp(`^Place at ${gridPlaces[stamp.place]}:`) }).click();
    }
    await press(page, 'Check stamps');
    await stars(page, ++solved);
    await next(page);
  }
});

test('number match visible groups and numeral correspondence cover both ranges and distractors', async ({ page }) => {
  const game = await open(page, 'number-match');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const target of matchRounds[difficulty]) {
      await expect(page.getByLabel(`Numeral ${target}`, { exact: true })).toHaveText(String(target));
      const quantities = numberChoices(target, 1, difficulty === 'gentle' ? 5 : 10);
      for (const count of quantities) await expect(page.getByRole('button', { name: `Choose group of ${count}`, exact: true }).locator('.berry')).toHaveCount(count);
      await press(page, `Choose group of ${quantities.find(n => n !== target)}`);
      await stars(page, solved);
      await press(page, `Choose group of ${target}`);
      await stars(page, ++solved);
      await next(page);
    }
  }
});

test('more less same checks comparison direction, all relations, equality and empty boundaries', async ({ page }) => {
  const game = await open(page, 'more-less-same');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of comparisonRounds[difficulty]) {
      await expect(page.getByRole('img', { name: `Group A: ${task.left} berries`, exact: true }).locator('.berry')).toHaveCount(task.left);
      await expect(page.getByRole('img', { name: `Group B: ${task.right} berries`, exact: true }).locator('.berry')).toHaveCount(task.right);
      const answer = comparison(task.left, task.right);
      await press(page, `Choose ${answer === 'More' ? 'Less' : 'More'}`);
      await stars(page, solved);
      await press(page, `Choose ${answer}`);
      await stars(page, ++solved);
      await next(page);
    }
  }
});

test('specified animal situations have unambiguous suitable homes and explanatory observations', async ({ page }) => {
  const game = await open(page, 'animal-home');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of animalRounds) {
      await expect(page.locator('.game-instruction')).toHaveText(task.context);
      await expect(page.locator('.next-picture svg')).toBeVisible();
      await press(page, `Choose ${task.choices.filter(v => v !== task.home)[0]}`);
      await stars(page, solved);
      await press(page, `Choose ${task.home}`);
      await expect(page.locator('.science-observation')).toHaveText(`Observation: ${task.observation}`);
      await stars(page, ++solved);
      await next(page);
    }
  }
});

test('life cycles validate actual order with reversible stages and species/time observations', async ({ page }) => {
  const game = await open(page, 'life-cycle');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of cycleRounds[difficulty]) {
      await expect(page.locator('.guide-note')).toHaveCount(difficulty === 'gentle' ? 1 : 0);
      await expect(page.locator('.simulation-note')).toContainText('real elapsed time');
      await expect(page.getByRole('button', { name: 'Check sequence' })).toBeDisabled();
      for (const label of [...task.stages].reverse()) await press(page, `Add stage ${label}`);
      await press(page, 'Check sequence');
      await stars(page, solved);
      await press(page, 'Remove stage 1');
      await expect(page.getByRole('button', { name: `Add stage ${task.stages.at(-1)}`, exact: true })).toBeEnabled();
      await press(page, 'Undo stage');
      await press(page, 'Reset sequence');
      for (const label of task.stages) await press(page, `Add stage ${label}`);
      await expect(page.locator('.sequence-slots strong')).toHaveText(task.stages);
      await press(page, 'Check sequence');
      await expect(page.locator('.science-observation')).toHaveText(`Observation: ${task.observation}`);
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Check sequence' })).toBeDisabled();
      await next(page);
    }
  }
});

test('token jar reversible changes include zero, same quantity and ten with no currency', async ({ page }) => {
  const game = await open(page, 'token-jar');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of jarRounds[difficulty]) {
      await expect(page.locator('.simulation-note')).toContainText('not currency');
      await expect(page.getByRole('img', { name: `Jar: ${task.start} tokens`, exact: true })).toBeVisible();
      await press(page, task.start === 0 ? 'Add token' : 'Remove token');
      await press(page, 'Undo token');
      await expect(page.getByRole('img', { name: `Jar: ${task.start} tokens`, exact: true })).toBeVisible();
      if (task.start !== task.goal) {
        await press(page, 'Check jar');
        await stars(page, solved);
      }
      const operation = task.start < task.goal ? 'Add token' : 'Remove token';
      for (let i = 0; i < Math.abs(task.goal - task.start); i++) await press(page, operation);
      await expect(page.locator('.token-display .plain-token')).toHaveCount(task.goal);
      if (task.goal === 0) await expect(page.getByRole('button', { name: 'Remove token', exact: true })).toBeDisabled();
      if (task.goal === (difficulty === 'gentle' ? 5 : 10)) await expect(page.getByRole('button', { name: 'Add token', exact: true })).toBeDisabled();
      if (task.start !== task.goal) {
        await press(page, 'Reset jar');
        for (let i = 0; i < Math.abs(task.goal - task.start); i++) await press(page, operation);
      }
      await press(page, 'Check jar');
      await stars(page, ++solved);
      await expect(page.getByRole('button', { name: 'Check jar' })).toBeDisabled();
      await next(page);
    }
  }
});

test('savings plans and contributions check remaining, overshoot, exact and already-reached goals', async ({ page }) => {
  const game = await open(page, 'save-special');
  let solved = 0;
  for (const difficulty of modes) {
    await press(page, game.modes[difficulty].label);
    for (const task of savingsRounds[difficulty]) {
      const needed = task.goal - task.start;
      const choices = numberChoices(needed, 0, difficulty === 'gentle' ? 5 : 10);
      await press(page, `Choose ${choices.find(n => n !== needed)}`);
      await stars(page, solved);
      await press(page, `Choose ${needed}`);
      await stars(page, solved);
      await expect(page.getByRole('img', { name: `Savings: ${task.start} tokens`, exact: true })).toBeVisible();
      await press(page, 'Reset savings plan');
      await press(page, `Choose ${needed}`);
      if (needed > 0) {
        await press(page, 'Check savings goal');
        await stars(page, solved);
        await press(page, 'Contribute 1 token');
        await press(page, 'Undo contribution');
        await expect(page.getByRole('img', { name: `Savings: ${task.start} tokens`, exact: true })).toBeVisible();
        let remaining = needed;
        while (remaining >= 2) { await press(page, 'Contribute 2 tokens'); remaining -= 2; }
        if (remaining) await press(page, 'Contribute 1 token');
      }
      if (task.goal < (difficulty === 'gentle' ? 5 : 10)) {
        await press(page, 'Contribute 1 token');
        await expect(page.getByText(/There are 1 extra tokens/)).toBeVisible();
        await press(page, 'Check savings goal');
        await stars(page, solved);
        await press(page, 'Remove contribution token');
      }
      await expect(page.locator('.guide-note').last()).toContainText('Remaining now: 0');
      await press(page, 'Check savings goal');
      await stars(page, ++solved);
      await expect(page.locator('.answer-feedback')).toContainText(`Start ${task.start} + planned ${needed} = goal ${task.goal}`);
      await expect(page.getByRole('button', { name: 'Check savings goal' })).toBeDisabled();
      await next(page);
    }
  }
});

test('every new game works at 320px with reduced motion, unavailable speech, no remote requests and mode resets', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => { Reflect.deleteProperty(window, 'speechSynthesis'); });
  const remote: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).hostname !== '127.0.0.1') remote.push(request.url());
  });
  for (const id of newIds) {
    const game = await open(page, id);
    for (const difficulty of modes) {
      await press(page, game.modes[difficulty].label);
      await expect(page.getByRole('button', { name: /^Hear / }).first()).toBeDisabled();
      await expect(page.locator('.game-instruction')).toBeVisible();
      await stars(page, 0);
      await overflow(page);
    }
    await press(page, 'All activities');
    await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(27);
    await overflow(page);
  }
  expect(remote).toEqual([]);
});

test('all ten modes complete with real tap or keyboard, unavailable speech and narrow completed layouts', async ({ page, isMobile }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => { Reflect.deleteProperty(window, 'speechSynthesis'); });
  async function activate(label: string) {
    const button = page.getByRole('button', { name: label, exact: true });
    if (isMobile) await button.tap();
    else { await button.focus(); await page.keyboard.press('Enter'); }
  }
  for (const id of newIds) {
    const game = await open(page, id);
    let solved = 0;
    for (const difficulty of modes) {
      await activate(game.modes[difficulty].label);
      switch (id) {
        case 'rhyme-time': await activate('Choose hat'); break;
        case 'story-detective': await activate('Choose Mia'); break;
        case 'color-hunt':
          for (const t of huntRounds[difficulty][0]) { await activate(`Paint ${t.color}`); await activate(`Color ${t.object}`); }
          await activate('Undo paint');
          await activate(`Color ${huntRounds[difficulty][0].at(-1)?.object}`);
          await activate('Check colors'); break;
        case 'shape-studio':
          if (difficulty === 'gentle') {
            await activate('Stamp triangle');
            await activate('Place at center: empty');
            await activate('Finish picture');
          } else {
            for (const t of stampRecipes[0].stamps) {
              await activate(`Stamp ${t.shape}`);
              await activate(`Place at ${gridPlaces[t.place]}: empty`);
            }
            await activate('Check stamps');
          }
          break;
        case 'number-match': await activate(`Choose group of ${matchRounds[difficulty][0]}`); break;
        case 'more-less-same': {
          const t = comparisonRounds[difficulty][0];
          await activate(`Choose ${comparison(t.left, t.right)}`); break;
        }
        case 'animal-home': await activate('Choose Freshwater pond'); break;
        case 'life-cycle':
          for (const stage of cycleRounds[difficulty][0].stages) await activate(`Add stage ${stage}`);
          await activate('Undo stage');
          await activate(`Add stage ${cycleRounds[difficulty][0].stages.at(-1)}`);
          await activate('Check sequence'); break;
        case 'token-jar': {
          const t = jarRounds[difficulty][0];
          for (let i = 0; i < Math.abs(t.start - t.goal); i++) await activate(t.start > t.goal ? 'Remove token' : 'Add token');
          await activate('Check jar'); break;
        }
        case 'save-special': {
          const t = savingsRounds[difficulty][0];
          await activate(`Choose ${t.goal - t.start}`);
          for (let i = t.start; i < t.goal; i++) await activate('Contribute 1 token');
          await activate('Check savings goal'); break;
        }
      }
      await stars(page, ++solved);
      await expect(page.locator('.answer-feedback')).toHaveClass(/correct/);
      await overflow(page);
      await activate('Play another');
      await expect(page.locator('.game-instruction')).toBeFocused();
      await stars(page, solved);
      await overflow(page);
    }
  }
});

test('new controls support keyboard and genuine touch input, filter preservation and tab-only stars', async ({ page, isMobile }) => {
  await page.goto('/');
  await press(page, 'Money');
  await page.getByRole('button', { name: /^Little Explorers/ }).click();
  await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(1);
  await press(page, 'Play Token Jar');
  const add = page.getByRole('button', { name: 'Add token', exact: true });
  await add.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  if (isMobile) await add.tap(); else await add.click();
  await press(page, 'Check jar');
  await stars(page, 1);
  await press(page, 'Jar changes to 10');
  await stars(page, 1);
  await expect(page.getByRole('img', { name: 'Jar: 8 tokens', exact: true })).toBeVisible();
  await press(page, 'All activities');
  await expect(page.getByRole('button', { name: 'Money', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: /^Little Explorers/ })).toHaveAttribute('aria-pressed', 'true');
  await press(page, 'All activities');
  await press(page, 'All stages');
  await press(page, 'Play Shape Stamp Studio');
  const shape = page.getByRole('button', { name: 'Stamp square', exact: true });
  await shape.focus(); await page.keyboard.press('Space');
  const place = page.getByRole('button', { name: /^Place at center:/ });
  if (isMobile) await place.tap(); else { await place.focus(); await page.keyboard.press('Enter'); }
  await press(page, 'Finish picture');
  await stars(page, 2);
  await page.reload();
  await press(page, 'Play Token Jar');
  await stars(page, 0);
});

test('independent new catalog and dataset contracts cover ranges, boundaries and coherent cycles', () => {
  expect(games).toHaveLength(27);
  for (const id of newIds) expect(games.filter(g => g.id === id)).toHaveLength(1);
  const counts = Object.fromEntries(['reading', 'coloring', 'math', 'science', 'money'].map(subject => [subject, games.filter(g => g.subject === subject).length]));
  expect(counts).toEqual({ reading: 7, coloring: 5, math: 6, science: 4, money: 5 });
  expect(games.filter(g => g.stages.includes('explorers'))).toHaveLength(15);
  expect(games.filter(g => g.stages.includes('thinkers'))).toHaveLength(26);
  expect(rhymeRounds.map(t => `${t.word}/${t.match}`)).toEqual(['cat/hat', 'sun/bun', 'hen/pen', 'duck/truck']);
  for (const t of rhymeRounds) expect(t.other).not.toContain(t.match);
  for (const story of storyRounds) for (const q of story.questions) {
    expect(q.choices.filter(c => c === q.answer)).toHaveLength(1);
    const evidence = q.answer.replace(/^The |^A /, '').toLowerCase();
    expect(story.short.toLowerCase()).toContain(evidence);
    expect(story.long.toLowerCase()).toContain(evidence);
  }
  for (const difficulty of modes) {
    const max = difficulty === 'gentle' ? 5 : 10;
    expect(Math.max(...matchRounds[difficulty])).toBe(max);
    const comparisons = comparisonRounds[difficulty];
    expect(new Set(comparisons.map(t => comparison(t.left, t.right)))).toEqual(new Set(['More', 'Less', 'Same']));
    expect(comparisons.some(t => t.left === 0 && t.right === 0)).toBe(true);
    for (const t of comparisons) expect([t.left, t.right].every(n => n >= 0 && n <= max)).toBe(true);
    expect(jarRounds[difficulty].some(t => t.goal === 0)).toBe(true);
    expect(jarRounds[difficulty].some(t => t.goal === max)).toBe(true);
    expect(savingsRounds[difficulty].some(t => t.start === t.goal)).toBe(true);
    for (const t of savingsRounds[difficulty]) expect(t.start >= 0 && t.start <= t.goal && t.goal <= max).toBe(true);
    for (const t of cycleRounds[difficulty]) {
      expect(t.stages).toHaveLength(t.art.length);
      expect(new Set(t.stages).size).toBe(t.stages.length);
      expect(t.observation).toMatch(/cycle/);
    }
  }
  expect(cycleRounds.growing[0].stages).toEqual(['Eggs in water', 'Tadpole', 'Tadpole with legs', 'Young frog', 'Adult frog']);
  expect(cycleRounds.gentle[1].stages).toEqual(['Egg', 'Caterpillar', 'Chrysalis', 'Adult butterfly']);
  for (const t of animalRounds) expect(t.choices.filter(c => c === t.home)).toHaveLength(1);
  for (const t of stampRecipes) expect(new Set(t.stamps.map(s => s.place)).size).toBe(t.stamps.length);
  const inventory = readFileSync(join('docs', 'GAME-ROADMAP.md'), 'utf8').split('## 50-game backlog')[1].split('## Platformer experiment boundaries')[0];
  const rows = inventory.split('\n').filter(line => /^\| \d+ \|/.test(line));
  expect(rows).toHaveLength(50);
  expect(rows.map(line => Number(line.split('|')[1].trim()))).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  expect(rows.filter(line => line.includes('| Playable |'))).toHaveLength(27);
  expect(rows.filter(line => line.includes('| Proposed |'))).toHaveLength(23);
});
