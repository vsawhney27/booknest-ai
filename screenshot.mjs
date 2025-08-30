import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173');
  await page.locator('#faqs').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'faq-screenshot.png' });
  await browser.close();
})();