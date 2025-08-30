import { test, expect } from '@playwright/test';

test('capabilities accordion toggles with keyboard', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: /Call Handling/i });
  await btn.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText(/24\/7 answering/i)).toBeVisible();
});