import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderAll, budgetFor } from '../lib/render.mjs';
import { profile } from '../data/profile.mjs';
import { assertSelfContained } from './helpers.mjs';

const files = renderAll(profile);

test('renders exactly the expected files', () => {
  const expected = [
    'README.md', 'assets/hero.svg', 'assets/about.svg', 'assets/h-projects.svg', 'assets/h-stack.svg',
    'assets/stack.svg', 'assets/footer.svg', ...profile.cards.map((c) => `assets/cards/${c.slug}.svg`),
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
  for (const c of profile.cards.filter((c) => c.tag === 'PRIVATE')) {
    assert.equal(c.href, null, c.slug);
    assert.equal(c.repo, null, c.slug);
    assert.ok(!md.includes(`<a href="${c.href}"><img src="assets/cards/${c.slug}.svg"`), c.slug);
  }
});

test('README exposes working contact and project links as text', () => {
  const md = files['README.md'];
  assert.match(md, new RegExp(`mailto:${profile.contact.email}`));
  assert.match(md, /### Explore the work/);
  for (const c of profile.cards.filter((c) => c.repo)) assert.ok(md.includes(`[code](${c.repo})`), c.slug);
  assert.match(md, /Co-built, private repository/);
});
