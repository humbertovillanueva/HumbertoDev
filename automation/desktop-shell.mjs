import { chromium, expect } from 'playwright/test';
const browser = await chromium.launch();
const base = process.env.PREVIEW_URL || 'http://localhost:3053';
try {
 for (const width of [390,1440]) {
  const page = await browser.newPage({viewport:{width,height:950}});
  await page.goto(base);
  await page.getByLabel('Choose website year').selectOption('2000');
  await page.locator('.desktop-start summary').click();
  await expect(page.getByRole('navigation',{name:'Start menu'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation',{name:'Start menu'})).toBeHidden();
  await page.locator('.desktop-start summary').click();
  await page.getByRole('navigation',{name:'Start menu'}).getByRole('link',{name:'About Humberto'}).click();
  await expect(page).toHaveURL(base+'/about');
  await expect(page.getByRole('navigation',{name:'Start menu'})).toBeHidden();
  for(const era of ['2000','2026','1986']) {
   await page.getByLabel('Choose website year').selectOption(era);
   for(const route of ['/about','/writing/designing-portable-ai-integrations']) {
    await page.goto(base+route);
    const portrait=page.locator('img[alt*="Humberto"]');
    if(era==='1986') await expect(portrait).toBeVisible(); else await expect(portrait).toBeHidden();
   }
  }
  await page.getByLabel('Choose website year').selectOption('2000');
  await page.goto(base);
  await page.screenshot({path:`/tmp/desktop-new-${width}.png`});
  await page.close();
  console.log(width,'Start menu, navigation and portrait visibility passed');
 }
} finally { await browser.close(); }
