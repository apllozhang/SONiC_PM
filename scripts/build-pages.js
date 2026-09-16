const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const { day01, day02, day03 } = require('./content-days');
const { tracks, glossary, checklist, cases } = require('./content-tracks');
const { featureMap, ecosystem } = require('./content-p1-pages');
const { levels, faq, toc } = require('./content-p2');
const { quiz } = require('./content-quiz');
const { SITE_VERSION_LABEL, CHANGELOG } = require('./site-meta');

const NAV = `
    <nav class="primary-nav" id="primaryNav" aria-label="主导航">
      <a class="nav-link" href="index.html" data-nav="home">首页</a>
      <a class="nav-link" href="day-01.html" data-nav="intro">3 天入门</a>
      <div class="nav-group">
        <button type="button" class="nav-link nav-group-btn" aria-expanded="false" aria-haspopup="true">能力线</button>
        <div class="nav-menu" role="menu">
          <a href="track-01.html" data-nav="track-01">01 供应链</a>
          <a href="track-02.html" data-nav="track-02">02 架构</a>
          <a href="track-03.html" data-nav="track-03">03 测试</a>
          <a href="track-04.html" data-nav="track-04">04 社区</a>
          <a href="track-05.html" data-nav="track-05">05 定型</a>
          <a href="track-06.html" data-nav="track-06">06 商业化</a>
        </div>
      </div>
      <div class="nav-group">
        <button type="button" class="nav-link nav-group-btn" aria-expanded="false" aria-haspopup="true">知识库</button>
        <div class="nav-menu" role="menu">
          <a href="feature-map.html" data-nav="feature-map">功能特性地图</a>
          <a href="ecosystem.html" data-nav="ecosystem">版本与生态</a>
        </div>
      </div>
      <div class="nav-group">
        <button type="button" class="nav-link nav-group-btn" aria-expanded="false" aria-haspopup="true">工具</button>
        <div class="nav-menu" role="menu">
          <a href="glossary.html" data-nav="glossary">术语与四态</a>
          <a href="checklist.html" data-nav="checklist">定型核验包</a>
          <a href="cases.html" data-nav="cases">案例拆解</a>
        </div>
      </div>
      <div class="nav-group">
        <button type="button" class="nav-link nav-group-btn" aria-expanded="false" aria-haspopup="true">培训</button>
        <div class="nav-menu" role="menu">
          <a href="levels.html" data-nav="levels">L1–L3 等级</a>
          <a href="faq.html" data-nav="faq">FAQ</a>
          <a href="toc.html" data-nav="toc">全站目录</a>
        </div>
      </div>
      <a class="nav-link" href="changelog.html" data-nav="changelog">更新</a>
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
    <span class="ver-badge">${SITE_VERSION_LABEL}</span>
${NAV}
${TOOLS}
  </header>
  <div class="nav-scrim" id="navScrim" hidden></div>`;
}

function renderTraining(sections) {
  if (!sections?.quiz?.length && !sections?.acceptance?.length) return '';
  let html = '';
  if (sections.acceptance?.length) {
    html += `
<section class="accept-block" aria-labelledby="acc-t">
  <h2 id="acc-t">动手任务验收标准</h2>
  <ul class="accept-list">
    ${sections.acceptance.map((a) => `<li>${a}</li>`).join('\n    ')}
  </ul>
</section>`;
  }
  if (sections.quiz?.length) {
    html += `
<section class="quiz-block" aria-labelledby="quiz-t">
  <h2 id="quiz-t">自测题（点击展开答案）</h2>
  ${sections.quiz.map((it, i) => `
  <details class="quiz-item">
    <summary>自测 ${i + 1}：${it.q}</summary>
    <div class="quiz-a">${it.a}</div>
  </details>`).join('')}
  <p class="quiz-note muted">建议：正确率 ≥ 80% 再进入下一页。培训组织者可按此判分。</p>
</section>`;
  }
  return html;
}

