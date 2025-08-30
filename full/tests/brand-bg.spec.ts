import { test, expect } from '@playwright/test';

test('#pricing uses overlay background', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#pricing');
  
  // Check for background image element (the CTA template uses img element)
  const backgroundImg = s.locator('img[src*="bg-light-lines.png"]');
  await expect(backgroundImg).toBeVisible();
  await expect(backgroundImg).toHaveClass(/absolute/);
  
  // Ensure pricing content is still visible
  await expect(s.locator('h2')).toBeVisible();
  await expect(s.locator('h2')).toContainText('Pricing');
});

test('#capabilities and #contact are solid dark green', async ({ page }) => {
  await page.goto('/');
  for (const id of ['#capabilities', '#contact']) {
    const bgImg = await page.locator(id).evaluate(el => getComputedStyle(el).backgroundImage);
    expect(bgImg).toMatch(/none/i);
    const bg = await page.locator(id).evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg.replace(/\s/g,'')).toBe('rgb(14,59,46)'); // #0E3B2E
  }
});