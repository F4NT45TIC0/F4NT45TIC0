import { test } from 'node:test';
import assert from 'node:assert/strict';
import { measure, textPath, richLine, createAtlas, atlasDefs, textUse } from '../lib/text.mjs';

test('measure grows with text length', () => {
  assert.ok(measure('ABCD', { font: 'mono', size: 20 }) > measure('AB', { font: 'mono', size: 20 }));
});

test('tracking adds space between glyphs only', () => {
  const base = measure('ABCD', { font: 'mono', size: 20 });
  assert.equal(Math.round(measure('ABCD', { font: 'mono', size: 20, tracking: 5 }) - base), 15);
});

test('anchor middle centers the text on x', () => {
  const { width, x0 } = textPath('HELLO', { font: 'display', size: 30, x: 300, anchor: 'middle' });
  assert.equal(Math.round(x0 + width / 2), 300);
});

test('textPath emits path data without NaN', () => {
  const { d } = textPath('Olá, ÓTICA × 2026 — ok', { font: 'mono', size: 18 });
  assert.match(d, /^M/);
  assert.ok(!d.includes('NaN'));
});

test('missing glyph fails loudly', () => {
  assert.throws(() => textPath('✦', { font: 'display', size: 20 }), /missing/);
});

test('richLine lays segments side by side and keeps fills', () => {
  const row = richLine([{ t: 'AB' }, { t: 'CD', fill: 'cyan' }], { font: 'mono', size: 20 });
  assert.equal(Math.round(row.width), Math.round(measure('ABCD', { font: 'mono', size: 20 })));
  assert.equal(row.parts[1].fill, 'cyan');
});

test('textUse draws each distinct glyph once and reuses it', () => {
  const atlas = createAtlas();
  const { svg, width } = textUse('AA A', { atlas, font: 'mono', size: 20, x: 10, y: 50 });
  assert.equal(atlas.size, 2, 'A and space');
  assert.equal(svg.match(/<use href="#mono20-\d+"/g).length, 3, 'space draws nothing');
  assert.equal(Math.round(width), Math.round(measure('AA A', { font: 'mono', size: 20 })));
  assert.equal((atlasDefs(atlas).match(/<path id=/g) ?? []).length, 1);
});

test('richLine with an atlas returns <use> runs instead of path data', () => {
  const atlas = createAtlas();
  const row = richLine([{ t: 'AB' }, { t: 'A', fill: 'cyan' }], { font: 'mono', size: 20, atlas });
  assert.match(row.parts[1].svg, /^<use href="#mono20-/);
  assert.equal(atlas.size, 2);
});
