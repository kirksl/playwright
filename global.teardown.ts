import { test as teardown } from '@playwright/test';

teardown('global teardown', async ({ page }) => {
  console.log('global teardown');
});