import { C, doc, chromeGradient, holoGradient, starfield, star, chamfer, round1, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath, measure } from '../lib/text.mjs';

const W = 1200;
const H = 360;
const HORIZON = 250;

const CSS = `${TWINKLE_CSS}
.shine{animation:shine 6s ease-in-out infinite}
@keyframes shine{0%{transform:translateX(0)}60%,100%{transform:translateX(1700px)}}
.scan{animation:scan 4s linear infinite}
@keyframes scan{from{transform:translateY(0);opacity:.9}to{transform:translateY(${H - HORIZON}px);opacity:0}}
.pulse{animation:pulse 1.6s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}`;

function grid() {
  let lines = '';
  for (let i = -14; i <= 14; i++) lines += `<line x1="${W / 2}" y1="${HORIZON - 60}" x2="${W / 2 + i * 130}" y2="${H}"/>`;
  for (let k = 1; k <= 8; k++) {
    const y = round1(HORIZON + (H - HORIZON) * (k / 8) ** 2);
    lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  }
  return `<g clip-path="url(#below)" stroke="${C.cyan}" stroke-opacity=".35">${lines}<rect class="scan" x="0" y="${HORIZON}" width="${W}" height="2" fill="url(#holo)" stroke="none"/></g>`;
}

export function hero({ name, role, status, alt }) {
  const title = textPath(name, { font: 'display', size: 64, x: W / 2, y: 150, anchor: 'middle', tracking: 6 });
  const sub = textPath(role, { font: 'mono', size: 18, x: W / 2, y: 196, anchor: 'middle', tracking: 4 });
  const statusW = measure(status, { font: 'mono', size: 14, tracking: 2 });
  const x0 = round1(W / 2 - (statusW + 24) / 2);
  const line = textPath(status, { font: 'mono', size: 14, x: x0 + 24, y: 325, tracking: 2 });

  const defs = [
    chromeGradient('chrome'),
    holoGradient('holo'),
    `<radialGradient id="glow"><stop offset="0" stop-color="${C.violet}" stop-opacity=".55"/><stop offset="1" stop-color="${C.violet}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="shineFill" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
    `<path id="name" d="${title.d}"/>`,
    `<clipPath id="card"><rect width="${W}" height="${H}" rx="18"/></clipPath>`,
    `<clipPath id="below"><rect y="${HORIZON}" width="${W}" height="${H - HORIZON}"/></clipPath>`,
    `<clipPath id="nameClip"><use href="#name"/></clipPath>`,
  ].join('');

  const body = `<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="${C.void}"/>
${starfield({ seed: 2000, count: 46, w: W, h: HORIZON - 20, avoid: { x: 150, y: 76, w: W - 300, h: 146 } })}
<ellipse cx="${W / 2}" cy="${HORIZON}" rx="560" ry="60" fill="url(#glow)"/>
${grid()}
<use href="#name" fill="url(#chrome)" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/>
<g clip-path="url(#nameClip)"><g transform="skewX(-20)"><rect class="shine" x="-260" y="60" width="140" height="120" fill="url(#shineFill)"/></g></g>
<path d="${sub.d}" fill="${C.dim}"/>
<rect x="${W / 2 - 180}" y="214" width="360" height="2" fill="url(#holo)"/>
<path d="${chamfer(round1(x0 - 28), 300, round1(statusW + 80), 38, 10)}" fill="${C.void}" fill-opacity=".9" stroke="url(#holo)" stroke-width="1.5"/>
<circle class="pulse" cx="${round1(x0 + 6)}" cy="319" r="5" fill="${C.signal}"/>
<path d="${line.d}" fill="${C.text}"/>
<path d="${star(64, 58, 16)}" fill="url(#holo)"/>
<path class="tw" d="${star(1128, 64, 11)}" fill="url(#holo)"/>
<path d="${star(1100, 96, 5)}" fill="${C.text}"/>
</g>`;
  return doc({ w: W, h: H, title: alt, defs, css: CSS, body });
}
