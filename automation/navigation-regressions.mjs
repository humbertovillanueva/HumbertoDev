import {chromium,expect} from 'playwright/test';
const b=await chromium.launch();const base=process.env.PREVIEW_URL||'http://localhost:3055';
try {
 for(const era of ['1986','2000','2026']) {
  const p=await b.newPage({viewport:{width:390,height:700},reducedMotion:'reduce'});
  await p.goto(base);await p.getByLabel('Choose website year').selectOption(era);
  const anchors=await p.locator('a[href^="#"]:visible').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
  for(const anchor of anchors){expect(await p.locator(anchor).evaluate(el=>el.getBoundingClientRect().height>0),`${era} ${anchor} visible target`).toBe(true)}
  await p.locator('.game-footer a[href="#top"]').click();await expect.poll(()=>p.evaluate(()=>scrollY)).toBeLessThan(5);
  await p.goto(base+'/projects');await p.locator('.preview-open').first().click();
  await p.locator('dialog[open] .preview-image-scroll').focus();await p.keyboard.press('ArrowRight');
  await expect.poll(()=>p.locator('dialog[open] .preview-image-scroll').evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
  await p.keyboard.press('Escape');await expect(p.locator('.preview-open').first()).toBeFocused();
  await p.close();
 }
 const p=await b.newPage({viewport:{width:568,height:260}});await p.goto(base);await p.getByLabel('Choose website year').selectOption('2000');await p.locator('.desktop-start summary').click();expect((await p.locator('.desktop-start nav').boundingBox()).y).toBeGreaterThanOrEqual(0);await p.close();
 console.log('Visible anchor destinations, back to top, screenshot keyboard scrolling, focus return and short-screen Start menu passed');
}finally{await b.close()}
