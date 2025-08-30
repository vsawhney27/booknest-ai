import { test, expect } from '@playwright/test';

test('FAQ accessibility and functionality', async ({ page }) => {
  await page.goto('/#faqs');
  
  // Wait for FAQ section to be visible
  await expect(page.locator('#faqs')).toBeVisible();
  
  // Check that FAQ buttons are present and have correct ARIA attributes
  const faqButtons = page.locator('[data-faq-toggle]');
  await expect(faqButtons).toHaveCount(8);
  
  // Test first FAQ button
  const firstFAQ = faqButtons.first();
  await expect(firstFAQ).toHaveAttribute('aria-expanded', 'false');
  await expect(firstFAQ).toHaveAttribute('aria-controls', 'faq-1-content');
  
  // Test keyboard navigation and activation
  await firstFAQ.focus();
  await expect(firstFAQ).toBeFocused();
  
  // Press Enter to expand FAQ
  await firstFAQ.press('Enter');
  await expect(firstFAQ).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-1-content')).toBeVisible();
  
  // Press Space to collapse FAQ
  await firstFAQ.press(' ');
  await expect(firstFAQ).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-1-content')).toBeHidden();
  
  // Test mouse click functionality
  await firstFAQ.click();
  await expect(firstFAQ).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-1-content')).toBeVisible();
  
  // Check icon rotation
  const icon = firstFAQ.locator('svg');
  const transform = await icon.evaluate(el => el.style.transform);
  expect(transform).toContain('180deg');
  
  // Test that FAQ content is readable
  await expect(page.locator('#faq-1-content')).toContainText('Often within a day after intake');
});

test('FAQ content matches PRD requirements', async ({ page }) => {
  await page.goto('/');
  
  // Check key FAQ questions from PRD seeds are present
  await expect(page.locator('text="How fast can we go live?"')).toBeVisible();
  await expect(page.locator('text="Does this replace our team?"')).toBeVisible();
  await expect(page.locator('text="What happens to our existing phone number?"')).toBeVisible();
  await expect(page.locator('text="How does pricing work?"')).toBeVisible();
  
  // Verify we have 8 FAQs (within 6-8 requirement)
  const faqButtons = page.locator('[data-faq-toggle]');
  await expect(faqButtons).toHaveCount(8);
});