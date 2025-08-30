import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Let animations settle
  await page.screenshot({ path: 'final-contact.png' });
  await browser.close();
})();