function page({ title, description, breadcrumb, kicker, h1, lead, tags, body, side, prev, next }) {
  const crumb = breadcrumb
    ? `<nav class="breadcrumb" aria-label="面包屑">${breadcrumb.map((c) =>
        c.href ? `<a href="${c.href}">${c.label}</a>` : `<span aria-current="page">${c.label}</span>`
      ).join('<span class="sep" aria-hidden="true">/</span>')}</nav>`
    : '';

  // file name from title slug is passed separately when writing; use data-file via wrapper
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#6b489d">
  <meta name="description" content="${description}">
  <title>${title} · SONiC PM Atlas</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/tokens.css?v=2.1.4">
  <link rel="stylesheet" href="css/base.css?v=2.1.4">
  <link rel="stylesheet" href="css/components.css?v=2.1.4">
  <link rel="stylesheet" href="css/atlas.css?v=2.1.4">
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
      <footer class="site-footer">SONiC PM Atlas ${SITE_VERSION_LABEL} · 结论要能对上版本、型号、证据和负责人 · <a href="changelog.html">更新日志</a></footer>
    </div>
  </main>
  <script src="js/app.js?v=2.1.4" defer></script>
</body>
</html>
`;
}

function writePage(file, data) {
  const t = quiz[file] || {};
  const body = `${data.body}\n${renderTraining(t)}`;
  let html = page({ ...data, body });
  if (file === 'levels.html') {
    html = html.replace(
      /(\s*<script src="js\/app\.js[^"]*" defer><\/script>)/,
      '$1\n  <script src="js/vendor/echarts.min.js?v=2.1.6" defer></script>\n  <script src="js/path-chart.js?v=2.1.7" defer></script>\n  <script src="js/role-chart.js?v=2.1.7" defer></script>\n  <script src="js/level-radar.js?v=2.1.8" defer></script>'
    );
  }
  fs.writeFileSync(path.join(root, file), html, 'utf8');
  console.log('wrote', file);
}

for (const d of [day01, day02, day03]) {
  writePage(d.file, d);
}

for (const t of tracks) {
  const idx = Number(t.num);
  const prev = idx === 1
    ? { href: 'day-03.html', label: '第 3 天 · 试点验收' }
    : { href: `track-${String(idx - 1).padStart(2, '0')}.html`, label: `能力线 ${String(idx - 1).padStart(2, '0')}` };
  const next = idx === 6
    ? { href: 'glossary.html', label: '术语与四态' }
    : { href: `track-${String(idx + 1).padStart(2, '0')}.html`, label: `能力线 ${String(idx + 1).padStart(2, '0')}` };
  writePage(t.file, {
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
  });
}

for (const p of [glossary, checklist, cases, featureMap, ecosystem, levels, faq, toc]) {
  writePage(p.file, p);
}

// CHANGELOG
const changelogBody = `
<h2>如何使用本页</h2>
<p>培训组织与内容评审以本页为基线。改正文请改 <code>scripts/content-*.js</code> 后执行 <code>build-pages.js</code>，并在下表增加版本行与负责人。</p>
${CHANGELOG.map((v) => `
<h2>${v.version} · ${v.date}</h2>
<p><strong>内容负责人：</strong>${v.owner}</p>
<p><strong>摘要：</strong>${v.summary}</p>
<ul>
${v.changes.map((c) => `  <li>${c}</li>`).join('\n')}
</ul>
`).join('\n')}
`;

writePage('changelog.html', {
  title: '更新日志 CHANGELOG',
  description: '站点版本历史、内容负责人与最近评审记录。',
  kicker: '维护',
  h1: '更新日志',
  lead: `当前全站版本 ${SITE_VERSION_LABEL}。内容变更须登记版本、日期、负责人与变更摘要。`,
  tags: [{ text: SITE_VERSION_LABEL }, { text: '内容负责人' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '更新日志' },
  ],
  body: changelogBody,
  side: `
<div class="panel">
  <h2>当前版本</h2>
  <p style="font-family:var(--font-mono);font-size:18px;font-weight:700;color:var(--color-action)">${SITE_VERSION_LABEL}</p>
  <p class="muted" style="font-size:13px">全站顶栏徽章与此一致</p>
</div>
<div class="panel">
  <h2>评审材料</h2>
  <ul>
    <li><a href="review/index.html">评审意见入口</a></li>
    <li><a href="review/2026-09-15-content-review.md">2026-09-15 评审全文</a></li>
  </ul>
</div>`,
  prev: { href: 'cases.html', label: '厂商案例拆解' },
  next: { href: 'index.html', label: '返回首页' },
});
