// Renders the 9 validation frames (desktop 1440 only; mobile is out of scope for this round) under identical conditions.
// Usage: node design-explorations-2/tools/render-frames.cjs   (uses the preinstalled Playwright + Chromium)
// Output: frames/<dir>-<A|B|C>.png (first screen at the frame viewport) and frames/full/<...>.png (full page),
//         and frames/render-log.json. Side-by-side sheets: python3 design-explorations-2/tools/compose.py
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'frames');
fs.mkdirSync(path.join(OUT, 'full'), { recursive: true });
const FRAMES = [
  ['A', 'm1-0', 1440, 900],
  ['B', 'm2-1', 1440, 900],
  ['C', 'm6-2-1', 1440, 900],
];
const DIRS = ['t1', 't2', 't3'];
(async () => {
  const opts = process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {};
  const browser = await chromium.launch(opts);
  const log = [];
  for (const [f, screen, w, h] of FRAMES) {
    for (const d of DIRS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      const errs = [];
      p.on('pageerror', e => errs.push(e.message));
      await p.goto('file://' + path.join(ROOT, d, screen + '.html') + '?frame', { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      const info = await p.evaluate((H) => {
        const fonts = [...document.fonts].filter(x => x.status === 'loaded').map(x => x.family).filter((v, i, a) => a.indexOf(v) === i);
        // share of the first screen covered by product imagery (photos only, not drawings)
        let img = 0;
        document.querySelectorAll('.imgbox').forEach(el => { const r = el.getBoundingClientRect(); const t = Math.max(r.top, 0), b = Math.min(r.bottom, H); if (b > t && r.width > 0) img += (b - t) * Math.min(r.width, innerWidth); });
        const photosAbove = [...document.querySelectorAll('.imgbox')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.top < H && r.bottom > 0; }).length;
        const area = [...document.querySelectorAll('a,div,span,b')].find(el => /^(Giao tới)/.test(el.textContent.trim()) && el.getBoundingClientRect().width > 0);
        const ar = area ? area.getBoundingClientRect() : null;
        const smallest = Math.min(...[...document.querySelectorAll('body *')].filter(el => el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && el.getBoundingClientRect().width > 0 && !el.closest('.ill-badge,.logo-off')).map(el => parseFloat(getComputedStyle(el).fontSize)));
        return { fonts, hscroll: document.documentElement.scrollWidth > innerWidth, imgShare: Math.round(100 * img / (innerWidth * H)), photosAbove, areaTop: ar ? Math.round(ar.top) : null, minFont: smallest, page: document.documentElement.scrollHeight };
      }, h);
      await p.screenshot({ path: path.join(OUT, `${d}-${f}.png`) });
      await p.screenshot({ path: path.join(OUT, 'full', `${d}-${f}.png`), fullPage: true });
      log.push({ frame: f, dir: d, screen, viewport: `${w}x${h}`, ...info, errors: errs });
      await ctx.close();
    }
  }
  fs.writeFileSync(path.join(OUT, 'render-log.json'), JSON.stringify(log, null, 1));
  for (const l of log) console.log(l.frame, l.dir, l.viewport, 'fonts=' + l.fonts.join('+'), 'img=' + l.imgShare + '%', 'photos=' + l.photosAbove, 'areaTop=' + l.areaTop, 'minFont=' + l.minFont, l.hscroll ? 'HSCROLL' : '', l.errors.length ? 'ERR ' + l.errors : '');
  await browser.close();
})();
