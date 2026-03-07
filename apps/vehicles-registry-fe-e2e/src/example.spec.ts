import { expect, test } from '@playwright/test'

test('has title', async ({ page }): Promise<void> => {
  await page.goto('/')

  // Expect `<header>` to contain a substring.
  expect(await page.locator('header').innerText()).toContain('Vehicles registry application')
})
