import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
const projects = JSON.parse(readFileSync('app/projects.json', 'utf8'));
const browser = await chromium.launch();
mkdirSync('/tmp/portfolio-screenshots', {recursive: true});
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({viewport: {width, height: 1000}, reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:3000', {waitUntil:'networkidle'});
    // The football game now lives behind a launcher on /about; automation/game-launcher.mjs covers it.
    for (const project of projects.filter(item => item.repo)) {
      const card = page.locator('.game-cartridge').filter({has: page.getByRole('heading', {name:project.title, exact:true})});
      if (await card.count() !== 1) throw new Error('Missing or duplicate card: ' + project.title);
      await card.scrollIntoViewIfNeeded();
      if (!(await card.innerText()).includes(project.text)) throw new Error('Missing project description');
      if (['reality-commit', 'dispatchtrack-demo', 'aws-cloud-quest.'].includes(project.repo) && await card.getByRole('link', {name:'Try the demo'}).count() !== 1) throw new Error('Missing live demo link');
      if (project.repo) {
        const link = card.getByRole('link', {name:'View source code'});
        if (await link.getAttribute('href') !== `https://github.com/humbertovillanueva/${project.repo}`) throw new Error('Incorrect source link');
      }
    }
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)) throw new Error('Horizontal overflow');
    await page.locator('#work').screenshot({path:`/tmp/portfolio-screenshots/projects-${width}.png`});
    if (errors.length) throw new Error(errors.join('\n'));
    await page.goto((process.env.PREVIEW_URL || 'http://127.0.0.1:3000') + '/projects', {waitUntil:'networkidle'});
    for (const project of projects) {
      if (await page.getByRole('heading', {name:project.title, exact:true}).count() !== 1) throw new Error('Missing Projects-page entry');
    }
    if (errors.length) throw new Error(errors.join('\n'));
    await page.close();
  }
  console.log('Homepage project cards, demo and source links, overflow, and Projects page entries passed.');
} finally { await browser.close(); }
