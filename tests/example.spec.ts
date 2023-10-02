import { test } from '../fixtures/bootstrap';

test('test 1', async ({ page }) => {
  console.log('test 1 started');
  await page.goto('https://playwright.dev/');
  throw new Error('test 1 failed');
});

test('test 2', async ({ page }) => {
  console.log('test 2 started');
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'star' }).click();
});
