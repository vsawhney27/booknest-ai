import { test, expect } from '@playwright/test';

test.describe('SEO & Metadata Validation', () => {
  test('should have all required meta tags', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');
    
    // Basic meta tags
    await expect(page).toHaveTitle('BookNest AI - Never Miss a Call. Book More Appointments.');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /BookNest AI answers every call/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /AI phone answering/);
    
    // Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /BookNest AI/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /BookNest AI answers every call/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.svg/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    
    // Twitter tags
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /BookNest AI/);
    
    // Structured data
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain('"@type": "SoftwareApplication"');
    expect(jsonLd).toContain('"name": "BookNest AI"');
    
    // Canonical URL
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://booknest.ai/');
  });

  test('should have proper favicon setup', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute('href', 'favicon.png');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', 'favicon.png');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', 'site.webmanifest');
  });

  test('should have accessible robots.txt and sitemap.xml', async ({ request }) => {
    // Test robots.txt
    const robotsResponse = await request.get('http://localhost:3000/robots.txt');
    expect(robotsResponse.status()).toBe(200);
    const robotsContent = await robotsResponse.text();
    expect(robotsContent).toContain('User-agent: *');
    expect(robotsContent).toContain('Sitemap: https://booknest.ai/sitemap.xml');
    
    // Test sitemap.xml
    const sitemapResponse = await request.get('http://localhost:3000/sitemap.xml');
    expect(sitemapResponse.status()).toBe(200);
    const sitemapContent = await sitemapResponse.text();
    expect(sitemapContent).toContain('<loc>https://booknest.ai/</loc>');
    expect(sitemapContent).toContain('<changefreq>weekly</changefreq>');
  });

  test('should have web manifest for PWA support', async ({ request }) => {
    const manifestResponse = await request.get('http://localhost:3000/site.webmanifest');
    expect(manifestResponse.status()).toBe(200);
    const manifestContent = await manifestResponse.text();
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.name).toBe('BookNest AI');
    expect(manifest.short_name).toBe('BookNest');
    expect(manifest.theme_color).toBe('#0E7C66');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons).toHaveLength(1);
  });
});