export const C = {
  void: '#05050A',
  panel: '#0B0B14',
  text: '#E8ECF4',
  dim: '#9AA0AE',
  cyan: '#2DE2E6',
  violet: '#B14CFF',
  pink: '#FF5FD2',
  signal: '#39FF88',
};

export const round1 = (n) => Math.round(n * 10) / 10;

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce){*{animation:none!important}}';

export function doc({ w, h, title, defs = '', css = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${esc(title)}</title><defs>${defs}</defs><style>${css}${REDUCED_MOTION}</style>${body}</svg>`;
}

const CHROME_HARD = ['#FFFFFF', '#9AA0AE', '#3A3F4B', '#E8ECF4', '#6B7080'];
const CHROME_SOFT = ['#FFFFFF', '#DDE1EA', '#AEB4C2', '#EEF1F6', '#C3C8D3'];

export function chromeGradient(id, { dir = 'v', soft = false } = {}) {
  const [x2, y2] = dir === 'v' ? [0, 1] : [1, 0];
  const stops = (soft ? CHROME_SOFT : CHROME_HARD)
    .map((c, i) => `<stop offset="${[0, 0.42, 0.5, 0.58, 1][i]}" stop-color="${c}"/>`)
    .join('');
  return `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops}</linearGradient>`;
}

export function holoGradient(id) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.violet}"/><stop offset=".5" stop-color="${C.cyan}"/><stop offset="1" stop-color="${C.pink}"/></linearGradient>`;
}

export function star(cx, cy, r) {
  const k = round1(r * 0.18);
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}

export function chamfer(x, y, w, h, c = 12) {
  return `M${x + c} ${y}H${x + w}V${y + h - c}L${x + w - c} ${y + h}H${x}V${y + c}Z`;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function starfield({ seed, count, w, h, rMin = 1.5, rMax = 5 }) {
  const rand = mulberry32(seed);
  let out = '';
  for (let i = 0; i < count; i++) {
    const cx = round1(rand() * w);
    const cy = round1(rand() * h);
    const r = round1(rMin + rand() * (rMax - rMin));
    const delay = round1(rand() * 3);
    out += `<path class="tw" style="animation-delay:${delay}s" d="${star(cx, cy, r)}" fill="${i % 3 === 0 ? C.cyan : C.text}"/>`;
  }
  return out;
}

export const TWINKLE_CSS = '.tw{animation:tw 3s ease-in-out infinite}@keyframes tw{0%,100%{opacity:.2}50%{opacity:1}}';
export const BLINK_CSS = '.blink{animation:blink 1.1s steps(1) infinite}@keyframes blink{50%{opacity:0}}';
