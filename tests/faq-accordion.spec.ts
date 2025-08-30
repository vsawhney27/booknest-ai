import { test, expect } from '@playwright/test';

test('FAQ chevrons are small and accordion toggles', async ({ page }) => {
  await page.goto('/');
  const firstBtn = page.locator('#faqs .faq-q').first();
  await expect(firstBtn).toBeVisible();

  // chevron size guard (<= 32px)
  const chev = firstBtn.locator('.chev');
  const w = await chev.evaluate(el => parseFloat(getComputedStyle(el).width));
  const h = await chev.evaluate(el => parseFloat(getComputedStyle(el).height));
  expect(w).toBeLessThanOrEqual(32);
  expect(h).toBeLessThanOrEqual(32);

  // toggle works
  await firstBtn.click();
  await expect(firstBtn).toHaveAttribute('aria-expanded','true');
  const panelId = await firstBtn.getAttribute('aria-controls');
  await expect(page.locator('#'+panelId)).toBeVisible();

  await firstBtn.click();
  await expect(firstBtn).toHaveAttribute('aria-expanded','false');
});