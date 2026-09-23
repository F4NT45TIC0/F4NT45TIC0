import { esc } from '../lib/svg.mjs';
import { cardAlt, cardAsset } from './card.mjs';

const img = (src, alt, width = '100%') => `<img src="${src}" width="${width}" alt="${esc(alt)}" />`;
const block = (inner) => `<p align="center">\n  ${inner}\n</p>`;

function cardCell(c) {
  const tag = img(cardAsset(c), cardAlt(c), '49%');
  return c.href ? `<a href="${c.href}">${tag}</a>` : tag;
}

const CONTACT = `<!-- CONTACT — descomentar quando os links existirem (troque as URLs)
<p align="center">
  <a href="https://www.linkedin.com/in/SEU-PERFIL">LinkedIn</a> ·
  <a href="mailto:SEU-EMAIL">E-mail</a> ·
  <a href="https://www.instagram.com/SUA-MARCA">JAW</a>
</p>
-->`;

export function readme(p) {
  const pairs = [];
  for (let i = 0; i < p.cards.length; i += 2) {
    pairs.push(block(p.cards.slice(i, i + 2).map(cardCell).join('\n  ')));
  }
  return [
    block(img('assets/hero.svg', p.hero.alt)),
    block(img('assets/about.svg', p.about.alt)),
    block(img('assets/h-projects.svg', 'Projects')),
    ...pairs,
    block(img('assets/h-stack.svg', 'Stack')),
    block(img('assets/stack.svg', `Stack: ${p.stack.join(', ')}`)),
    CONTACT,
    block(img('assets/footer.svg', p.footer.join(' · '))),
  ].join('\n\n') + '\n';
}
