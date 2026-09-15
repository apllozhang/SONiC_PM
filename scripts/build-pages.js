const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const { day01, day02, day03 } = require('./content-days');
const { tracks, glossary, checklist, cases } = require('./content-tracks');

const NAV = `
    <nav class="primary-nav" id="primaryNav" aria-label="主导航">
      <a href="index.html" data-nav="home">首页</a>
      <a href="day-01.html" data-nav="intro">3 天入门</a>
      <a href="track-01.html" data-nav="track-01">供应链</a>
      <a href="track-02.html" data-nav="track-02">架构</a>
      <a href="track-03.html" data-nav="track-03">测试</a>
      <a href="track-04.html" data-nav="track-04">社区</a>
      <a href="track-05.html" data-nav="track-05">定型</a>
      <a href="track-06.html" data-nav="track-06">商业化</a>
      <a href="glossary.html" data-nav="glossary">术语</a>
      <a href="checklist.html" data-nav="checklist">核验包</a>
      <a href="cases.html" data-nav="cases">案例</a>
    </nav>`;

const TOOLS = `
    <div class="topbar-tools">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="切换主题" title="切换主题">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        <svg class="icon-sun" style="display:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>
      <button class="icon-btn nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="primaryNav" aria-label="打开导航">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>`;

function topbar() {
  return `  <header class="topbar">
    <a class="brand" href="index.html" aria-label="返回首页 · SONiC PM Atlas">
      <img class="logo-color" src="assets/brand/ale-primary-logo-horizontal.png" alt="Alcatel-Lucent Enterprise">
      <img class="logo-white" src="assets/brand/ale-primary-logo-horizontal-white.png" alt="Alcatel-Lucent Enterprise">
      <span class="divider" aria-hidden="true"></span>
      <span class="brand-title">SONiC PM <span class="lite">Atlas</span></span>
    </a>
    <span class="ver-badge">v1.1 · ALE WebUI</span>
${NAV}
${TOOLS}
  </header>
  <div class="nav-scrim" id="navScrim" hidden></div>`;
}

function page({ title, description, breadcrumb, kicker, h1, lead, tags, body, side, prev, next }) {
  const crumb = breadcrumb
    ? `<nav class="breadcrumb" aria-label="面包屑">${breadcrumb.map((c) =>
        c.href ? `<a href="${c.href}">${c.label}</a>` : `<span aria-current="page">${c.label}</span>`
      ).join('<span class="sep" aria-hidden="true">/</span>')}</nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#6b489d">
  <meta name="description" content="${description}">
  <title>${title} · SONiC PM Atlas</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/atlas.css">
</head>
<body>
  <a class="skip-link" href="#main">跳到主要内容</a>
${topbar()}
  <main class="main" id="main" tabindex="-1">
    <div class="container">
${crumb}
      <header class="page-header">
        <p class="section-kicker">${kicker}</p>
        <h1>${h1}</h1>
        <p class="page-lead">${lead}</p>
        <div class="meta-row">${(tags || []).map(t => `<span class="tag ${t.cls || ''}">${t.text}</span>`).join('')}</div>
      </header>
      <div class="content-grid">
        <article class="prose">
${body}
        </article>
        <aside class="side-panel">
${side}
        </aside>
      </div>
      <nav class="page-nav" aria-label="上一页下一页">
        ${prev ? `<a href="${prev.href}">← ${prev.label}</a>` : '<a href="index.html">← 返回首页</a>'}
        ${next ? `<a href="${next.href}">${next.label} →</a>` : '<a href="index.html">返回首页 →</a>'}
      </nav>
      <footer class="site-footer">SONiC PM Atlas · 结论要能对上版本、型号、证据和负责人</footer>
    </div>
  </main>
  <script src="js/app.js" defer></script>
</body>
</html>
`;
}

for (const d of [day01, day02, day03]) {
  fs.writeFileSync(path.join(root, d.file), page(d), 'utf8');
  console.log('wrote', d.file);
}

for (const t of tracks) {
  const idx = Number(t.num);
  const prev = idx === 1
    ? { href: 'day-03.html', label: '第 3 天 · 试点验收' }
    : { href: `track-${String(idx - 1).padStart(2, '0')}.html`, label: `能力线 ${String(idx - 1).padStart(2, '0')}` };
  const next = idx === 6
    ? { href: 'glossary.html', label: '术语与四态' }
    : { href: `track-${String(idx + 1).padStart(2, '0')}.html`, label: `能力线 ${String(idx + 1).padStart(2, '0')}` };
  fs.writeFileSync(path.join(root, t.file), page({
    title: `${t.num} ${t.title}`,
    description: t.lead,
    kicker: `12 周能力线 / ${t.week}`,
    h1: `${t.num} · ${t.title}`,
    lead: t.lead,
    tags: [{ text: t.week }, { text: '能力线', cls: 'info' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '能力线', href: 'index.html#capability-map' },
      { label: t.title },
    ],
    body: t.body,
    side: t.side,
    prev, next,
  }), 'utf8');
  console.log('wrote', t.file);
}

for (const p of [glossary, checklist, cases]) {
  fs.writeFileSync(path.join(root, p.file), page(p), 'utf8');
  console.log('wrote', p.file);
}
