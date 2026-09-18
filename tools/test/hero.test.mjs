import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hero } from '../components/hero.mjs';
import { profile } from '../data/profile.mjs';
import { assertSelfContained } from './helpers.mjs';

test('hero is self-contained and within its 150 KB budget', () => {
  assertSelfContained(hero(profile.hero), 150_000);
});

test('hero carries the chrome shine, the online pulse and the grid scan', () => {
  const svg = hero(profile.hero);
  for (const cls of ['shine', 'pulse', 'scan', 'tw']) assert.ok(svg.includes(`class="${cls}"`), cls);
});
