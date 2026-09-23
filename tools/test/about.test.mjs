import { test } from 'node:test';
import assert from 'node:assert/strict';
import { about } from '../components/about.mjs';
import { heading } from '../components/heading.mjs';
import { profile } from '../data/profile.mjs';
import { assertSelfContained } from './helpers.mjs';

test('about window is self-contained with a blinking cursor', () => {
  const svg = about(profile.about);
  assertSelfContained(svg, 60_000);
  assert.ok(svg.includes('class="blink"'));
});

test('about grows one line height per line', () => {
  const two = about({ ...profile.about, lines: profile.about.lines.slice(0, 2) });
  const three = about({ ...profile.about, lines: profile.about.lines.slice(0, 3) });
  const h = (s) => Number(s.match(/ height="(\d+)"/)[1]);
  assert.equal(h(three) - h(two), 38);
});

test('about rejects a line wider than the window', () => {
  assert.throws(() => about({ ...profile.about, lines: [[{ t: 'x'.repeat(120) }]] }), /overflows/);
});

test('heading is self-contained and has its own dark background', () => {
  const svg = heading('FEATURED WORK', 'Featured work', 'MY TOP 03 / STARRED');
  assertSelfContained(svg, 60_000);
  assert.ok(svg.includes('fill="#0B0B14"'));
});
