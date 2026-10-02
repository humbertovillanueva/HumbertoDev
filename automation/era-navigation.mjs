import { chromium, expect } from 'playwright/test';
const browser = await chromium.launch();
const base = process.env.PREVIEW_URL || 'http://localhost:3051';
try {
  for (const era of ['1986', '2000', '2026']) {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '/about');
      await page.getByLabel('Choose website year').selectOption(era);
      await page.getByRole('button', { name: 'PLAY A QUICK MATCH' }).click();
      await expect(page.locator('.soccer-dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      for (const [label, path] of [['Projects','/projects'],['Experience','/experience'],['Writing','/writing'],['About','/about']]) {
        await page.getByRole('navigation', {name:'Portfolio pages'}).getByRole('link', {name:label,exact:true}).click();
        await expect(page).toHaveURL(base + path);
        await expect(page.locator('html')).toHaveAttribute('data-era',era);
      }
      await page.getByRole('navigation', {name:'Portfolio pages'}).getByRole('link', {name:'Contact',exact:true}).click();
      await expect(page.locator('#contact')).toBeInViewport();
      await expect(page.locator('html')).toHaveAttribute('data-era',era);
      await page.goto(base + '/missing-page');
      await expect(page.getByRole('heading', {name:'OFF THE PITCH'})).toBeVisible();
      await page.getByRole('link', {name:'Return home'}).click();
      await expect(page).toHaveURL(base + '/');
      await expect(page.locator('html')).toHaveAttribute('data-era',era);
      await page.screenshot({path:`/tmp/final-${era}-${width}.png`});
      expect(errors).toEqual([]);
      await page.close();
      console.log(era, width, 'navigation, game dialog, contact and 404 passed');
    }
  }
} finally { await browser.close(); }
