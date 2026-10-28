import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Prague Scavenger Hunt/)

    const header = page.getByRole('banner')

    await expect(header.getByRole('link', { name: 'Prague Scavenger Hunt – home' })).toBeVisible()
    await expect(header.getByRole('navigation', { name: 'Main' }).getByRole('link')).toHaveCount(3)
  })
})
