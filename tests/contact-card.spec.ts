import { test, expect } from '@playwright/test';

test('Contact section has white heading, no giant icons, and visible form', async ({ page }) => {
  await page.goto('/');
  const contact = page.locator('#contact');
  await expect(contact).toBeVisible();

  // Title is white
  const title = contact.locator('.section-title');
  const color = await title.evaluate(el => getComputedStyle(el).color);
  expect(color).toBe('rgb(255, 255, 255)');

  // No giant icons
  const giants = await contact.locator('svg, img').evaluateAll(nodes =>
    nodes.some(n => {
      const r = n.getBoundingClientRect();
      return r.width > 160 || r.height > 160;
    })
  );
  expect(giants).toBeFalsy();

  // Form present
  const inputs = contact.locator('form#contact-form input');
  await expect(inputs).toHaveCount(5); // name, phone, email, company, checkbox
});