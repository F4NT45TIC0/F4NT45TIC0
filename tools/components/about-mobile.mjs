import { C, doc, chromeGradient, holoGradient, chamfer, star } from '../lib/svg.mjs';
import { textPath, textUse, createAtlas, atlasDefs } from '../lib/text.mjs';

const W = 600;
const H = 318;

export function aboutMobile({ mobile, alt }) {
  const atlas = createAtlas();
  const title = textPath('ABOUT / FELIPE', { font: 'display', size: 30, x: 28, y: 52, tracking: 1 });
  if (title.width > 485) throw new Error('mobile about title overflows');
  const lines = mobile.map((line, i) => {
    const t = textUse(line, { atlas, font: i === 0 ? 'monoBold' : 'mono', size: 21, x: 31, y: 121 + i * 39 });
    if (t.width > 536) throw new Error(`mobile about line ${i} overflows`);
    return t.svg;
  }).join('');
  const note = textUse('FULL-STACK  X  DESIGN', { atlas, font: 'monoBold', size: 16, x: 31, y: 289, tracking: 2 });
  const defs = chromeGradient('chrome', { soft: true }) + holoGradient('holo') + atlasDefs(atlas);
  const body = `<path d="${chamfer(1, 1, W - 2, H - 2, 17)}" fill="${C.panel}" stroke="url(#holo)" stroke-width="2"/>
<path d="M20 1H212" stroke="url(#holo)" stroke-width="5"/>
<path d="${title.d}" fill="url(#chrome)"/>
<path d="${star(548, 45, 17)}" fill="${C.cyan}"/>
<path d="M30 72H570" stroke="url(#holo)" stroke-opacity=".7"/>
<path d="M30 90V250" stroke="${C.cyan}" stroke-opacity=".48"/>
<g fill="${C.text}">${lines}</g>
<path d="M30 263H570" stroke="${C.dim}" stroke-opacity=".38"/>
<g fill="${C.cyan}">${note.svg}</g>`;
  return doc({ w: W, h: H, title: alt, defs, body });
}
