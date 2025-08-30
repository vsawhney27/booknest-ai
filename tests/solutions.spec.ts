import { test, expect } from '@playwright/test';

test('solutions tabs switch correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check Med/Wellness Spa tab is active by default
  await expect(page.locator('#tab-spa-btn')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-spa')).toBeVisible();
  await expect(page.locator('#tab-re')).toBeHidden();
  await expect(page.locator('#tab-clinic')).toBeHidden();
  
  // Click Real Estate tab
  await page.click('#tab-re-btn');
  await expect(page.locator('#tab-re-btn')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-spa-btn')).toHaveAttribute('aria-selected', 'false');
  await expect(page.locator('#tab-re')).toBeVisible();
  await expect(page.locator('#tab-spa')).toBeHidden();
  await expect(page.locator('#tab-clinic')).toBeHidden();
  
  // Click Clinics tab
  await page.click('#tab-clinic-btn');
  await expect(page.locator('#tab-clinic-btn')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-re-btn')).toHaveAttribute('aria-selected', 'false');
  await expect(page.locator('#tab-clinic')).toBeVisible();
  await expect(page.locator('#tab-spa')).toBeHidden();
  await expect(page.locator('#tab-re')).toBeHidden();
});