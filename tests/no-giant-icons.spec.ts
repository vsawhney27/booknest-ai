import { test, expect } from '@playwright/test';

test('no giant icons in Security & Compliance', async ({ page }) => {
  await page.goto('/');
  const icons = page.locator('#security .icon, #security svg[data-role="icon"]');
  const count = await icons.count();
  for (let i = 0; i < count; i++) {
    const w = await icons.nth(i).evaluate(el => parseFloat(getComputedStyle(el).width));
    const h = await icons.nth(i).evaluate(el => parseFloat(getComputedStyle(el).height));
    expect(w).toBeLessThanOrEqual(48);   // cap guardrail
    expect(h).toBeLessThanOrEqual(48);
  }
});