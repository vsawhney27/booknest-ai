import { test, expect } from '@playwright/test';

test('overlay moved off pricing onto solutions', async ({ page }) => {
  await page.goto('/');
  const priceBgImg = await page.locator('#pricing').evaluate(el => getComputedStyle(el).backgroundImage);
  // no background image on pricing (overlay removed)
  expect(priceBgImg).toMatch(/none/i);

  // solutions has overlay either as background-image or helper div present
  const solBgImg = await page.locator('#solutions').evaluate(el => getComputedStyle(el).backgroundImage);
  const hasHelper = await page.evaluate(() => !!document.querySelector('#solutions img[src*="bg-light-lines.png"]'));
  expect(solBgImg.includes('url(') || hasHelper).toBeTruthy();

  const priceBg = await page.locator('#pricing').evaluate(el => getComputedStyle(el).backgroundColor);
  const solBg   = await page.locator('#solutions').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(priceBg.replace(/\s/g,'')).toBe('rgb(14,59,46)'); // #0E3B2E
  expect(solBg.replace(/\s/g,'')).toBe('rgb(14,59,46)');
});