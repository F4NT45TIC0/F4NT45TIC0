export const profile = {
  hero: {
    name: 'FELIPE FERREIRA',
    role: 'FULL-STACK DEVELOPER  ×  DESIGNER',
    status: 'ONLINE · BUILDING AT LICENZI · PRESIDENTE PRUDENTE, SP',
    alt: 'Felipe Ferreira — full-stack developer × designer. Online, building at Licenzi, Presidente Prudente, SP.',
  },
  about: {
    title: 'ABOUT.EXE',
    alt: 'About: full-stack developer who designs — TypeScript end to end, from hexagonal NestJS backends to pixel-careful interfaces. Building at Licenzi. ADS graduate, Unoeste (2023–2026). Founder of JAW, my design brand.',
    lines: [
      [{ t: '> ' }, { t: 'Full-stack developer who designs.', font: 'monoBold' }],
      [{ t: '  TypeScript end to end — hexagonal NestJS backends' }],
      [{ t: '  to pixel-careful interfaces.' }],
      [{ t: '> Building at ' }, { t: 'Licenzi', fill: 'cyan' }, { t: '. ADS graduate, ' }, { t: 'Unoeste', fill: 'cyan' }, { t: ' (2023–2026).' }],
      [{ t: '> Founder of ' }, { t: 'JAW', fill: 'cyan' }, { t: ', my design brand.' }],
      [{ t: '> PT-BR  dev full-stack e designer, do banco ao pixel.', fill: 'dim' }],
    ],
  },
  cards: [
    {
      slug: 'atletica', asset: 'atletica-featured', title: 'ATLÉTICA FIPP', tag: 'STARRED', starred: true,
      href: 'https://github.com/F4NT45TIC0/atletica-fipp-site',
      pitch: ['Sales management system for a', 'university athletics club.'],
      chips: ['Next.js', 'TypeScript', 'Supabase'],
    },
    {
      slug: 'shopflow', asset: 'shopflow-featured', title: 'SHOPFLOW AUTOMATOR', titleSize: 25,
      tag: 'STARRED', starred: true, href: null,
      pitch: ['Local toolkit for TikTok Shop content', 'planning and video workflows. Private.'],
      chips: ['JavaScript', 'Scheduling', 'Local-first'],
    },
    {
      slug: 'ora-digital', asset: 'ora-digital-featured', title: 'ORADIGITAL', tag: 'STARRED', starred: true, href: null,
      pitch: ['Private brand website with custom', 'interactions, sound and visual design.'],
      chips: ['Vite', 'JavaScript', 'CSS'],
    },
    {
      slug: 'dublaai', asset: 'dublaai-selected', title: 'DUBLA AÍ', tag: 'LIVE', href: 'https://dublaai-web.vercel.app',
      pitch: ['In-browser dubbing studio with an honest,', 'acoustic score. Pure DSP, no backend.'],
      chips: ['TypeScript', 'DSP', 'MFCC · DTW'],
    },
    {
      slug: '24a0', asset: '24a0-selected', title: '24A0', tag: 'LIVE', href: 'https://24a0.com.br',
      pitch: ['Formula 1 race simulator that runs', 'right in the browser.'],
      chips: ['React', 'Vite', 'JavaScript'],
    },
    {
      slug: 'erp-otica', asset: 'erp-otica-selected', title: 'ERP ÓTICA', tag: 'PRIVATE', href: null,
      pitch: ['Multi-tenant SaaS for optical retail.', 'Co-built, private repository.'],
      chips: ['NestJS hexagonal', 'Next.js 16', 'Postgres RLS'],
    },
  ],
  stack: ['TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'Next.js', 'React', 'Vue', 'PostgreSQL', 'Prisma', 'Python', 'Figma'],
  footer: ['NOW LOADING THE FUTURE', 'BUILT BY JAW', 'FULL-STACK × DESIGN'],
};
