import { test, expect } from '@playwright/test';

test('pricing section has template CTA background and visible text', async ({ page }) => {
  await page.goto('/');
  
  const pricingSection = page.locator('#pricing');
  await expect(pricingSection).toBeVisible();
  
  // Check section has correct background classes
  await expect(pricingSection).toHaveClass(/bg-teal-900/);
  await expect(pricingSection).toHaveClass(/relative/);
  await expect(pricingSection).toHaveClass(/overflow-hidden/);
  
  // Check background image is present
  const backgroundImage = pricingSection.locator('img[src*="bg-light-lines.png"]');
  await expect(backgroundImage).toBeVisible();
  await expect(backgroundImage).toHaveClass(/absolute/);
  
  // Check pricing heading is present and visible
  const heading = pricingSection.locator('h2');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Pricing');
  
  // Check subheading is present and visible
  const subheading = pricingSection.locator('p').first();
  await expect(subheading).toBeVisible();
  await expect(subheading).toContainText('Simple, transparent pricing that grows with you');
  
  // Check container has proper z-index for content visibility
  const container = pricingSection.locator('.container').first();
  await expect(container).toHaveClass(/relative/);
});