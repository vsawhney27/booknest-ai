import { test, expect } from '@playwright/test';

test('FAQ question font isn\'t oversized and chevrons are small', async ({ page }) => {
  await page.goto('/');
  const q = page.locator('#faqs .faq-q .q-text').first();
  const size = await q.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeLessThanOrEqual(22);
  const chev = page.locator('#faqs .faq-q .chev').first();
  const w = await chev.evaluate(el => parseFloat(getComputedStyle(el).width));
  expect(w).toBeLessThanOrEqual(32);
});