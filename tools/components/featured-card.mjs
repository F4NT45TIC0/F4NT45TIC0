import { C, doc, chromeGradient, holoGradient, chamfer, star, round1, TWINKLE_CSS } from '../lib/svg.mjs';
import { textPath, textUse, measure, createAtlas, atlasDefs } from '../lib/text.mjs';
import { cardAlt } from './card.mjs';

const W = 1200;
const H = 276;
const ACCENTS = [C.cyan, C.pink, C.violet];

export function featuredCard(c, index) {
  const accent = ACCENTS[index % ACCENTS.length];
  const atlas = createAtlas();
  const num = String(index + 1).padStart(2, '0');
  const number = textPath(num, { font: 'display', size: 84, x: 58, y: 190, tracking: 2 });
  const title = textPath(c.title, { font: 'display', size: 45, x: 294, y: 116, tracking: 2 });
  if (title.width > 820) throw new Error(`featured title "${c.title}" overflows`);

  const eyebrow = textUse(`STARRED  /  0${index + 1} OF 03`, { atlas, font: 'monoBold', size: 16, x: 294, y: 54, tracking: 2 });
  const visibility = textUse(c.tag === 'PRIVATE' ? 'PRIVATE PROJECT' : 'PUBLIC REPOSITORY', {
    atlas, font: 'monoBold', size: 14, x: 294, y: 256, tracking: 1,
  });
  const pitch = c.pitch.map((line, i) => {
    const row = textUse(line, { atlas, font: 'mono', size: 22, x: 296, y: 164 + i * 31 });
    if (row.width > 835) throw new Error(`featured pitch "${line}" overflows`);
    return row.svg;
  }).join('');

  let x = 294;
  let chips = '';
  for (const chip of c.chips) {
    const w = measure(chip, { font: 'mono', size: 15 }) + 30;
    const t = textUse(chip, { atlas, font: 'mono', size: 15, x: x + 15, y: 228 });
    chips += `<path d="${chamfer(round1(x), 205, round1(w), 33, 7)}" fill="${C.panel}" stroke="${accent}" stroke-opacity=".62"/><g fill="${C.text}">${t.svg}</g>`;
    x += w + 12;
  }
  if (x > W - 52) throw new Error(`featured chips of "${c.title}" overflow`);

  const defs = chromeGradient('chrome', { soft: true }) + holoGradient('holo') + atlasDefs(atlas)
    + `<radialGradient id="spot"><stop stop-color="${accent}" stop-opacity=".22"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>`
    + `<linearGradient id="glass" x2="1" y2="1"><stop stop-color="#181B2B"/><stop offset=".62" stop-color="${C.panel}"/><stop offset="1" stop-color="#10101E"/></linearGradient>`
    + `<clipPath id="clip"><path d="${chamfer(2, 2, W - 4, H - 4, 21)}"/></clipPath>`;

  const body = `<g clip-path="url(#clip)">
<rect width="${W}" height="${H}" fill="url(#glass)"/>
<ellipse cx="130" cy="128" rx="265" ry="236" fill="url(#spot)"/>
<path d="M0 0H243L204 276H0Z" fill="${C.void}" fill-opacity=".38"/>
<path d="M245 10L205 266M257 10L217 266" stroke="${accent}" stroke-opacity=".52"/>
<circle cx="127" cy="131" r="90" fill="none" stroke="${accent}" stroke-opacity=".30" stroke-width="1.5"/>
<circle cx="127" cy="131" r="69" fill="none" stroke="${accent}" stroke-opacity=".16" stroke-dasharray="5 7"/>
<path class="tw" d="${star(127, 131, 35)}" fill="${accent}" fill-opacity=".27"/>
<path d="${number.d}" fill="url(#chrome)" stroke="${accent}" stroke-opacity=".28" stroke-width="1"/>
<path d="M294 71H1143" stroke="${accent}" stroke-opacity=".44"/>
<path d="M1118 27H1170V79" fill="none" stroke="${accent}" stroke-width="2"/>
<path d="${star(1142, 126, 16)}" fill="${accent}"/>
<path d="${star(1100, 160, 5)}" fill="${C.text}"/>
<g fill="${accent}">${eyebrow.svg}</g>
<path d="${title.d}" fill="url(#chrome)"/>
<g fill="${C.text}">${pitch}</g>
${chips}
<g fill="${C.dim}">${visibility.svg}</g>
</g>
<path d="${chamfer(1, 1, W - 2, H - 2, 20)}" fill="none" stroke="${accent}" stroke-opacity=".74" stroke-width="2"/>
<path d="M24 1H183" stroke="url(#holo)" stroke-width="4"/>`;
  return doc({ w: W, h: H, title: cardAlt(c), defs, css: TWINKLE_CSS, body });
}
