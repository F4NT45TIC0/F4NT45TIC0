import { hero } from '../components/hero.mjs';
import { about } from '../components/about.mjs';
import { aboutMobile } from '../components/about-mobile.mjs';
import { heading } from '../components/heading.mjs';
import { card } from '../components/card.mjs';
import { featuredCard } from '../components/featured-card.mjs';
import { mobileCard } from '../components/mobile-card.mjs';
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
    'assets/about-mobile.svg': aboutMobile(p.about),
    'assets/h-featured.svg': heading('FEATURED WORK', 'Featured work: my top three starred projects', 'MY TOP 03  /  STARRED'),
    'assets/h-selected.svg': heading('MORE PROJECTS', 'More selected projects', '03 MORE  /  BUILT TO SHIP'),
    'assets/h-stack.svg': heading('TOOLKIT', 'Toolkit', 'DESIGN  X  ENGINEERING'),
    'assets/stack.svg': stack(p.stack, `Stack: ${p.stack.join(', ')}`),
    'assets/footer.svg': footer(p.footer, p.footer.join(' · ')),
    ...Object.fromEntries(p.cards.map((c, i) => [`assets/cards/${c.slug}.svg`, c.featured ? featuredCard(c, i) : card(c, i)])),
    ...Object.fromEntries(p.cards.map((c, i) => [`assets/cards/${c.slug}-mobile.svg`, mobileCard(c, i)])),
    'README.md': readme(p),
  };
}
