# Perfil GitHub F4NT45TIC0 — Design (Y2K cyber cromado)

Data: 2026-09-18 · Dono: Felipe Ferreira Carro (`F4NT45TIC0`)

## 1. Objetivo

Transformar o perfil `github.com/F4NT45TIC0` num cartão de visita profissional de
**dev full-stack com olhar de designer**, com a estética **Y2K cyber cromada** como
identidade principal. Quem abrir o perfil (recrutador, cliente da JAW, outro dev)
precisa entender em 10 segundos: quem é, onde trabalha, o que já construiu.

**Sucesso =** README de perfil publicado e renderizando igual no tema claro e escuro
do GitHub, no desktop e no celular; bio/empresa/local preenchidos; 6 repositórios
de vitrine com descrição, topics e link; 6 repositórios fixados.

**Fora do escopo:** reescrever o README de cada projeto; estatísticas ao vivo
(abordagem C, fica para depois); bloco de contatos ativo (ainda não há links).

## 2. Abordagem escolhida — A: SVGs autorais versionados

O README do GitHub não aceita CSS nem JS. Toda a estética vem de **SVGs próprios**
(animados com CSS `@keyframes` interno, que o GitHub renderiza em `<img>`), guardados
em `assets/` do repositório `F4NT45TIC0/F4NT45TIC0`. Nenhum widget de terceiros.

Regras técnicas dos SVGs:
- **Fundo próprio escuro** (`#05050A`) com cantos arredondados e o resto transparente —
  por isso funcionam igual no tema claro e escuro, sem precisar de `<picture>`.
- **Sem recurso externo** (o GitHub serve a imagem por proxy; fonte/imagem externa não carrega):
  **todo texto é convertido em `<path>`** no build (`opentype.js` 1.3.4 — a 2.0 quebra com a
  Michroma). Nenhum `<text>` nos SVGs: renderização idêntica em qualquer máquina, sem fonte embutida.
- **Ornamentos são formas**, não caracteres: ✦ e ◉ não existem nas fontes, então estrelas e o
  ponto de status são `<path>`/`<circle>`.
- **Celular:** os cards ficam 2 por linha (prioridade desktop — onde recrutador lê). No celular
  o GitHub reduz a imagem e o texto do card fica pequeno; por isso cada `<img>` tem `alt` com o
  pitch completo, e os títulos dos cards usam corpo grande para continuarem legíveis.
- **`prefers-reduced-motion`**: dentro do SVG, uma media query desliga as animações.
- **Orçamento de tamanho:** hero ≤ 150 KB; demais ≤ 60 KB cada.
- Todo `<img>` no README tem `alt` descritivo (acessibilidade e fallback se a imagem falhar).

## 3. Identidade visual

| Token | Valor | Uso |
|---|---|---|
| void | `#05050A` | fundo |
| grid | `#2DE2E6` a 25% | grid de ciberespaço |
| chrome | degradê `#FFFFFF → #9AA0AE → #3A3F4B → #E8ECF4 → #6B7080` | títulos cromados |
| holo | `#B14CFF → #2DE2E6 → #FF5FD2` | bordas holográficas, brilhos |
| text | `#E8ECF4` / secundário `#9AA0AE` | texto nos cards |
| signal | `#39FF88` | ponto "ONLINE" |

Tipografia: **Michroma** (display larga, OFL — em paths) e **Space Mono** (texto, OFL — subset
embutido). Ornamentos: estrelas ✦ ✧, grid em perspectiva, barras `░▒▓`, janelas com
cantos chanfrados estilo interface de 2000.

Animações (sutis, loop lento): reflexo varrendo o cromo (~6 s), estrelas piscando,
ponto "ONLINE" pulsando, cursor `_` piscando, marquee no rodapé.

## 4. Estrutura do README (ordem)

Conteúdo principal em inglês + uma linha em português no `about`.

1. **Hero** (`assets/hero.svg`, ~1200×360): estrelas, grid em perspectiva, **FELIPE FERREIRA**
   em cromo com reflexo, subtítulo `full-stack developer × designer`, barra
   `◉ ONLINE · building at Licenzi · Presidente Prudente, SP`.
2. **`> about.exe`** (`assets/about.svg`): janela cromada com:
   - Full-stack developer who designs — TypeScript end to end, from hexagonal NestJS backends to
     pixel-careful interfaces.
   - Currently building at **Licenzi**. ADS graduate, **Unoeste** (2023–2026).
   - Founder of **JAW**, my design brand.
   - 🇧🇷 Dev full-stack e designer. Construo produto do banco de dados ao pixel.
