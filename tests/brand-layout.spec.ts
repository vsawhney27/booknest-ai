import { test, expect } from '@playwright/test';

test('#solutions has no overlay; #capabilities has overlay helper', async ({ page }) => {
  await page.goto('/');
  const solHasOverlay = await page.evaluate(() => !!document.querySelector('#solutions .section__bg, #solutions .pattern, #solutions [data-overlay="curves"]'));
  expect(solHasOverlay).toBeFalsy();
  const capHasOverlay = await page.evaluate(() => !!document.querySelector('#capabilities .section__bg, #capabilities .pattern, #capabilities [data-overlay="curves"]'));
  expect(capHasOverlay).toBeTruthy();
});

test('#pricing dark green and cards visible', async ({ page }) => {
  await page.goto('/');
  const bg = await page.locator('#pricing').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg.replace(/\s/g,'')).toBe('rgb(14,59,46)');
  await expect(page.locator('#pricing .plan-card').first()).toBeVisible();
});

test('pricing cards have hover animations', async ({ page }) => {
  await page.goto('/');
  
  const firstCard = page.locator('#pricing .plan-card').first();
  await expect(firstCard).toBeVisible();
  
  // Check initial state
  const initialTransform = await firstCard.evaluate(el => getComputedStyle(el).transform);
  
  // Hover over card
  await firstCard.hover();
  
  // Wait for animation and check transform changed
  await page.waitForTimeout(300);
  const hoverTransform = await firstCard.evaluate(el => getComputedStyle(el).transform);
  
  // Transform should be different after hover (will include scale and translate)
  expect(hoverTransform).not.toBe(initialTransform);
});