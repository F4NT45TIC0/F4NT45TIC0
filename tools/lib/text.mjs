import opentype from 'opentype.js';
import { readFileSync } from 'node:fs';

const FONT_DIR = new URL('../fonts/', import.meta.url);
const FONT_FILES = {
  display: 'Michroma-Regular.ttf',
  mono: 'SpaceMono-Regular.ttf',
  monoBold: 'SpaceMono-Bold.ttf',
};
const cache = new Map();

export function loadFont(key) {
  const file = FONT_FILES[key];
  if (!file) throw new Error(`unknown font "${key}"`);
  if (!cache.has(key)) {
    const buf = readFileSync(new URL(file, FONT_DIR));
    cache.set(key, opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)));
  }
  return cache.get(key);
}

function layout(str, { font = 'mono', size, tracking = 0 }) {
  const f = loadFont(font);
  const chars = Array.from(str);
  for (const ch of chars) {
    if (ch.trim() && f.charToGlyphIndex(ch) === 0) throw new Error(`glyph "${ch}" missing in font "${font}"`);
  }
  const scale = size / f.unitsPerEm;
  const glyphs = chars.map((ch) => f.charToGlyph(ch));
  const offsets = [];
  let x = 0;
  glyphs.forEach((g, i) => {
    offsets.push(x);
    x += g.advanceWidth * scale;
    if (i < glyphs.length - 1) x += f.getKerningValue(g, glyphs[i + 1]) * scale + tracking;
  });
  return { glyphs, offsets, width: x };
}

export function measure(str, opts) {
  return layout(str, opts).width;
}

export function textPath(str, { x = 0, y = 0, anchor = 'start', ...opts }) {
  const { glyphs, offsets, width } = layout(str, opts);
  const x0 = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  const d = glyphs.map((g, i) => g.getPath(x0 + offsets[i], y, opts.size).toPathData(1)).join('');
  return { d, width, x0 };
}

// A glyph atlas maps "<font><size>-<glyphIndex>" to path data drawn at the origin, so a
// glyph that repeats is stored once in <defs> and placed with <use> — body text would
// otherwise blow the asset budget.
export function createAtlas() {
  return new Map();
}

export function atlasDefs(atlas) {
  return [...atlas].filter(([, d]) => d).map(([id, d]) => `<path id="${id}" d="${d}"/>`).join('');
}

export function textUse(str, { atlas, x = 0, y = 0, anchor = 'start', font = 'mono', ...opts }) {
  const { glyphs, offsets, width } = layout(str, { font, ...opts });
  const x0 = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  const svg = glyphs.map((g, i) => {
    const id = `${font}${opts.size}-${g.index}`;
    if (!atlas.has(id)) atlas.set(id, g.getPath(0, 0, opts.size).toPathData(1));
    if (!atlas.get(id)) return '';
    return `<use href="#${id}" x="${Math.round((x0 + offsets[i]) * 10) / 10}" y="${y}"/>`;
  }).join('');
  return { svg, width, x0 };
}

// Without an atlas each part carries path data (`d`); with one, a <use> run (`svg`).
export function richLine(segments, { x = 0, y = 0, anchor = 'start', atlas = null, ...opts }) {
  const gap = opts.tracking ?? 0;
  const widths = segments.map((s) => measure(s.t, { ...opts, font: s.font ?? opts.font }));
  const width = widths.reduce((a, b) => a + b, 0) + gap * (segments.length - 1);
  let cx = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  const parts = segments.map((s, i) => {
    const run = { ...opts, font: s.font ?? opts.font, x: cx, y };
    const part = atlas ? { svg: textUse(s.t, { ...run, atlas }).svg } : { d: textPath(s.t, run).d };
    cx += widths[i] + gap;
    return { ...part, fill: s.fill };
  });
  return { parts, width };
}
