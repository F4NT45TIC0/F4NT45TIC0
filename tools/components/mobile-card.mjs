import { C, doc, chromeGradient, holoGradient, chamfer, star, round1 } from '../lib/svg.mjs';
import { textPath, textUse, measure, createAtlas, atlasDefs } from '../lib/text.mjs';
import { cardAlt } from './card.mjs';

const W = 600;
const H = 352;
const FEATURED = [C.cyan, C.pink, C.violet];

export function mobileCard(c, index) {
  const accent = c.featured ? FEATURED[index] : (c.tag === 'PRIVATE' ? C.pink : C.signal);
  const atlas = createAtlas();
  const label = textUse(c.featured ? `STARRED  /  0${index + 1} OF 03` : `SELECTED  /  0${index + 1}`, {
    atlas, font: 'monoBold', size: 19, x: 31, y: 50, tracking: 1,
  });
  const title = textPath(c.title, { font: 'display', size: 45, x: 30, y: 137, tracking: 1 });
  if (title.width > 538) throw new Error(`mobile title "${c.title}" overflows`);
  const pitch = c.pitch.map((line, i) => {
    const t = textUse(line, { atlas, font: 'mono', size: 20, x: 32, y: 189 + i * 34 });
    if (t.width > 535) throw new Error(`mobile pitch "${line}" overflows`);
    return t.svg;
  }).join('');
  let x = 30;
  let chips = '';
  for (const chip of c.chips) {
    const w = measure(chip, { font: 'mono', size: 17 }) + 24;
    const t = textUse(chip, { atlas, font: 'mono', size: 17, x: x + 12, y: 279 });
    chips += `<path d="${chamfer(round1(x), 252, round1(w), 38, 7)}" fill="${C.void}" stroke="${accent}" stroke-opacity=".72"/><g fill="${C.text}">${t.svg}</g>`;
    x += w + 9;
  }
  if (x > W - 18) throw new Error(`mobile chips of "${c.title}" overflow`);
  const visibility = textUse(c.tag === 'PRIVATE' ? 'PRIVATE PROJECT' : c.tag === 'LIVE' ? 'LIVE DEMO + SOURCE' : 'PUBLIC REPOSITORY', {
    atlas, font: 'monoBold', size: 17, x: 31, y: 325, tracking: 1,
  });
  const defs = chromeGradient('chrome', { soft: true }) + holoGradient('holo') + atlasDefs(atlas)
    + `<radialGradient id="glow"><stop stop-color="${accent}" stop-opacity=".21"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>`
    + `<clipPath id="clip"><path d="${chamfer(2, 2, W - 4, H - 4, 18)}"/></clipPath>`;
  const body = `<g clip-path="url(#clip)">
<rect width="${W}" height="${H}" fill="${C.panel}"/>
<ellipse cx="547" cy="32" rx="245" ry="190" fill="url(#glow)"/>
<path d="M0 1H216" stroke="url(#holo)" stroke-width="6"/>
<path d="M30 70H570" stroke="${accent}" stroke-opacity=".55"/>
<path d="${star(548, 110, 20)}" fill="${accent}"/>
<g fill="${accent}">${label.svg}</g>
<path d="${title.d}" fill="url(#chrome)"/>
<g fill="${C.text}">${pitch}</g>
${chips}
<g fill="${C.dim}">${visibility.svg}</g>
<path d="M520 29H570V79" fill="none" stroke="${accent}" stroke-width="2"/>
</g>
<path d="${chamfer(1, 1, W - 2, H - 2, 18)}" fill="none" stroke="${accent}" stroke-opacity=".7" stroke-width="2"/>`;
  return doc({ w: W, h: H, title: cardAlt(c), defs, body });
}
