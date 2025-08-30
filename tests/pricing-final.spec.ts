import { test, expect } from '@playwright/test';

test('Final pricing verification: no giant checkmarks, clean layout', async ({ page }) => {
  await page.goto('/');
  
  const pricing = page.locator('#pricing');
  await expect(pricing).toBeVisible();
  
  // Verify solid dark green background
  const bg = await pricing.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg.replace(/\s/g,'')).toBe('rgb(14,59,46)'); // #0E3B2E
  
  // Verify no background images
  const bgImg = await pricing.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bgImg).toMatch(/none/i);
  
  // Verify no decorative elements
  const hasDecorative = await page.evaluate(() =>
    !!document.querySelector('#pricing .giant-check, #pricing .bg-checks, #pricing .hero-checks, #pricing [data-checks], #pricing svg.w-5')
  );
  expect(hasDecorative).toBeFalsy();
  
  // Verify content is present
  await expect(pricing.getByRole('heading', { name: 'Pricing' })).toBeVisible();
  await expect(pricing.getByRole('heading', { name: 'Launch Setup' })).toBeVisible();
  await expect(pricing.getByText('One-time setup fee')).toBeVisible();
  await expect(pricing.getByText('Monthly Plans')).toBeVisible();
  await expect(pricing.getByText('$500 — $2,000')).toBeVisible();
  await expect(pricing.getByText('Analytics and call summaries')).toBeVisible();
  
  // Verify overlay is only in #solutions
  const solutionsOverlay = await page.locator('#solutions img[src*="bg-light-lines.png"]').count();
  expect(solutionsOverlay).toBe(1);
  
  const pricingOverlay = await page.locator('#pricing img[src*="bg-light-lines.png"]').count();
  expect(pricingOverlay).toBe(0);
});