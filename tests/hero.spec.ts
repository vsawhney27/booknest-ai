import { test, expect } from '@playwright/test';

test('hero renders and CTA scrolls to contact', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: /Book a Demo/i }).click();
  await expect(page).toHaveURL(/#contact|#demo/i);
});