import { chromium, expect } from 'playwright/test';
const base=process.env.PREVIEW_URL || 'http://localhost:3032';
const browser=await chromium.launch();
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(base);
  for(const route of ['/about','/projects','/experience','/writing']) {
   await page.locator(`.game-footer a[href="${route}"]`).click();
   await expect(page).toHaveURL(base+route);
   await page.locator('.seo-home-link').click();
  }
  for(const route of ['/case-studies/reality-commit','/case-studies/dispatchtrack-lite']) {
   await page.locator(`a[href="${route}"]`).first().click();
   await expect(page).toHaveURL(base+route);
   await page.locator('.seo-home-link').click();
  }
  await page.locator('.game-footer a[href="/writing"]').click();
  await page.locator('a[href="/writing/designing-portable-ai-integrations"]').first().click();
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('.seo-home-link').click();
  for(const route of ['/','/projects']) {
   await page.goto(base+route);
   for(const trigger of await page.locator('.preview-open').all()) {
    await trigger.click();
    const dialog=page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button',{name:'CLOSE ×'})).toBeFocused();
    await expect(dialog.locator('img')).toHaveJSProperty('complete',true);
    expect(await dialog.locator('img').evaluate(image=>image.naturalWidth)).toBeGreaterThan(0);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.locator('dialog[open]').getByRole('button',{name:'CLOSE ×'}).click();
    await expect(trigger).toBeFocused();
   }
  }
  await page.goto(base);
  console.log({width,homepageHeight:await page.evaluate(()=>document.body.scrollHeight)});
  await page.close();
 }
 console.log('All eight pages reached through navigation; screenshot viewers open, close and restore keyboard focus.');
} finally {await browser.close()}
