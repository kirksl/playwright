import { test as setup } from '@playwright/test';

setup('global setup', async ({ page }) => {
  console.log('global setup');
});