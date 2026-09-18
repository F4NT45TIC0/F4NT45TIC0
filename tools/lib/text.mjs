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

export function richLine(segments, { x = 0, y = 0, anchor = 'start', ...opts }) {
  const gap = opts.tracking ?? 0;
  const widths = segments.map((s) => measure(s.t, { ...opts, font: s.font ?? opts.font }));
  const width = widths.reduce((a, b) => a + b, 0) + gap * (segments.length - 1);
  let cx = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  const parts = segments.map((s, i) => {
    const { d } = textPath(s.t, { ...opts, font: s.font ?? opts.font, x: cx, y });
    cx += widths[i] + gap;
    return { d, fill: s.fill };
  });
  return { parts, width };
}
