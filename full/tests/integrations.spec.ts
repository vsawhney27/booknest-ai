import { test, expect } from '@playwright/test';

test('integrations grid renders 6 cards with local brand logos', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#solutions');
  await expect(section).toBeVisible();
  
  const cards = section.locator('.integration-card');
  await expect(cards).toHaveCount(6);
  
  // Check each card has an img.brand element with local SVG src
  const expectedLogos = [
    'assets/brands/googlecalendar.svg',
    'assets/brands/microsoftoutlook.svg', 
    'assets/brands/hubspot.svg',
    'assets/brands/salesforce.svg',
    'assets/brands/slack.svg',
    'assets/brands/zendesk.svg'
  ];
  
  for (let i = 0; i < expectedLogos.length; i++) {
    const card = cards.nth(i);
    const logo = card.locator('img.brand');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', expectedLogos[i]);
    await expect(logo).toHaveAttribute('loading', 'lazy');
  }
  
  // Check licensing note is present
  const licensingNote = section.locator('text=Company logos are trademarks');
  await expect(licensingNote).toBeVisible();
});