import assert from 'node:assert/strict';

export function assertSelfContained(svg, budget) {
  assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.ok(svg.includes('<title id="title">'), 'has a <title>');
  assert.ok(!svg.includes('<text'), 'no <text> elements');
  assert.equal((svg.match(/https?:\/\//g) ?? []).length, 1, 'only the xmlns URL');
  assert.ok(svg.includes('prefers-reduced-motion'), 'reduced-motion guard');
  assert.ok(!/NaN|undefined/.test(svg), 'no NaN/undefined leaked');
  const bytes = Buffer.byteLength(svg);
  assert.ok(bytes <= budget, `${bytes} bytes > budget ${budget}`);
}
