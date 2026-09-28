import { chromium, expect } from 'playwright/test';
const browser = await chromium.launch();
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let fail = true;
    let musicRequests = 0;
    await page.route('https://itunes.apple.com/**', route => { musicRequests++; return route.fulfill({status: fail ? 503 : 200, contentType:'application/json', body: fail ? '{}' : JSON.stringify({results:[{previewUrl:base+'/test-audio.mp3',trackViewUrl:'https://music.apple.com/'}]})}); });
    await page.goto(base);
    await expect(page.getByRole("button", {name:"Load music previews"})).toBeVisible();
    expect(musicRequests).toBe(0);
    await page.getByRole("button", {name:"Load music previews"}).click();
    await expect(page.getByRole('button', {name:'Retry song preview'})).toBeVisible();
    await expect(page.getByRole('button', {name:'Play song', exact:true})).toBeDisabled();
    // Empty search results must also stop loading and offer recovery.
    await page.route('https://itunes.apple.com/**', route => route.fulfill({status:200, contentType:'application/json',body:'{"results":[]}'}));
    await page.getByRole('button', {name:'Retry song preview'}).click();
    await expect(page.getByRole('button', {name:'Retry song preview'})).toBeVisible();
    await page.unroute('https://itunes.apple.com/**');
    fail = false;
    await page.route('https://itunes.apple.com/**', route => route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({results:[{previewUrl:base+'/test-audio.mp3'}]})}));
    // Keep media pending so this test isolates successful search recovery.
    await page.route('**/test-audio.mp3', () => {});
    await page.getByRole('button', {name:'Retry song preview'}).click();
    await expect(page.getByRole('button', {name:'Play song', exact:true})).toBeEnabled();
    if (width === 390) {
      await page.locator('.mobile-nav summary').click();
      await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Projects',exact:true}).click();
      await expect(page.locator('.mobile-nav')).not.toHaveAttribute('open');
      await page.locator('.mobile-nav summary').click();
      await page.keyboard.press('Escape');
      await expect(page.locator('.mobile-nav')).not.toHaveAttribute('open');
      await expect(page.locator('.mobile-nav summary')).toBeFocused();
    }
    await page.getByLabel('YOUR NAME').fill('   ');
    await page.getByLabel('YOUR EMAIL').fill('visitor@example.com');
    await page.getByLabel('MESSAGE *',{exact:true}).fill('Hello & welcome?');
    await page.getByRole('button',{name:'COPY MESSAGE',exact:true}).click();
    await expect(page.getByLabel('YOUR NAME')).toBeFocused();
    await page.getByLabel('YOUR NAME').fill('Test Visitor');
    await page.evaluate(() => { window.copiedText = ''; Object.defineProperty(navigator, 'clipboard', { configurable:true, value:{writeText: async text => {window.copiedText = text;}}}); });
    await page.getByRole('button',{name:'COPY MESSAGE',exact:true}).click();
    await expect(page.getByRole('status')).toContainText('Message copied');
    expect(await page.evaluate(() => window.copiedText)).toContain('Hello & welcome?');
    await page.evaluate(() => { navigator.clipboard.writeText = async () => {throw new Error('Denied');}; });
    await page.getByRole('button',{name:'COPY MESSAGE',exact:true}).click();
    await expect(page.getByRole('status')).toContainText('Clipboard access is unavailable');
    await expect(page.getByLabel('MESSAGE *',{exact:true})).toHaveValue('Hello & welcome?');
    await page.locator('#contact').screenshot({path:`/tmp/portfolio-screenshots/contact-${width}.png`});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
    expect(errors).toEqual([]);
    await page.close();
  }
  console.log('Music failure/recovery, mobile navigation, and contact fallback checks passed at both widths.');
} finally { await browser.close(); }
