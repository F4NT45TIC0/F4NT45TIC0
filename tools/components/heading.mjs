import { C, doc, chromeGradient, holoGradient, star, round1, BLINK_CSS, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath } from '../lib/text.mjs';

const W = 1200;
const H = 72;

export function heading(label, alt) {
  const t = textPath(label, { font: 'display', size: 22, x: 24, y: 46, tracking: 4 });
  const cursorX = round1(24 + t.width + 10);
  const lineX = cursorX + 30;
  const defs = chromeGradient('chrome') + holoGradient('holo');
  const body = `<rect width="${W}" height="${H}" rx="12" fill="${C.void}"/>
<path d="${t.d}" fill="url(#chrome)"/>
<rect class="blink" x="${cursorX}" y="26" width="14" height="22" fill="${C.cyan}"/>
<rect x="${lineX}" y="36" width="${round1(W - lineX - 56)}" height="2" fill="url(#holo)"/>
<path class="tw" d="${star(W - 30, 37, 10)}" fill="url(#holo)"/>`;
  return doc({ w: W, h: H, title: alt, defs, css: BLINK_CSS + TWINKLE_CSS, body });
}
