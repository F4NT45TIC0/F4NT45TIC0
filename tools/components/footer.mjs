import { C, doc, holoGradient, star, round1 } from '../lib/svg.mjs';
import { textPath } from '../lib/text.mjs';

const W = 1200;
const H = 64;
const SPEED = 60;

export function footer(phrases, alt) {
  let x = 0;
  let unit = '';
  for (const p of phrases) {
    const t = textPath(p, { font: 'display', size: 16, x, y: 38, tracking: 3 });
    unit += `<path d="${t.d}"/><path d="${star(round1(x + t.width + 28), 32, 7)}" fill="url(#holo)"/>`;
    x += t.width + 56;
  }
  const unitW = round1(x);
  const copies = Math.ceil(W / unitW) + 1;
  const strip = Array.from({ length: copies }, (_, i) => `<use href="#unit" x="${round1(i * unitW)}"/>`).join('');
  const css = `.marquee{animation:marquee ${round1(unitW / SPEED)}s linear infinite}@keyframes marquee{to{transform:translateX(-${unitW}px)}}`;
  const defs = holoGradient('holo')
    + `<g id="unit" fill="${C.dim}">${unit}</g>`
    + `<clipPath id="band"><rect y="10" width="${W}" height="${H - 20}"/></clipPath>`
    + `<linearGradient id="fadeGrad"><stop offset="0" stop-color="#000"/><stop offset=".06" stop-color="#fff"/><stop offset=".94" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`
    + `<mask id="fade"><rect width="${W}" height="${H}" fill="url(#fadeGrad)"/></mask>`;
  const body = `<rect width="${W}" height="${H}" rx="12" fill="${C.void}"/>
<rect x="12" y="8" width="${W - 24}" height="2" fill="url(#holo)"/>
<rect x="12" y="${H - 10}" width="${W - 24}" height="2" fill="url(#holo)"/>
<g clip-path="url(#band)" mask="url(#fade)"><g class="marquee">${strip}</g></g>`;
  return doc({ w: W, h: H, title: alt, defs, css, body });
}
