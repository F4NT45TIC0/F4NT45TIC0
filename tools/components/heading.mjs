import { C, doc, chromeGradient, holoGradient, star, round1, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath } from '../lib/text.mjs';

const W = 1200;
const H = 92;

export function heading(label, alt, detail = '') {
  const t = textPath(label, { font: 'display', size: 24, x: 92, y: 53, tracking: 3 });
  const meta = detail ? textPath(detail, { font: 'monoBold', size: 14, x: 846, y: 54, tracking: 1 }) : null;
  const lineX = round1(92 + t.width + 25);
  const defs = chromeGradient('chrome') + holoGradient('holo');
  const body = `<rect width="${W}" height="${H}" rx="16" fill="${C.panel}"/>
<path d="M21 1H1179M21 91H1179" stroke="url(#holo)" stroke-opacity=".64"/>
<rect x="22" y="17" width="5" height="58" fill="url(#holo)"/>
<path d="${star(60, 46, 17)}" fill="url(#holo)"/>
<path d="${t.d}" fill="url(#chrome)"/>
<rect x="${lineX}" y="45" width="${round1(Math.max(0, 800 - lineX))}" height="2" fill="url(#holo)"/>
${meta ? `<path d="${meta.d}" fill="${C.cyan}"/>` : ''}
<path class="tw" d="${star(W - 37, 46, 11)}" fill="url(#holo)"/>`;
  return doc({ w: W, h: H, title: alt, defs, css: TWINKLE_CSS, body });
}
