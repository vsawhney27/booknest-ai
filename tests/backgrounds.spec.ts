import { test, expect } from '@playwright/test';

test('background classes are applied correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check solutions section has the dark green curved-pattern background (template style)
  await expect(page.locator('#solutions')).toHaveClass(/bg-teal-900/);
  await expect(page.locator('#solutions')).toHaveClass(/relative/);
  await expect(page.locator('#solutions')).toHaveClass(/overflow-hidden/);
  
  // Check how-it-works section has the white background with subtle green lines
  await expect(page.locator('#how-it-works')).toHaveClass(/relative/);
  await expect(page.locator('#how-it-works')).toHaveClass(/overflow-hidden/);
  
  // Check capabilities section has the solid dark green background
  await expect(page.locator('#capabilities')).toHaveClass(/bg-teal-900/);
});