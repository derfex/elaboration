import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/nx-welcome')

  // Expect `h1` to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Welcome')
})
