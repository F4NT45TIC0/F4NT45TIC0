import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('../', import.meta.url);
const md = readFileSync(new URL('README.md', ROOT), 'utf8');
const html = execFileSync('gh', ['api', 'markdown', '-f', `text=${md}`, '-f', 'mode=gfm'], { encoding: 'utf8' });
const CSS = 'https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown';

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Profile preview</title>
<link id="md" rel="stylesheet" href="${CSS}-light.css">
<style>
body{margin:0;padding:16px;background:#fff;font-family:system-ui}
body.dark{background:#0d1117}
.bar{display:flex;gap:8px;justify-content:center;margin-bottom:16px}
.markdown-body{box-sizing:border-box;max-width:896px;margin:0 auto;padding:24px;border:1px solid #d0d7de;border-radius:6px}
body.dark .markdown-body{border-color:#30363d}
body.narrow .markdown-body{max-width:375px;padding:16px}
</style></head>
<body>
<div class="bar"><button data-act="light">Light</button><button data-act="dark">Dark</button><button data-act="desktop">Desktop</button><button data-act="mobile">Mobile 375</button></div>
<article class="markdown-body">${html}</article>
<script>
document.querySelector('.bar').addEventListener('click', (e) => {
  const act = e.target.dataset.act;
  if (act === 'light' || act === 'dark') {
    document.body.classList.toggle('dark', act === 'dark');
    document.getElementById('md').href = '${CSS}-' + act + '.css';
  }
  if (act === 'desktop' || act === 'mobile') document.body.classList.toggle('narrow', act === 'mobile');
});
</script></body></html>`;

writeFileSync(fileURLToPath(new URL('preview.html', ROOT)), page);
console.log('preview.html written');
