import { test, expect } from '@playwright/test';

test('contact form validates and can submit (mock)', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'Interested in a demo');
  // If fetch used, you can route it. For static demo, just ensure the handler is wired:
  await page.getByRole('button', { name: /Submit|Send/i }).click();
  await expect(page.getByText(/Thank you|We received/i)).toBeVisible();
});