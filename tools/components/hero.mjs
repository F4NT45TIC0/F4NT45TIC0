import { C, doc, chromeGradient, holoGradient, starfield, star, chamfer, round1, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath, measure } from '../lib/text.mjs';

const W = 1200;
const H = 430;
const HORIZON = 306;

const CSS = `${TWINKLE_CSS}
.shine{animation:shine 7s ease-in-out infinite}
@keyframes shine{0%{transform:translateX(0)}58%,100%{transform:translateX(1250px)}}
.scan{animation:scan 5s linear infinite}
@keyframes scan{from{transform:translateY(0);opacity:.8}to{transform:translateY(${H - HORIZON}px);opacity:0}}
.pulse{animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.28}}
.orbit{animation:orbit 24s linear infinite;transform-origin:960px 197px}
@keyframes orbit{to{transform:rotate(360deg)}}`;

function grid() {
  let lines = '';
  for (let i = -15; i <= 15; i++) lines += `<line x1="960" y1="${HORIZON - 105}" x2="${960 + i * 125}" y2="${H}"/>`;
  for (let k = 1; k <= 8; k++) {
    const y = round1(HORIZON + (H - HORIZON) * (k / 8) ** 2);
    lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  }
  return `<g clip-path="url(#below)" stroke="${C.cyan}" stroke-opacity=".28">${lines}<rect class="scan" x="0" y="${HORIZON}" width="${W}" height="2" fill="url(#holo)" stroke="none"/></g>`;
}

export function hero({ name, role, status, alt }) {
  const [first, ...rest] = name.split(' ');
  const last = rest.join(' ');
  const firstLine = textPath(first, { font: 'display', size: 76, x: 57, y: 169, tracking: 5 });
  const lastLine = textPath(last, { font: 'display', size: 76, x: 57, y: 253, tracking: 5 });
  if (Math.max(firstLine.width, lastLine.width) > 735) throw new Error('hero name overflows');
  const sub = textPath(role, { font: 'monoBold', size: 17, x: 60, y: 303, tracking: 2 });
  if (sub.width > 750) throw new Error('hero role overflows');
  const kicker = textPath('F4NT45TIC0  /  PORTFOLIO', { font: 'monoBold', size: 15, x: 58, y: 44, tracking: 2 });
  const year = textPath('FULL-STACK  X  DESIGN', { font: 'mono', size: 14, x: 848, y: 44, tracking: 2 });
  const sigil = textPath('F', { font: 'display', size: 112, x: 960, y: 245, anchor: 'middle' });
  const statusW = measure(status, { font: 'mono', size: 15, tracking: 1 });
  const statusLine = textPath(status, { font: 'mono', size: 15, x: 90, y: 386, tracking: 1 });
  const count = textPath('03 STARRED  /  03 SELECTED', { font: 'monoBold', size: 14, x: 850, y: 387, tracking: 1 });

  const defs = [
    chromeGradient('chrome', { soft: true }),
    holoGradient('holo'),
    `<radialGradient id="orbGlow"><stop stop-color="${C.violet}" stop-opacity=".48"/><stop offset=".7" stop-color="${C.cyan}" stop-opacity=".12"/><stop offset="1" stop-color="${C.void}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="shineFill"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
    `<clipPath id="card"><path d="${chamfer(1, 1, W - 2, H - 2, 24)}"/></clipPath>`,
    `<clipPath id="below"><rect y="${HORIZON}" width="${W}" height="${H - HORIZON}"/></clipPath>`,
    `<path id="name" d="${firstLine.d}${lastLine.d}"/>`,
    `<clipPath id="nameClip"><use href="#name"/></clipPath>`,
  ].join('');

  const body = `<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="${C.void}"/>
<ellipse cx="955" cy="198" rx="328" ry="255" fill="url(#orbGlow)"/>
${starfield({ seed: 2026, count: 54, w: W, h: HORIZON, avoid: { x: 40, y: 68, w: 740, h: 250 } })}
<path d="M35 68H1165M35 332H1165" stroke="${C.dim}" stroke-opacity=".27"/>
<path d="M35 68V26H375M1165 68V26H835" fill="none" stroke="${C.cyan}" stroke-opacity=".55"/>
<path d="${kicker.d}" fill="${C.cyan}"/>
<path d="${year.d}" fill="${C.dim}"/>
<circle cx="960" cy="197" r="153" fill="${C.panel}" fill-opacity=".5" stroke="${C.cyan}" stroke-opacity=".28"/>
<circle cx="960" cy="197" r="119" fill="none" stroke="url(#holo)" stroke-opacity=".7" stroke-width="2"/>
<circle cx="960" cy="197" r="93" fill="none" stroke="${C.dim}" stroke-opacity=".38" stroke-dasharray="3 8"/>
<g class="orbit"><path d="M960 41A156 156 0 0 1 1116 197" fill="none" stroke="${C.pink}" stroke-width="5" stroke-linecap="round"/><path d="M960 353A156 156 0 0 1 804 197" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-linecap="round"/></g>
<path d="${star(960, 197, 70)}" fill="url(#holo)" fill-opacity=".14"/>
<path d="${sigil.d}" fill="url(#chrome)"/>
<path d="M790 197H1130M960 27V367" stroke="${C.cyan}" stroke-opacity=".18"/>
${grid()}
<use href="#name" fill="url(#chrome)" stroke="#fff" stroke-opacity=".22" stroke-width=".6"/>
<g clip-path="url(#nameClip)"><rect class="shine" x="-220" y="80" width="110" height="220" transform="skewX(-18)" fill="url(#shineFill)"/></g>
<path d="${sub.d}" fill="${C.text}"/>
<path d="M60 321H655" stroke="url(#holo)" stroke-width="2"/>
<path d="${chamfer(56, 355, round1(statusW + 68), 51, 12)}" fill="${C.void}" fill-opacity=".9" stroke="${C.cyan}" stroke-opacity=".75"/>
<circle class="pulse" cx="76" cy="380" r="6" fill="${C.signal}"/>
<path d="${statusLine.d}" fill="${C.text}"/>
<path d="${count.d}" fill="${C.cyan}"/>
<path class="tw" d="${star(714, 94, 13)}" fill="${C.pink}"/>
</g>
<path d="${chamfer(1, 1, W - 2, H - 2, 24)}" fill="none" stroke="url(#holo)" stroke-opacity=".7" stroke-width="2"/>`;
  return doc({ w: W, h: H, title: alt, defs, css: CSS, body });
}
