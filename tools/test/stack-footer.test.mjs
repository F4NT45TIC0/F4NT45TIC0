import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stack } from '../components/stack.mjs';
import { footer } from '../components/footer.mjs';
import { profile } from '../data/profile.mjs';
import { assertSelfContained } from './helpers.mjs';

test('stack is self-contained and draws one chip per item', () => {
  const svg = stack(profile.stack, 'Stack');
  assertSelfContained(svg, 60_000);
  assert.equal(svg.match(/fill="url\(#chrome\)"/g).length, profile.stack.length);
});

test('stack wraps into more rows as items grow', () => {
  const h = (s) => Number(s.match(/ height="(\d+)"/)[1]);
  assert.ok(h(stack([...profile.stack, ...profile.stack], 'x')) > h(stack(profile.stack, 'x')));
});

test('footer marquee loops by exactly one strip width', () => {
  const svg = footer(profile.footer, 'Footer');
  assertSelfContained(svg, 60_000);
  const shift = Number(svg.match(/translateX\(-([\d.]+)px\)/)[1]);
  const copies = [...svg.matchAll(/<use href="#unit" x="([\d.]+)"/g)].map((m) => Number(m[1]));
  assert.equal(copies[0], 0);
  assert.equal(shift, copies[1]);
});
