import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderAll, budgetFor } from '../lib/render.mjs';
import { profile } from '../data/profile.mjs';
import { cardAsset } from '../components/card.mjs';
import { assertSelfContained } from './helpers.mjs';

const files = renderAll(profile);

test('renders exactly the expected files', () => {
  const expected = [
    'README.md', 'assets/hero.svg', 'assets/about.svg', 'assets/h-projects.svg', 'assets/h-stack.svg',
    'assets/stack.svg', 'assets/footer.svg', ...profile.cards.map(cardAsset),
  ];
  assert.deepEqual(Object.keys(files).sort(), expected.sort());
});

for (const [path, svg] of Object.entries(files).filter(([p]) => p.endsWith('.svg'))) {
  test(`${path} respects its budget`, () => assertSelfContained(svg, budgetFor(path)));
}

test('README references every asset it ships', () => {
  for (const path of Object.keys(files).filter((p) => p.endsWith('.svg'))) {
    assert.ok(files['README.md'].includes(`src="${path}"`), path);
  }
});

test('README links public cards and leaves private cards unlinked', () => {
  const md = files['README.md'];
  for (const c of profile.cards.filter((c) => c.href)) assert.ok(md.includes(`<a href="${c.href}">`), c.slug);
  for (const c of profile.cards.filter((c) => !c.href)) {
    assert.ok(md.includes(`\n  <img src="${cardAsset(c)}"`), c.slug);
  }
});

test('README keeps the contact block commented out', () => {
  assert.match(files['README.md'], /<!-- CONTACT[\s\S]*-->/);
});
