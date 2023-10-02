import { test as base } from '@playwright/test';

export const test = base.extend<{
    testFixture: string,
    autoTestFixture: string,
    unusedFixture: string
  },
  {
    workerFixture: string,
    autoWorkerFixture: string
  }>(
    {
      workerFixture: [async ({ browser }, use) => {
        console.log('workerFixture setup');
        await use('workerFixture');
        console.log('workerFixture teardown');
      }, { scope: 'worker' }],
      autoWorkerFixture: [async ({ browser }, use) => {
        console.log('autoWorkerFixture setup');
        await use('autoWorkerFixture');
        console.log('autoWorkerFixture teardown');
      }, { scope: 'worker', auto: true }],
      testFixture: [async ({ page, workerFixture }, use) => {
        console.log('testFixture setup');
        await use('testFixture');
        console.log('testFixture teardown');
      }, { scope: 'test' }],
      autoTestFixture: [async ({ page }, use, testInfo) => {
        console.log('autoTestFixture setup');
        await use('autoTestFixture');
        if (testInfo?.status === 'passed') { console.log('test passed'); }
        if (testInfo?.status === 'skipped') { console.log('test skipped'); }
        if (testInfo?.status === 'interrupted') { console.log('test interrupted'); }
        if (testInfo.status === 'timedOut') { console.log('test timed out'); }
        if (testInfo.status === 'failed') { console.log('test failed'); }
        console.log('autoTestFixture teardown');
      }, { scope: 'test', auto: true }],
      unusedFixture: [async ({ page }, use) => {
        console.log('unusedFixture setup');
        await use('unusedFixture');
        console.log('unusedFixture teardown');
      }, { scope: 'test' }],
    }
  );

export { expect } from '@playwright/test';