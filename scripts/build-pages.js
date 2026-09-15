const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

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
    <span class="ver-badge">v1.0 · ALE WebUI</span>
${NAV}
${TOOLS}
  </header>
  <div class="nav-scrim" id="navScrim" hidden></div>`;
}

function page({ title, description, breadcrumb, kicker, h1, lead, tags, body, side, prev, next }) {
  const crumb = breadcrumb
    ? `<nav class="breadcrumb" aria-label="面包屑">${breadcrumb.map((c, i) =>
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

const days = [
  {
    file: 'day-01.html',
    title: '第 1 天 · 产品地图',
    description: 'SONiC 交换机产品经理第 1 天：分清芯片、整机、NOS 与商业支持各自负责什么。',
    kicker: '入门 / 第 1 天',
    h1: '产品地图：先分清谁负责什么',
    lead: '第 1 天不背命令、不刷命令行。先把坐标系立起来：芯片能力、平台适配、镜像来源、硬件型号、测试加固、售后支持，每一层都要能对应到具体版本和负责人。',
    tags: [{ text: '第 1 天' }, { text: '产品地图' }, { text: '责任划分', cls: 'info' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '3 天入门', href: 'day-01.html' },
      { label: '第 1 天' },
    ],
    prev: { href: 'index.html', label: '返回首页' },
    next: { href: 'day-02.html', label: '第 2 天 · 功能证据' },
    body: `
<h2>今天要解决什么</h2>
<p>“支持 SONiC”这句话，在不同材料里说的往往不是同一层。芯片厂说 SAI 开放了哪些能力，不等于某块板卡、某个商业镜像或客户现场已经获得支持。产品经理第 1 天就要把这句话拆开。</p>
<ul>
  <li><strong>芯片 / SDK / SAI</strong>：能力边界在上游接口层，必须核对 ASIC 驱动和 SAI 版本是否锁死。</li>
  <li><strong>平台 / 整机 / 白牌</strong>：ONIE、CPLD、光模块兼容矩阵，必须落到具体型号（SKU）。</li>
  <li><strong>NOS 发行版</strong>：社区镜像、商业发行版、厂商加固版，责任边界完全不同。</li>
  <li><strong>服务与支持</strong>：技术支持层级、补丁节奏、生命周期，要能对上合同和发布计划。</li>
</ul>
<div class="callout"><strong>硬性原则：</strong>同一颗 ASIC，不同板卡设计不能当成同一种支持状态；芯片级公开能力，不能直接说成客户现场已经支持。</div>
<h2>一小时动手</h2>
<ol>
  <li>拿一份厂商公开资料，标出它说的是哪一层（芯片 / 平台 / 镜像 / 服务）。</li>
  <li>写下目标 NOS 版本、目标型号、证据链接、负责人这四项。</li>
  <li>凡是说不清版本和平台的结论，标成「待核对」，不要写成「已有数据」。</li>
</ol>
<h2>本日产出</h2>
<p>一张责任链示意，加一份核验包草稿：目标 NOS 版本与镜像、目标型号、证据链接、负责人。这是第 2 天写功能证据的输入。</p>
`,
    side: `
<div class="panel">
  <h2>今日检查点</h2>
  <ul class="gate-list">
    <li><span class="gate-dot ok"></span><span>能分清社区版 / 商业版 / 厂商加固版</span></li>
    <li><span class="gate-dot"></span><span>能说清：SAI 开放能力 ≠ 该型号已支持</span></li>
    <li><span class="gate-dot warn"></span><span>草稿路线图不做正式发布承诺</span></li>
    <li><span class="gate-dot err"></span><span>不外传保密图表与未公开材料</span></li>
  </ul>
</div>
<div class="panel">
  <h2>下一步</h2>
  <ul>
    <li>第 2 天：把功能名写成可验收场景</li>
    <li>供应链能力线：芯片与白牌整机</li>
  </ul>
</div>`,
  },
  {
    file: 'day-02.html',
    title: '第 2 天 · 功能证据',
    description: '把 SONiC 功能清单写成可验收的证据：设备、拓扑、版本、日志和负责人。',
    kicker: '入门 / 第 2 天',
    h1: '功能证据：从功能名到可验收场景',
    lead: '“支持 RoCE/EVPN”不能直接写进定型表。要写清楚在什么拓扑、什么拥塞、什么故障、什么升级条件下验证过，并绑定版本、配置、日志、负责人和风险签字人。',
    tags: [{ text: '第 2 天' }, { text: '功能证据' }, { text: '参数四态', cls: 'ok' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '3 天入门', href: 'day-01.html' },
      { label: '第 2 天' },
    ],
    prev: { href: 'day-01.html', label: '第 1 天 · 产品地图' },
    next: { href: 'day-03.html', label: '第 3 天 · 试点验收' },
    body: `
<h2>证据怎么写</h2>
<table class="matrix">
  <thead><tr><th>字段</th><th>要写清楚</th><th>常见问题</th></tr></thead>
  <tbody>
    <tr><td>被测设备 / 芯片</td><td>目标型号、芯片系列、板卡版本</td><td>只写芯片型号</td></tr>
    <tr><td>拓扑 / 负载</td><td>被测设备 + 交换机 + 流量仪，速率、队列、缓冲</td><td>用功能清单代替测试环境</td></tr>
    <tr><td>条件</td><td>拥塞、故障、升级/回退、光模块组合</td><td>只测顺利路径</td></tr>
    <tr><td>证据</td><td>日志、配置、报告页码、哈希、链接</td><td>口头结论、截图不带版本</td></tr>
    <tr><td>责任</td><td>负责人、风险签字人、补丁窗口</td><td>没人签字的「已支持」</td></tr>
  </tbody>
</table>
<h2>参数四态（语义不可弱化）</h2>
<ul>
  <li><strong>有值</strong>：原文已核对，可回溯。</li>
  <li><strong>待复核</strong>：系统推测或未对过原文，必须人工再核。</li>
  <li><strong>未披露</strong>：公开材料没写，不等于不支持。</li>
  <li><strong>抽取失败</strong>：解析失败，不等于功能不存在。</li>
</ul>
<div class="callout"><strong>注意：</strong>写了测试覆盖点，不能代替吞吐、时延、收敛、无损、规模或跨光模块组合的验收结论。</div>
`,
    side: `
<div class="panel">
  <h2>声明门禁</h2>
  <ul class="gate-list">
    <li><span class="gate-dot"></span><span>型号已写明</span></li>
    <li><span class="gate-dot"></span><span>版本已锁定</span></li>
    <li><span class="gate-dot ok"></span><span>证据链接可打开</span></li>
    <li><span class="gate-dot warn"></span><span>负责人已签字</span></li>
  </ul>
</div>`,
  },
  {
    file: 'day-03.html',
    title: '第 3 天 · 试点验收',
    description: 'SONiC 产品试点验收清单、交付包和支持边界怎么定。',
    kicker: '入门 / 第 3 天',
    h1: '试点验收：结论要能交付、能追责',
    lead: '试点不是演示。交付包、验收表、服务级别、生命周期预警，要在试点阶段就写进产品定义，不能等上线后再补。',
    tags: [{ text: '第 3 天' }, { text: '试点验收' }, { text: '商业化', cls: 'warn' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '3 天入门', href: 'day-01.html' },
      { label: '第 3 天' },
    ],
    prev: { href: 'day-02.html', label: '第 2 天 · 功能证据' },
    next: { href: 'track-01.html', label: '进入供应链能力线' },
    body: `
<h2>试点检查清单</h2>
<ul>
  <li>拓扑与规模：是否覆盖客户真实组网，而不是实验室简化环境。</li>
  <li>异常场景：MAC 泛洪、BGP 震荡、端口闪断、PFC 风暴下的恢复时间。</li>
  <li>交付包：整机、NOS、光模块与服务是否同一基线出厂/交付。</li>
  <li>升级与回退：窗口、失败恢复、数据保全是否演练过。</li>
  <li>支持边界：技术支持层级、补丁周期、返修与停产预警是否写进合同。</li>
</ul>
<h2>从社区代码到可交付版本</h2>
<p>最小证据链通常包括：社区分支基线、必要补丁取舍、持续集成与测试、平台验证、缺陷关闭记录、发布门禁。这是方法示例，不是任一正式版本的公开支持清单——对外材料里要把边界写清楚。</p>
`,
    side: `
<div class="panel">
  <h2>试点产出</h2>
  <ul>
    <li>验收表（满足 / 不满足 / 未知）</li>
    <li>交付包基线清单</li>
    <li>风险与负责人表</li>
    <li>是否放量扩大试点</li>
  </ul>
</div>`,
  },
];

const tracks = [
  {
    file: 'track-01.html', num: '01', nav: 'track-01',
    title: '芯片与白牌供应链',
    week: '第 1–2 周',
    lead: '同一颗芯片，是否已经形成同一块可交付板卡的 SDK、SAI、平台插件和诊断基线？这是供应链和产品定型的第一道关。',
    body: `
<h2>学习重点</h2>
<ul>
  <li>ASIC 驱动与 SAI 版本严格锁定；不同板卡设计不能当成同一种支持状态。</li>
  <li>白牌准入：原理图、ONIE 固件、CPLD、光模块/线缆兼容矩阵，以及实验室实测证据。</li>
  <li>双电源、气流、温升等硬件准入项，是否写进产品定义，而不是售后再打补丁。</li>
</ul>
<h2>核对问题</h2>
<ol>
  <li>目标型号的板级版本和固件基线是什么？</li>
  <li>兼容矩阵有没有同版本实验室证据？</li>
  <li>芯片级能力和目标镜像/硬件型号，是否分开陈述？</li>
</ol>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>型号对照表</li><li>兼容矩阵草稿</li><li>供应链风险清单</li></ul></div>`,
  },
  {
    file: 'track-02.html', num: '02', nav: 'track-02',
    title: '架构与版本工程',
    week: '第 3–4 周',
    lead: '目标版本的分支策略、补丁清单和多仓库依赖是否锁定？没有版本工程，就没有可长期服务的产品。',
    body: `
<h2>学习重点</h2>
<ul>
  <li>社区基线 → 平台插件 → 目标镜像的依赖链，如何与发布节奏对齐。</li>
  <li>多仓库依赖（sonic-buildimage / swss / sairedis / utilities）如何进入物料清单。</li>
  <li>升级与回退：失败恢复是否写进版本定义。</li>
</ul>
<div class="callout"><strong>注意：</strong>公开架构图和流程可以用来提出验证问题，但不能绕过版本门禁和平台门禁。</div>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>分支与发布节奏图</li><li>补丁物料清单</li><li>升级/回退策略</li></ul></div>`,
  },
  {
    file: 'track-03.html', num: '03', nav: 'track-03',
    title: '测试与可运营性',
    week: '第 5–6 周',
    lead: '测试环境是否贴近客户真实组网？异常场景和运维能力，如何写进产品验收。',
    body: `
<h2>学习重点</h2>
<ul>
  <li>被测设备 + 交换机 + 流量仪要对齐真实环境，不能「能通就行」。</li>
  <li>异常测试：MAC 泛洪、BGP 震荡、端口闪断的恢复时间指标。</li>
  <li>可运维性：gNMI/gNOI/REST、Syslog、告警与诊断是否进入交付清单。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>测试环境定义</li><li>异常用例集</li><li>运维验收清单</li></ul></div>`,
  },
  {
    file: 'track-04.html', num: '04', nav: 'track-04',
    title: '开源社区与上游',
    week: '第 7–8 周',
    lead: '上游贡献和商业发行要分开看。社区做得好，不等于你的发行版可以对外承诺支持。',
    body: `
<h2>学习重点</h2>
<ul>
  <li>社区贡献路径、代码评审周期与回归测试套件。</li>
  <li>OCP / 开放硬件与商业整机的边界在哪里。</li>
  <li>把「我们参与上游」变成可核对的提交记录、版本号和回归证据。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>上游策略一页纸</li><li>贡献证据清单</li><li>社区/商业边界说明</li></ul></div>`,
  },
  {
    file: 'track-05.html', num: '05', nav: 'track-05',
    title: '定型与跨部门协同',
    week: '第 9–10 周',
    lead: '定型表不是用来汇报的 PPT。研发、测试、供应链、支持要在同一份检查表上对齐负责人和截止时间。',
    body: `
<h2>学习重点</h2>
<ul>
  <li>竞品分析与产品定型核验包，最少要有哪些字段。</li>
  <li>跨部门检查点：谁签字、何时过期、基线更新后如何复核。</li>
  <li>确认结果绑定基线哈希：资料一更新，旧结论自动作废。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>定型核验包</li><li>职责与负责人表</li><li>检查点日历</li></ul></div>`,
  },
  {
    file: 'track-06.html', num: '06', nav: 'track-06',
    title: '商业化与生命周期',
    week: '第 11–12 周',
    lead: '报价和定型表要写清：镜像来源、许可证、安全漏洞责任、升级窗口、技术支持层级、平台与硬件生命周期。',
    body: `
<h2>学习重点</h2>
<ul>
  <li>商业 SONiC 发行版 vs 自己维护开源版：总体拥有成本和补丁周期怎么比。</li>
  <li>支持合同：服务级别、返修、停产/变更通知是否写进去。</li>
  <li>生命周期预警如何回流到产品路线和备件策略。</li>
</ul>
<div class="callout"><strong>本阶段验收：</strong>每一个产品结论都能回到版本、平台、证据和负责人——这是 12 周训练的终点。</div>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>商业化一页纸</li><li>支持边界说明</li><li>生命周期风险表</li></ul></div>`,
  },
];

const trackTitles = {
  'track-01': '供应链', 'track-02': '架构', 'track-03': '测试',
  'track-04': '社区', 'track-05': '定型', 'track-06': '商业化',
};

for (const d of days) {
  fs.writeFileSync(path.join(root, d.file), page(d), 'utf8');
  console.log('wrote', d.file);
}

for (const t of tracks) {
  const idx = Number(t.num);
  const prev = idx === 1
    ? { href: 'day-03.html', label: '第 3 天 · 试点验收' }
    : { href: `track-${String(idx - 1).padStart(2, '0')}.html`, label: `能力线 ${String(idx - 1).padStart(2, '0')}` };
  const next = idx === 6
    ? { href: 'index.html', label: '返回首页' }
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
