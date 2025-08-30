import { test, expect } from '@playwright/test';

test('solutions uses teal waves background and light text', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#solutions');
  await expect(s).toBeVisible();
  
  const bg = await s.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bg).toMatch(/url\(|gradient/i); // pattern present
  
  const color = await s.evaluate(el => getComputedStyle(el).color);
  expect(color).toMatch(/rgb\((2[3-5]\d|25[0-5]),\s*(2[3-5]\d|25[0-5]),\s*(2[3-5]\d|25[0-5])\)/); // near-white
});