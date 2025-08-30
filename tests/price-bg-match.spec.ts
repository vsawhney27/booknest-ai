import { test, expect } from '@playwright/test';

test('pricing base color matches capabilities and overlay remains', async ({ page }) => {
  await page.goto('/');
  const cap = page.locator('#capabilities');
  const price = page.locator('#pricing');
  const capBg = await cap.evaluate(el => getComputedStyle(el).backgroundColor);
  const priceBg = await price.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(priceBg).toBe(capBg);                 // same dark green
  
  // Check for overlay - either background-image on section or img element
  const img = await price.evaluate(el => getComputedStyle(el).backgroundImage);
  const hasImgElement = await page.locator('#pricing img[src*="bg-light-lines.png"]').count() > 0;
  const hasOverlay = img.includes('url(') || hasImgElement;
  expect(hasOverlay).toBeTruthy();             // overlay still present
});