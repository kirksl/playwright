# Playwright

## Purpose
Demonstrate issue where attempting to live debug and fix a failing playwright test that uses setup/teardown projects is not possible.

## Setup
Install the Latest LTS of [Node](https://nodejs.org/)

Install project dependencies `npm i`

Install [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Issue

This issue was originally reported at Stackoverflow and transcribed below.

https://stackoverflow.com/questions/77198526/how-to-live-debug-and-fix-a-failing-playwright-test-that-uses-setup-teardown-pro


My Playwright project employs a global setup and teardown via `projects` in `playwright.config.ts`

```
  projects: [
    {
      name: 'global setup',
      testMatch: '/global.setup.ts',
      teardown: 'global teardown'
    },
    {
      name: 'global teardown',
      testMatch: '/global.teardown.ts'
    },
    {
      name: 'chromium',
      dependencies: ['global setup'],
      testDir: './tests',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      dependencies: ['global setup'],
      testDir: './tests',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      dependencies: ['global setup'],
      testDir: './tests',
      use: { ...devices['Desktop Safari'] }
    }
```

This works great until I need to debug a test. Here's my story:

Prefacing what i'm trying below i'm also trying various combinations under VSCode's `Select Configuration` -> `Default Profile` in the `Testing` activity here without any difference in results selecting only `chromium`, `chromium and global setup`, etc.

First I try what she said here https://www.youtube.com/watch?v=tJF7UhA59Gc&t=43s

- I open VSCode with `Playwright Test for VSCode` plugin installed
- Goto the Testing activity and check the box `Show browser` for Playwright
- Open a test that is failing `example.spec.ts > test 2` and hit the play button for it in the gutter
- The global setup project runs, opens a browser, kills the browser
- The chromium project runs, opens a browser, runs the test, kills the browser
- The global teardown project runs, opens a browser, leaves browser open
- Global setup and teardown don't use the browser so it's just a blank page
- VSCode shows the test's error inline within the test, but because the browser for the test was killed I have no way to live debug and fix it

Second I try what she said here https://www.youtube.com/watch?v=tJF7UhA59Gc&t=2m41s

- I open VSCode with `Playwright Test for VSCode` plugin installed
- Goto the Testing activity and check the box `Show browser` for Playwright
- Open a test that is failing `example.spec.ts > test 2`, set a breakpoint at line where test is failing, right-click play and hit debug test in the gutter
- The global setup project runs, opens a browser, kills the browser
- The chromium project runs, opens a browser, runs the test up to the breakpoint and pauses leaving the browser open
- In debug mode I hit the `Step Over` debug button to watch the failure occur in the test which kills the browser
- The global teardown project runs, opens a browser, leaves browser open
- Global setup and teardown don't use the browser so it's just a blank page
- VSCode shows the test's error inline within the test, but because the browser for the test was killed I have no way to live debug and fix it

In both scenarios I want to do what she does here live editing the test to resolve the locator issue https://www.youtube.com/watch?v=tJF7UhA59Gc&t=1m32s