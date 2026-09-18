import { test } from 'node:test';
import assert from 'node:assert/strict';
import { doc, esc, chamfer, star, starfield } from '../lib/svg.mjs';

test('doc wraps body with title, viewBox and reduced-motion guard', () => {
  const svg = doc({ w: 10, h: 20, title: 'A & B', body: '<g/>' });
  assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="10" height="20" viewBox="0 0 10 20"/);
  assert.ok(svg.includes('<title id="title">A &amp; B</title>'));
  assert.ok(svg.includes('prefers-reduced-motion'));
});

test('esc neutralizes markup', () => {
  assert.equal(esc('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
});

test('chamfer cuts top-left and bottom-right corners', () => {
  assert.equal(chamfer(0, 0, 100, 50, 10), 'M10 0H100V40L90 50H0V10Z');
});

test('star is a closed four-point path', () => {
  const d = star(10, 10, 5);
  assert.match(d, /^M10 5Q/);
  assert.match(d, /Z$/);
});

test('starfield is deterministic per seed', () => {
  const a = starfield({ seed: 1, count: 5, w: 100, h: 100 });
  assert.equal(a, starfield({ seed: 1, count: 5, w: 100, h: 100 }));
  assert.notEqual(a, starfield({ seed: 2, count: 5, w: 100, h: 100 }));
  assert.equal(a.match(/<path/g).length, 5);
});
