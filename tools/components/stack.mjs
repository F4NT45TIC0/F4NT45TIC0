import { C, doc, chromeGradient, chamfer, round1 } from '../lib/svg.mjs';
import { textUse, measure, createAtlas, atlasDefs } from '../lib/text.mjs';

const W = 1200;
const PAD = 48;
const CHIP_H = 44;
const GAP = 14;
const ROW_H = 58;
const TOP = 24;
const FONT = { font: 'monoBold', size: 18, tracking: 1 };

export function stack(items, alt) {
  const chips = items.map((t) => ({ t, w: measure(t, FONT) + 40 }));
  const rows = [[]];
  let used = 0;
  for (const c of chips) {
    const need = (rows.at(-1).length ? GAP : 0) + c.w;
    if (used + need > W - 2 * PAD) {
      rows.push([c]);
      used = c.w;
    } else {
      rows.at(-1).push(c);
      used += need;
    }
  }

  const atlas = createAtlas();
  const H = TOP * 2 + rows.length * ROW_H - (ROW_H - CHIP_H);
  let frames = '';
  let labels = '';
  rows.forEach((row, i) => {
    const rowW = row.reduce((a, c) => a + c.w, 0) + GAP * (row.length - 1);
    let x = (W - rowW) / 2;
    const y = TOP + i * ROW_H;
    for (const c of row) {
      frames += `<path d="${chamfer(round1(x), y, round1(c.w), CHIP_H, 10)}" fill="url(#chrome)"/>`;
      labels += textUse(c.t, { ...FONT, atlas, x: x + 20, y: y + 29 }).svg;
      x += c.w + GAP;
    }
  });

  const defs = chromeGradient('chrome', { soft: true }) + atlasDefs(atlas);
  const body = `<rect width="${W}" height="${H}" rx="18" fill="${C.void}"/>
<g stroke="#fff" stroke-opacity=".45">${frames}</g>
<g fill="${C.void}">${labels}</g>`;
  return doc({ w: W, h: H, title: alt, defs, body });
}
