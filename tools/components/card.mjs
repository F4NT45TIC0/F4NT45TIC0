import { C, doc, chromeGradient, holoGradient, chamfer, star, round1, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath, textUse, measure, createAtlas, atlasDefs } from '../lib/text.mjs';

export const CARD_W = 1200;
export const CARD_H = 198;
const TAG_COLOR = { LIVE: C.signal, PRIVATE: C.pink, REPO: C.cyan };

export function cardAlt(c) {
  return `${c.indexTitle ?? c.title} — ${c.pitch.join(' ')} (${c.chips.join(', ')})`;
}

export function card(c, index) {
  const accent = TAG_COLOR[c.tag];
  if (!accent) throw new Error(`unknown tag "${c.tag}"`);
  if (c.pitch.length > 2) throw new Error(`card "${c.title}" takes at most 2 pitch lines`);

  const atlas = createAtlas();
  const label = textUse(`PROJECT_0${index + 1}  /  SELECTED`, { atlas, font: 'monoBold', size: 14, x: 44, y: 39, tracking: 1 });
  const title = textPath(c.title, { font: 'display', size: 41, x: 44, y: 100, tracking: 2 });
  if (title.width > 665) throw new Error(`title "${c.title}" overflows`);
  const pitch = c.pitch.map((line, i) => {
    const t = textUse(line, { atlas, font: 'mono', size: 20, x: 46, y: 143 + i * 27 });
    if (t.width > 670) throw new Error(`pitch line "${line}" overflows`);
    return t.svg;
  }).join('');

  const tag = textUse(c.tag === 'PRIVATE' ? 'PRIVATE BUILD' : 'OPEN PROJECT', {
    atlas, font: 'monoBold', size: 16, x: 804, y: 54, tracking: 1,
  });
  let x = 804;
  let chips = '';
  for (const chip of c.chips) {
    const w = measure(chip, { font: 'mono', size: 13 }) + 18;
    const t = textUse(chip, { atlas, font: 'mono', size: 13, x: x + 9, y: 147 });
    chips += `<path d="${chamfer(round1(x), 125, round1(w), 31, 6)}" fill="${C.void}" stroke="${accent}" stroke-opacity=".74"/><g fill="${C.text}">${t.svg}</g>`;
    x += w + 6;
  }
  if (x > CARD_W - 20) throw new Error(`chips of "${c.title}" overflows`);

  const defs = chromeGradient('chrome', { soft: true }) + holoGradient('holo') + atlasDefs(atlas)
    + `<radialGradient id="glow"><stop stop-color="${accent}" stop-opacity=".19"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>`
    + `<clipPath id="clip"><path d="${chamfer(2, 2, CARD_W - 4, CARD_H - 4, 17)}"/></clipPath>`;
  const body = `<g clip-path="url(#clip)">
<rect width="${CARD_W}" height="${CARD_H}" fill="${C.panel}"/>
<ellipse cx="1030" cy="45" rx="300" ry="200" fill="url(#glow)"/>
<path d="M752 22V176" stroke="${accent}" stroke-opacity=".5"/>
<path d="M765 22V176" stroke="${accent}" stroke-opacity=".17"/>
<path d="M0 1H258" stroke="url(#holo)" stroke-width="5"/>
<g fill="${accent}">${label.svg}</g>
<path d="${title.d}" fill="url(#chrome)"/>
<g fill="${C.text}">${pitch}</g>
<g fill="${accent}">${tag.svg}</g>
<path d="M804 72H1145" stroke="${accent}" stroke-opacity=".56"/>
${chips}
<path class="tw" d="${star(1123, 100, 15)}" fill="${accent}"/>
<path d="M1167 20V72M1115 20H1167" fill="none" stroke="${accent}" stroke-width="2"/>
</g>
<path d="${chamfer(1, 1, CARD_W - 2, CARD_H - 2, 17)}" fill="none" stroke="${accent}" stroke-opacity=".62" stroke-width="2"/>`;
  return doc({ w: CARD_W, h: CARD_H, title: cardAlt(c), defs, css: TWINKLE_CSS, body });
}
