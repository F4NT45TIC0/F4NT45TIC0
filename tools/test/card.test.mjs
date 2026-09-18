import { test } from 'node:test';
import assert from 'node:assert/strict';
import { card, cardAlt } from '../components/card.mjs';
import { profile } from '../data/profile.mjs';
import { assertSelfContained } from './helpers.mjs';

for (const [i, c] of profile.cards.entries()) {
  test(`card ${c.slug} is self-contained and fits`, () => {
    assertSelfContained(card(c, i), 60_000);
  });
}

test('card numbers itself from the index', () => {
  assert.notEqual(card(profile.cards[0], 0), card(profile.cards[0], 1));
});

test('card rejects a pitch line that overflows', () => {
  assert.throws(() => card({ ...profile.cards[0], pitch: ['x'.repeat(80)] }, 0), /overflows/);
});

test('card rejects too many chips', () => {
  assert.throws(() => card({ ...profile.cards[0], chips: Array(8).fill('TypeScript') }, 0), /overflows/);
});

test('card rejects more than two pitch lines', () => {
  assert.throws(() => card({ ...profile.cards[0], pitch: ['a', 'b', 'c'] }, 0), /at most 2/);
});

test('card rejects an unknown tag', () => {
  assert.throws(() => card({ ...profile.cards[0], tag: 'NEW' }, 0), /unknown tag/);
});

test('cardAlt reads as a sentence with the stack', () => {
  assert.equal(
    cardAlt({ title: 'X', pitch: ['Does a', 'thing.'], chips: ['A', 'B'] }),
    'X — Does a thing. (A, B)',
  );
});
