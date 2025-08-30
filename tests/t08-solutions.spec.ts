import { test, expect } from '@playwright/test';

test.describe('T08 - Solutions by Industry', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#solutions');
  });

  test('has correct green background and white text', async ({ page }) => {
    const solutionsSection = page.locator('#solutions');
    
    // Check background is teal-900 (template green)
    await expect(solutionsSection).toHaveClass(/bg-teal-900/);
    
    // Check text is white/light colored
    const heading = solutionsSection.locator('h2').first();
    await expect(heading).toHaveClass(/text-white/);
  });

  test('displays industry tabs with icons and proper ARIA', async ({ page }) => {
    const tabs = page.locator('.industry-tab');
    
    // Should have 3 tabs
    await expect(tabs).toHaveCount(3);
    
    // Check tab structure and ARIA attributes
    for (let i = 0; i < 3; i++) {
      const tab = tabs.nth(i);
      await expect(tab).toHaveAttribute('role', 'tab');
      await expect(tab).toHaveAttribute('aria-controls');
      
      // Check has icon and text
      await expect(tab.locator('.tab-icon')).toBeVisible();
      await expect(tab.locator('.tab-text')).toBeVisible();
    }
    
    // First tab should be active by default
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.first()).toHaveClass(/active/);
  });

  test('switches tabs correctly with mouse clicks', async ({ page }) => {
    const tabs = page.locator('.industry-tab');
    const panels = page.locator('.industry-panel');
    
    // Initially first panel should be visible
    await expect(panels.first()).not.toHaveClass(/hidden/);
    await expect(panels.nth(1)).toHaveClass(/hidden/);
    await expect(panels.nth(2)).toHaveClass(/hidden/);
    
    // Click second tab
    await tabs.nth(1).click();
    
    // Check tab states
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'false');
    
    // Check panel states
    await expect(panels.nth(0)).toHaveClass(/hidden/);
    await expect(panels.nth(1)).not.toHaveClass(/hidden/);
    await expect(panels.nth(2)).toHaveClass(/hidden/);
    
    // Click third tab
    await tabs.nth(2).click();
    
    // Check final states
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(panels.nth(2)).not.toHaveClass(/hidden/);
    await expect(panels.nth(0)).toHaveClass(/hidden/);
    await expect(panels.nth(1)).toHaveClass(/hidden/);
  });

  test('supports keyboard navigation', async ({ page }) => {
    const tabs = page.locator('.industry-tab');
    
    // Focus first tab and check it's active
    await tabs.first().focus();
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    
    // Press right arrow to move to next tab
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    
    // Press right arrow again to move to third tab
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    
    // Press left arrow to go back
    await page.keyboard.press('ArrowLeft');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  });

  test('displays comprehensive industry content', async ({ page }) => {
    const tabs = page.locator('.industry-tab');
    
    // Test Medical/Wellness Spa content
    await tabs.nth(0).click();
    await expect(page.locator('h3:has-text("Medical & Wellness Spa Solutions")')).toBeVisible();
    await expect(page.locator('#spa-panel').getByText('HIPAA-compliant')).toBeVisible();
    await expect(page.locator('text=Appointment Management')).toBeVisible();
    await expect(page.locator('text=Compliance & Privacy')).toBeVisible();
    
    // Test Real Estate content
    await tabs.nth(1).click();
    await expect(page.locator('h3:has-text("Real Estate Solutions")')).toBeVisible();
    await expect(page.locator('h4:has-text("Lead Qualification")')).toBeVisible();
    await expect(page.locator('h4:has-text("Property Information")')).toBeVisible();
    await expect(page.locator('text=Pre-qualify buyers')).toBeVisible();
    
    // Test Medical Clinics content
    await tabs.nth(2).click();
    await expect(page.locator('h3:has-text("Medical Clinic Solutions")')).toBeVisible();
    await expect(page.locator('text=Patient Scheduling')).toBeVisible();
    await expect(page.locator('text=Patient Support')).toBeVisible();
    await expect(page.locator('text=insurance verification')).toBeVisible();
  });

  test('has proper responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    const tabs = page.locator('.industry-tab');
    
    // Tabs should be visible and properly sized
    await expect(tabs.first()).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Tabs should still be visible and responsive
    await expect(tabs.first()).toBeVisible();
    await expect(tabs.nth(1)).toBeVisible();
    await expect(tabs.nth(2)).toBeVisible();
    
    // Should still function on mobile
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  });

  test('uses semantic HTML and checkmark icons', async ({ page }) => {
    const tabs = page.locator('.industry-tab');
    
    // Check proper list structure
    await expect(page.locator('.feature-group ul')).toHaveCount(6); // 2 per panel × 3 panels
    
    // Check for checkmark SVG icons (only in first visible panel by default)
    const firstTab = tabs.first();
    await firstTab.click();
    const visiblePanel = page.locator('#spa-panel');
    await expect(visiblePanel.locator('svg[viewBox="0 0 20 20"]')).toHaveCount(8); // 4 per column × 2 columns
    
    // Check proper heading hierarchy
    await expect(page.locator('#solutions h2')).toHaveCount(1);
    await expect(page.locator('#solutions h3')).toHaveCount(3);
    await expect(page.locator('#solutions h4')).toHaveCount(6);
  });
});