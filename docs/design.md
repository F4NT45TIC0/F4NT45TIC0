# Perfil F4NT45TIC0 — direção visual

O perfil apresenta Felipe Ferreira como desenvolvedor full-stack com olhar de designer. A linguagem visual é Y2K cromada: fundo escuro próprio, metal claro, ciano, magenta e violeta, geometria orbital e grade em perspectiva. Os SVGs são autorais e versionados; o README não depende de widgets externos.

## Hierarquia

1. **Hero:** nome em duas linhas, tipografia grande, monograma orbital, localização e atividade.
2. **About:** apresentação curta e concreta.
3. **Featured work:** os três repositórios que Felipe marcou com estrela aparecem primeiro em cards maiores, numerados `01–03`: Atlética FIPP, shopflow-automator e ORADIGITAL.
4. **More projects:** Dubla Aí, 24A0 e ERP Ótica aparecem em faixas mais compactas, numeradas `04–06`.
5. **Project directory:** nomes, descrições e links em texto HTML/Markdown dentro de `<details>`, como alternativa acessível aos SVGs.
6. **Toolkit e rodapé:** tecnologias e assinatura visual.

Os três projetos privados (shopflow-automator, ORADIGITAL e ERP Ótica) exibem apenas nome, resumo e tecnologias autorizados. Nenhum card privado aponta para código, cliente, credencial ou recurso fechado.

## Responsividade

Cada projeto tem dois SVGs. O card de desktop ocupa toda a largura: `1200×276` para featured e `1200×198` para os demais. Um `<picture>` troca para a arte `600×352` quando a viewport tem até 600 px. Os títulos, descrições e chips da versão estreita são redesenhados com corpos maiores, em vez de reduzir os cards de desktop. O texto alternativo descreve cada projeto.

O hero tem `1200×430`; os cabeçalhos mantêm `1200×92`. Cada imagem tem fundo próprio, então funciona sobre os temas claro e escuro do GitHub. Todas as animações obedecem a `prefers-reduced-motion`.

## Implementação

- `tools/data/profile.mjs` é a fonte dos textos, projetos, links e stack.
- `tools/components/` desenha hero, cabeçalhos, cards desktop/mobile, about, stack e rodapé.
- `tools/build.mjs` converte texto em paths de fonte com `opentype.js` e gera `README.md` e `assets/`.
- Os SVGs não fazem requisições externas. Michroma e Space Mono estão no repositório sob OFL.
- `npm ci`, `npm test` e `npm run build` são executados em `tools/`.

O perfil completo usa seis cards no README. O bloco de pins nativo do GitHub só pode incluir os três repositórios públicos: Atlética FIPP, Dubla Aí e 24A0. A configuração dos pins depende de uma sessão autenticada na interface do GitHub.
