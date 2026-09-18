import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile } from './data/profile.mjs';
import { renderAll, budgetFor } from './lib/render.mjs';

const ROOT = new URL('../', import.meta.url);
let over = false;

for (const [path, content] of Object.entries(renderAll(profile))) {
  const file = fileURLToPath(new URL(path, ROOT));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  const bytes = Buffer.byteLength(content);
  const limit = path.endsWith('.svg') ? budgetFor(path) : Infinity;
  if (bytes > limit) over = true;
  console.log(`${bytes > limit ? 'OVER' : 'ok  '} ${(bytes / 1024).toFixed(1).padStart(6)} KB  ${path}`);
}

if (over) {
  console.error('asset budget exceeded');
  process.exit(1);
}
