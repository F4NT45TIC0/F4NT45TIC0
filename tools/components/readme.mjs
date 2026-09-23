import { esc } from '../lib/svg.mjs';
import { cardAlt } from './card.mjs';

const img = (src, alt, width = '100%') => `<img src="${src}" width="${width}" alt="${esc(alt)}" />`;
const block = (inner) => `<p align="center">\n  ${inner}\n</p>`;

function cardCell(c) {
  const tag = img(`assets/cards/${c.slug}.svg`, cardAlt(c), '49%');
  return c.href ? `<a href="${c.href}">${tag}</a>` : tag;
}

function projectIndex(cards) {
  return ['### Explore the work', ...cards.map((c) => {
    const links = [c.repo && `[code](${c.repo})`, c.href?.startsWith('https://github.com/') ? null : c.href && `[live demo](${c.href})`].filter(Boolean);
    const visibility = c.tag === 'PRIVATE' ? ' *(private project)*' : '';
    return `- **${c.indexTitle ?? c.title}** — ${c.pitch.join(' ')}${visibility} ${links.length ? `(${links.join(' · ')})` : ''}`.trim();
  })].join('\n');
}

export function readme(p) {
  const pairs = [];
  for (let i = 0; i < p.cards.length; i += 2) {
    pairs.push(block(p.cards.slice(i, i + 2).map(cardCell).join('\n  ')));
  }
  return [
    block(img('assets/hero.svg', p.hero.alt)),
    block(`${esc(p.intro)}<br/><a href="mailto:${esc(p.contact.email)}">✉ Email</a> · <a href="${esc(p.contact.github)}">⌘ GitHub</a>`),
    block(img('assets/about.svg', p.about.alt)),
    block(img('assets/h-projects.svg', 'Projects')),
    ...pairs,
    projectIndex(p.cards),
    block(img('assets/h-stack.svg', 'Stack')),
    block(img('assets/stack.svg', `Stack: ${p.stack.join(', ')}`)),
    block(img('assets/footer.svg', p.footer.join(' · '))),
  ].join('\n\n') + '\n';
}
