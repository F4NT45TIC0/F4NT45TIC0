import { C, doc, chromeGradient, holoGradient, chamfer, round1, BLINK_CSS } from '../lib/svg.mjs';
import { textPath, richLine, createAtlas, atlasDefs } from '../lib/text.mjs';

const W = 1200;
const PAD = 48;
const TOP = 100;
const LINE_H = 38;

function windowButtons() {
  const x = W - 150;
  const box = (i) => `<path d="${chamfer(x + i * 40, 12, 28, 22, 6)}" fill="${C.void}" fill-opacity=".85"/>`;
  return [
    box(0), box(1), box(2),
    `<path d="M${x + 8} 28H${x + 20}" stroke="${C.text}" stroke-width="2"/>`,
    `<rect x="${x + 48}" y="17" width="12" height="12" fill="none" stroke="${C.text}" stroke-width="2"/>`,
    `<path d="M${x + 88} 17L${x + 100} 29M${x + 100} 17L${x + 88} 29" stroke="${C.text}" stroke-width="2"/>`,
  ].join('');
}

export function about({ title, lines, alt }) {
  const H = TOP + (lines.length - 1) * LINE_H + 44;
  const head = textPath(title, { font: 'display', size: 14, x: PAD, y: 29, tracking: 3 });
  const atlas = createAtlas();
  let last = { width: 0, y: TOP };
  const rows = lines.map((segments, i) => {
    const y = TOP + i * LINE_H;
    const row = richLine(segments, { font: 'mono', size: 20, x: PAD, y, atlas });
    if (row.width > W - 2 * PAD) throw new Error(`about line ${i} overflows (${Math.round(row.width)}px)`);
    last = { width: row.width, y };
    return row.parts.map((p) => `<g fill="${C[p.fill ?? 'text']}">${p.svg}</g>`).join('');
  }).join('\n');

  const defs = chromeGradient('chromeBar', { dir: 'h', soft: true }) + holoGradient('holo') + atlasDefs(atlas);
  const body = `<path d="${chamfer(1, 1, W - 2, H - 2, 18)}" fill="${C.panel}" stroke="url(#holo)" stroke-width="2"/>
<path d="M19 2H${W - 2}V44H2V19Z" fill="url(#chromeBar)"/>
<path d="${head.d}" fill="${C.void}"/>
${windowButtons()}
${rows}
<rect class="blink" x="${round1(PAD + last.width + 6)}" y="${last.y - 18}" width="12" height="22" fill="${C.cyan}"/>`;
  return doc({ w: W, h: H, title: alt, defs, css: BLINK_CSS, body });
}