3. **`> projects/`** (cabeçalho `assets/h-projects.svg` + 6 cards `assets/cards/*.svg`, 2 por linha,
   cada card é link):

   | Card | Pitch (EN) | Chips | Link |
   |---|---|---|---|
   | Dubla Aí | In-browser dubbing studio with an honest acoustic score | TypeScript · DSP · MFCC/DTW · no backend | dublaai-web.vercel.app |
   | ERP Ótica 🔒 | Multi-tenant SaaS for optical retail — private, co-built | NestJS (hexagonal) · Next.js 16 · PostgreSQL RLS · Prisma | sem link |
   | 24a0 | Formula 1 race simulator on the web | React · Vite | 24a0.com.br |
   | Impostor Online | Real-time multiplayer party game for phones | JavaScript · realtime | repo |
   | Atlética FIPP | Sales management for a university athletics club | Next.js · TypeScript · PostgreSQL | repo |
   | Inteiro Teor | OCR + AI text correction for notary offices | Tesseract.js · Azure Vision · Flask | inteiro-teor.vercel.app |

4. **`> stack/`** (`assets/stack.svg`): chips cromados — TypeScript, JavaScript, Node.js, NestJS,
   Next.js, React, Vue, PostgreSQL, Prisma, Python, Figma.
5. **`> contact/`**: bloco pronto, **comentado** (`<!-- -->`) até existirem os links.
6. **Rodapé** (`assets/footer.svg`): marquee `✦ NOW LOADING THE FUTURE ✦ BUILT BY JAW ✦`.

Layout em Markdown/HTML permitido pelo GitHub: `<p align="center">`, `<a><img width="49%"></a>`
para os pares de cards.

## 5. Estrutura do repositório

```
F4NT45TIC0/
  README.md          GERADO pelo build a partir de tools/data/profile.mjs
  assets/            SVGs GERADOS (commitados — o README aponta para eles)
    hero.svg about.svg h-projects.svg h-stack.svg stack.svg footer.svg
    cards/{dublaai,erp-otica,24a0,impostor,atletica,inteiro-teor}.svg
  tools/             gerador Node (não vai para o README)
    data/profile.mjs todo o conteúdo (textos, cards, links, stack) — fonte única
    lib/             text.mjs (texto→path), svg.mjs (primitivas), render.mjs (manifesto + orçamento)
    components/      hero, about, heading, card, stack, footer, readme
    build.mjs        escreve assets/ e README.md
    preview.mjs      gera preview.html (gitignorado) via `gh api markdown` — o render real do GitHub
    fonts/           Michroma e Space Mono (OFL) + licenças
    test/            node:test
  docs/design.md     este documento
```

O gerador existe porque o texto precisa virar `<path>` — fazer à mão seria frágil. Conteúdo
muda em **um** lugar (`profile.mjs`) e README + SVGs saem consistentes. O GitHub não roda nada.

## 6. Perfil e repositórios (ações externas)

Toda ação que publica ou altera conta é executada **só após OK explícito do Felipe, na hora**.

- **Criar** `F4NT45TIC0/F4NT45TIC0` público e dar push.
- **Perfil** via `gh api -X PATCH /user`: bio
  `Full-stack dev × designer ✦ TypeScript · NestJS · Next.js ✦ building at Licenzi ✦ founder of JAW`,
  company `Licenzi`, location `Presidente Prudente, SP`, blog vazio, hireable `false`.
  ⚠️ O token atual do `gh` não tem o escopo `user`; o Felipe precisa rodar
  `gh auth refresh -h github.com -s user` (abre o navegador) antes deste passo.
- **Vitrine** via `gh repo edit`: descrição em inglês, topics e homepage em
  `dublaai`, `24a0`, `Impostorgamefipp`, `atletica-fipp-site`, `InteiroTeor`, `CurriculoWebDesign`.
- **Fixados:** não há API — manual pelo Felipe ("Customize your pins"):
  `dublaai`, `24a0`, `Impostorgamefipp`, `atletica-fipp-site`, `InteiroTeor`, `CurriculoWebDesign`.

## 7. Verificação

1. Cada SVG aberto no navegador interno: renderiza, anima, respeita reduced-motion, sem requisição externa.
2. README renderizado pelo próprio GitHub (`gh api markdown`) numa página local com o CSS oficial
   (`github-markdown-css`), alternando claro, escuro e 375 px.
3. Depois do push: conferir o perfil real no navegador (claro/escuro/mobile) e o peso dos assets.
4. Conferir que nenhum dado privado do ERP (código, cliente, credencial) aparece — só stack e papel.
