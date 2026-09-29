import { chromium, expect } from 'playwright/test';
const browser = await chromium.launch();
try {
 for (const width of [320,390,1440]) {
  const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(process.env.PREVIEW_URL || 'http://localhost:3022');
  const launcher=page.getByRole('button',{name:/PLAY A QUICK MATCH/});
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await launcher.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#pitch')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(launcher).toBeFocused();
  await page.locator('.header-cta').click();
  await page.waitForTimeout(100);
  const gap=await page.evaluate(()=>document.querySelector('#contact').getBoundingClientRect().top-document.querySelector('.game-header').getBoundingClientRect().bottom);
  expect(gap).toBeGreaterThanOrEqual(0);
  await page.close();
 }
 console.log('Game launcher, keyboard focus, escape, responsive width and contact anchor passed.');
} finally {await browser.close();}
