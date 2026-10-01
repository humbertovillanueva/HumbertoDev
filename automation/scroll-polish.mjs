import { chromium, expect } from 'playwright/test';
const browser=await chromium.launch();
const base=process.env.PREVIEW_URL || 'http://localhost:3034';
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(base);
  for(const id of ['work','experience','skills','about','contact','skills','work']) {
   await page.locator('#'+id).evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-90));
   await expect(page.locator(`.game-header a[href="#${id}"]`).first()).toHaveAttribute('aria-current','location');
  }
  await page.evaluate(()=>window.scrollTo(0,0));
  await expect(page.locator('.game-header [aria-current]')).toHaveCount(0);
  await page.locator('.preview-open').first().click();
  const hint=page.locator('dialog[open] .preview-swipe-hint');
  if(width===390) await expect(hint).toBeVisible(); else await expect(hint).toBeHidden();
  await page.keyboard.press('Escape');
  const reduced=await page.locator('h1 span').evaluate(el=>getComputedStyle(el,'::after').animationName);
  expect(reduced).toBe('none');
  await page.emulateMedia({reducedMotion:'no-preference'});
  const shine=await page.locator('h1 span').evaluate(el=>({duration:getComputedStyle(el,'::after').animationDuration,delay:getComputedStyle(el,'::after').animationDelay}));
  expect(shine).toEqual({duration:'6s',delay:'0s'});
  await page.close();
 }
 console.log('Scroll indicators, mobile swipe hint, shine timing and reduced motion passed.');
} finally {await browser.close()}
