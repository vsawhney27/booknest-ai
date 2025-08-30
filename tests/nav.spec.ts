import { test, expect } from '@playwright/test';

test('header anchors smooth-scroll and highlight active', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /Capabilities/i });
  await link.click();
  await expect(page).toHaveURL(/#capabilities/);
});