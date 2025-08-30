import { test, expect } from '@playwright/test';

test('T09: Pricing section content and functionality', async ({ page }) => {
  await page.goto('/');
  
  const pricing = page.locator('#pricing');
  await expect(pricing).toBeVisible();
  
  // Check main heading
  await expect(pricing.locator('h2')).toContainText('Pricing');
  await expect(pricing.locator('p').first()).toContainText('Simple, transparent pricing that grows with you');
  
  // Check Launch Setup section
  await expect(pricing.getByRole('heading', { name: 'Launch Setup' })).toBeVisible();
  await expect(pricing.getByText('One-time setup fee')).toBeVisible();
  
  // Check Monthly Plans section  
  await expect(pricing.getByText('Monthly Plans')).toBeVisible();
  await expect(pricing.getByText('$500 — $2,000')).toBeVisible();
  await expect(pricing.getByText('/month')).toBeVisible();
  await expect(pricing.getByText('Based on call volume & integrations')).toBeVisible();
  
  // Check Includes section
  await expect(pricing.getByText('Includes')).toBeVisible();
  await expect(pricing.getByText('Analytics and call summaries')).toBeVisible();
  await expect(pricing.getByText('Calendar management')).toBeVisible();
  await expect(pricing.getByText('Full integration support')).toBeVisible();
  
  // Check FAQ link
  const faqLink = pricing.locator('a[href="#faqs"]');
  await expect(faqLink).toBeVisible();
  await expect(faqLink).toContainText('How pricing works');
  
  // Verify no calculator present
  await expect(page.locator('text=calculator')).not.toBeVisible();
  await expect(page.locator('text=Calculator')).not.toBeVisible();
  await expect(page.locator('text=ROI')).not.toBeVisible();
});

test('T09: Pricing responsive layout', async ({ page }) => {
  // Test desktop
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  
  const pricing = page.locator('#pricing');
  await expect(pricing).toBeVisible();
  
  // Test mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(pricing).toBeVisible();
  await expect(pricing.locator('h2')).toBeVisible();
  
  // Test tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(pricing).toBeVisible();
  await expect(pricing.locator('h2')).toBeVisible();
});