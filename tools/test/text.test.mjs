import { test } from 'node:test';
import assert from 'node:assert/strict';
import { measure, textPath, richLine } from '../lib/text.mjs';

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
