import { esc } from '../lib/svg.mjs';
import { cardAlt } from './card.mjs';

const img = (src, alt, width = '100%') => `<img src="${src}" width="${width}" alt="${esc(alt)}" />`;
const picture = (desktop, mobile, alt) => `<picture><source media="(max-width: 600px)" srcset="${mobile}" />${img(desktop, alt)}</picture>`;
const block = (inner) => `<p align="center">\n  ${inner}\n</p>`;

function cardCell(c) {
  const tag = picture(`assets/cards/${c.slug}.svg`, `assets/cards/${c.slug}-mobile.svg`, cardAlt(c));
  return c.href ? `<a href="${c.href}">${tag}</a>` : tag;
}

function projectIndex(cards) {
  return ['<details>', '<summary>Project directory · descriptions and links</summary>', '', ...cards.map((c) => {
    const links = [c.repo && `[code](${c.repo})`, c.href?.startsWith('https://github.com/') ? null : c.href && `[live demo](${c.href})`].filter(Boolean);
    const visibility = c.tag === 'PRIVATE' ? ' *(private project)*' : '';
    return `- **${c.indexTitle ?? c.title}** — ${c.pitch.join(' ')}${visibility} ${links.length ? `(${links.join(' · ')})` : ''}`.trim();
  }), '', '</details>'].join('\n');
}

export function readme(p) {
  const featured = p.cards.filter((c) => c.featured);
  const more = p.cards.filter((c) => !c.featured);
  if (featured.length !== 3 || more.length !== 3) throw new Error('profile requires three featured and three more projects');
  return [
    block(img('assets/hero.svg', p.hero.alt)),
    block(`${esc(p.intro)}<br/><a href="mailto:${esc(p.contact.email)}">✉ Email</a> · <a href="${esc(p.contact.github)}">⌘ GitHub</a>`),
    block(picture('assets/about.svg', 'assets/about-mobile.svg', p.about.alt)),
    block(img('assets/h-featured.svg', 'Featured work: my top three starred projects')),
    ...featured.map((c) => block(cardCell(c))),
    block(img('assets/h-selected.svg', 'More selected projects')),
    ...more.map((c) => block(cardCell(c))),
    projectIndex(p.cards),
    block(img('assets/h-stack.svg', 'Toolkit')),
    block(img('assets/stack.svg', `Stack: ${p.stack.join(', ')}`)),
    block(img('assets/footer.svg', p.footer.join(' · '))),
  ].join('\n\n') + '\n';
}
