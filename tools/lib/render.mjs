import { hero } from '../components/hero.mjs';
import { about } from '../components/about.mjs';
import { heading } from '../components/heading.mjs';
import { card, cardAsset } from '../components/card.mjs';
import { stack } from '../components/stack.mjs';
import { footer } from '../components/footer.mjs';
import { readme } from '../components/readme.mjs';

const BUDGET = { 'assets/hero.svg': 150_000 };
const DEFAULT_BUDGET = 60_000;

export const budgetFor = (path) => BUDGET[path] ?? DEFAULT_BUDGET;

export function renderAll(p) {
  return {
    'assets/hero.svg': hero(p.hero),
    'assets/about.svg': about(p.about),
    'assets/h-projects.svg': heading('> PROJECTS/', 'Projects'),
    'assets/h-stack.svg': heading('> STACK/', 'Stack'),
    'assets/stack.svg': stack(p.stack, `Stack: ${p.stack.join(', ')}`),
    'assets/footer.svg': footer(p.footer, p.footer.join(' · ')),
    ...Object.fromEntries(p.cards.map((c, i) => [cardAsset(c), card(c, i)])),
    'README.md': readme(p),
  };
}
