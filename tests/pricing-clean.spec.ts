import { test, expect } from '@playwright/test';

test('Pricing has solid dark green and no giant checks', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#pricing');
  const bgImg = await s.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bgImg).toMatch(/none/i);                         // no overlay/background images on pricing
  const bg = await s.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg.replace(/\s/g,'')).toBe('rgb(14,59,46)');     // #0E3B2E
  // No decorative nodes present
  const hasDeco = await page.evaluate(() =>
    !!document.querySelector('#pricing .giant-check, #pricing .bg-checks, #pricing .hero-checks, #pricing [data-checks]')
  );
  expect(hasDeco).toBeFalsy();
});