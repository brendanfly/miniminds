import { expect, test } from '@playwright/test';
import { countChoices, countRounds, letterRounds } from '../src/games';

test('home filters activities and fits the screen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Little play. Big discoveries.' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(7);
  await page.getByRole('button', { name: 'Reading', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Play Letter Friends' })).toBeVisible();
  await page.getByRole('button', { name: 'All activities' }).click();
  await expect(page.getByRole('button', { name: /^Play / })).toHaveCount(7);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('coloring supports colors, undo, pages, and one celebration per picture', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Coloring Garden' }).click();
  await expect(page.getByRole('button', { name: 'All done' })).toBeDisabled();
  await page.getByRole('button', { name: 'Blue', exact: true }).click();
  const petal = page.getByRole('button', { name: 'Color petal 1', exact: true });
  await petal.click();
  await expect(petal).toHaveAttribute('fill', '#94bcc9');
  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(petal).toHaveAttribute('fill', '#fffdf8');
  await expect(page.getByRole('button', { name: 'All done' })).toBeDisabled();
  await page.getByRole('button', { name: 'Little house', exact: true }).click();
  await page.getByRole('button', { name: 'Color roof', exact: true }).click();
  await page.getByRole('button', { name: 'All done' }).click();
  await expect(page.getByRole('status')).toContainText('A little masterpiece!');
  await expect(page.getByText('1 happy star', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'All done' })).toBeDisabled();
  await page.getByRole('button', { name: 'Make another' }).click();
  await expect(page.getByRole('button', { name: 'Color roof', exact: true })).toHaveAttribute('fill', '#fffdf8');
});

test('letters offer gentle retries and playable rounds', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Letter Friends' }).click();
  await page.getByRole('button', { name: 'Choose B', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Good try');
  for (let i = 0; i < letterRounds.length; i++) {
    await page.getByRole('button', { name: `Choose ${letterRounds[i].letter}`, exact: true }).click();
    await expect(page.getByRole('status')).toContainText('You found it!');
    await expect(page.getByRole('button', { name: `Choose ${letterRounds[i].letter}`, exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Play another' }).click();
  }
  await expect(page.getByText('6 happy stars', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Choose A', exact: true })).toBeEnabled();
});

test('numbers count each flower once and cover 1 through 10', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play Counting Meadow' }).click();
  await page.getByRole('button', { name: 'Count flower 2', exact: true }).click();
  await page.getByRole('button', { name: 'Count flower 2', exact: true }).click();
  await expect(page.locator('.count-badge')).toHaveCount(1);
  await expect(page.locator('.count-badge')).toHaveText('1');
  await page.getByRole('button', { name: 'Choose 2', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Good try');
  for (const count of countRounds) {
    await expect(page.getByRole('button', { name: /^Count flower / })).toHaveCount(count);
    await page.getByRole('button', { name: `Choose ${count}`, exact: true }).click();
    await expect(page.getByRole('status')).toContainText(`${count} flowers`);
    await page.getByRole('button', { name: 'Play another' }).click();
    await expect(page.locator('.count-badge')).toHaveCount(0);
  }
  await expect(page.getByText('10 happy stars', { exact: true })).toBeVisible();
});

test('parent panel requires an uninterrupted hold and restores focus', async ({ page }) => {
  await page.goto('/');
  const parentButton = page.getByRole('button', { name: 'Grown-ups' });
  await parentButton.click();
  const hold = page.getByRole('button', { name: 'Hold to open' });
  await hold.focus();
  await page.keyboard.down('Space');
  await page.keyboard.up('Space');
  await expect(page.getByRole('heading', { name: 'Hello, grown-up!' })).toBeVisible();
  await page.keyboard.down('Space');
  await expect(page.getByRole('heading', { name: 'A little note for grown-ups' })).toBeVisible({ timeout: 6000 });
  await page.keyboard.up('Space');
  await expect(page.getByText('Private by design')).toBeVisible();
  await page.getByRole('button', { name: 'Close grown-up panel' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(parentButton).toBeFocused();
});

test('question data always offers exactly one correct choice', () => {
  for (const count of countRounds) {
    const choices = countChoices(count);
    expect(choices).toHaveLength(3);
    expect(choices.filter(choice => choice === count)).toHaveLength(1);
    expect(choices.every(choice => choice >= 1 && choice <= 10)).toBe(true);
  }
  for (const round of letterRounds) {
    expect(round.choices.filter(choice => choice === round.letter)).toHaveLength(1);
  }
});
