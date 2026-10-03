import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const paths = ['/', '/about', '/projects', '/experience', '/writing', '/writing/designing-portable-ai-integrations', '/writing/make-document-pipelines-fail-loudly', '/case-studies/dispatchtrack-lite', '/case-studies/reality-commit'];
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of paths) {
      const response = await page.goto(base+path, {waitUntil:'domcontentloaded',timeout:60000});
      expect(response.status()).toBe(200);
      await expect(page.locator('h1:visible')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${path} overflows at ${width}px`).toBe(true);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://humbertovillanueva.dev${path === '/' ? '' : path}`);
      for (const image of await page.locator('img:visible').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete',true);
        expect(await image.evaluate(el=>el.naturalWidth)).toBeGreaterThan(0);
      }
      if (width === 390) {
        const audit = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        expect(audit.violations.map(v => ({id:v.id, targets:v.nodes.map(n=>n.target)})), `Accessibility on ${path}`).toEqual([]);
      }
      if (width === 390 || width === 1440) await page.screenshot({path:`/tmp/portfolio-screenshots/page-${path.replaceAll('/','-')||'home'}-${width}.png`,fullPage:true});
    }
    const missing = await page.goto(base+'/this-page-does-not-exist');
    expect(missing.status()).toBe(404);
    await expect(page.getByRole('link',{name:'Return home'})).toBeVisible();
    expect(errors).toEqual([]);
    await context.close();
  }
  console.log('Eight pages passed at four widths; images, canonical links, headings, and 404 recovery verified.');
} finally {await browser.close();}
