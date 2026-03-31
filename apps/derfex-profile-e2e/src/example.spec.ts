import {
  expect,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  type PlaywrightWorkerArgs,
  type PlaywrightWorkerOptions,
  test,
} from '@playwright/test'

test('has title', async ({
  page,
}: PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions): Promise<void> => {
  await page.goto('/')

  // Expect `<h1>` to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('No data')
})
