import { C, doc, chromeGradient, holoGradient, chamfer, star, round1, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath, textUse, measure, createAtlas, atlasDefs } from '../lib/text.mjs';

export const CARD_W = 600;
export const CARD_H = 260;
const PAD = 32;
const MAX = CARD_W - 2 * PAD;
const TAG_COLOR = { LIVE: C.signal, PRIVATE: C.pink, REPO: C.cyan };

function fit(width, what) {
  if (width > MAX) throw new Error(`${what} overflows (${Math.round(width)}px > ${MAX}px)`);
}

export function cardAlt(c) {
  return `${c.indexTitle ?? c.title} — ${c.pitch.join(' ')} (${c.chips.join(', ')})`;
}

export function card(c, index) {
  const tagColor = TAG_COLOR[c.tag];
  if (!tagColor) throw new Error(`unknown tag "${c.tag}"`);
  if (c.pitch.length > 2) throw new Error(`card "${c.title}" takes at most 2 pitch lines`);

  const atlas = createAtlas();
  const label = textUse(`PROJECT_0${index + 1}`, { atlas, font: 'mono', size: 13, x: PAD, y: 44, tracking: 2 });
  const tagW = measure(c.tag, { font: 'monoBold', size: 13, tracking: 2 });
  const tagX = round1(CARD_W - PAD - tagW - 24);
  const tag = textUse(c.tag, { atlas, font: 'monoBold', size: 13, x: tagX + 12, y: 44, tracking: 2 });

  const title = textPath(c.title, { font: 'display', size: 30, x: PAD, y: 104, tracking: 2 });
  fit(title.width + 40, `title "${c.title}"`);

  const pitch = c.pitch.map((text, i) => {
    const p = textUse(text, { atlas, font: 'mono', size: 18, x: PAD, y: 146 + i * 28 });
    fit(p.width, `pitch line "${text}"`);
    return p.svg;
  }).join('');

  let x = PAD;
  let frames = '';
  let labels = '';
  for (const chip of c.chips) {
    const t = textUse(chip, { atlas, font: 'mono', size: 14, x: x + 12, y: 225 });
    const w = t.width + 24;
    frames += `<path d="${chamfer(round1(x), 204, round1(w), 30, 7)}"/>`;
    labels += t.svg;
    x += w + 10;
  }
  fit(x - 10 - PAD, `chips of "${c.title}"`);

  const defs = chromeGradient('chrome') + holoGradient('holo') + atlasDefs(atlas);
  const body = `<path d="${chamfer(1, 1, CARD_W - 2, CARD_H - 2, 16)}" fill="${C.panel}" stroke="url(#holo)" stroke-width="2"/>
<g fill="${C.dim}">${label.svg}</g>
<path d="${chamfer(tagX, 25, round1(tagW + 24), 26, 6)}" fill="none" stroke="${tagColor}"/>
<g fill="${tagColor}">${tag.svg}</g>
<path d="${title.d}" fill="url(#chrome)"/>
<g fill="${C.text}">${pitch}</g>
<g fill="none" stroke="${C.cyan}" stroke-opacity=".6">${frames}</g>
<g fill="${C.dim}">${labels}</g>
<path class="tw" d="${star(CARD_W - 40, 93, 9)}" fill="url(#holo)"/>`;
  return doc({ w: CARD_W, h: CARD_H, title: cardAlt(c), defs, css: TWINKLE_CSS, body });
}
