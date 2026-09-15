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
      <footer class="site-footer">SONiC PM Atlas · 结论必须回到版本 / SKU / 证据 / Owner</footer>
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
    title: 'Day 01 产品地图',
    description: 'SONiC 交换机产品经理第一天：建立芯片、整机、NOS 与商业分发的产品地图。',
    kicker: 'Foundation / Day 01',
    h1: '产品地图：先分清责任层',
    lead: '第一天不背命令。先建立坐标系：芯片能力、平台适配、镜像来源、硬件 SKU、测试硬化和支持服务，每一层都要能落到目标版本与 Owner。',
    tags: [{ text: 'Day 01' }, { text: '产品地图' }, { text: '责任链', cls: 'info' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '3 天入门', href: 'day-01.html' },
      { label: 'Day 01' },
    ],
    prev: { href: 'index.html', label: '返回首页' },
    next: { href: 'day-02.html', label: 'Day 02 功能证据' },
    body: `
<h2>今天要解决的问题</h2>
<p>“支持 SONiC”这句话在不同材料里指的不是同一层。芯片商说的 SAI 暴露，不等于某块板卡、某个商业镜像或客户场景已经获支持。产品经理第一天要把这句话拆开。</p>
<ul>
  <li><strong>芯片 / SDK / SAI</strong>：能力边界在上游接口层，必须核对 ASIC 驱动与 SAI 版本锁定。</li>
  <li><strong>平台 / 整机 / 白牌</strong>：ONIE、CPLD、光模块兼容矩阵，必须绑定具体 SKU。</li>
  <li><strong>NOS 发行版</strong>：社区镜像、商业分发、供应商 harden 版本，责任不同。</li>
  <li><strong>服务与支持</strong>：TAC/L3、补丁窗口、生命周期，要能回溯到合同与发布列车。</li>
</ul>
<div class="callout"><strong>铁律：</strong>不能把同 ASIC 的不同板卡设计泛化成相同支持状态；不能把芯片级公开定位外推为客户部署已获支持。</div>
<h2>一小时练习</h2>
<ol>
  <li>拿一份厂商公开页，标出它谈的是哪一层（芯片 / 平台 / 镜像 / 服务）。</li>
  <li>写出目标 NOS release、目标 SKU、证据 URL 与 Owner 四件套。</li>
  <li>对无法回到版本与平台的结论，标成“待核对”，不要升格为“有值”。</li>
</ol>
<h2>输出物</h2>
<p>一张责任链示意 + 一份核验包草稿：目标 NOS / release / 镜像、目标 SKU、证据 URL、Owner。这是 Day 02 写功能证据的输入。</p>
`,
    side: `
<div class="panel">
  <h2>本日门禁</h2>
  <ul class="gate-list">
    <li><span class="gate-dot ok"></span><span>能区分社区 ref / 商业发行 / harden 版</span></li>
    <li><span class="gate-dot"></span><span>能指出 SAI 暴露 ≠ SKU 支持</span></li>
    <li><span class="gate-dot warn"></span><span>对 draft 路线图不做 GA 承诺</span></li>
    <li><span class="gate-dot err"></span><span>不复制保密图表与未公开材料</span></li>
  </ul>
</div>
<div class="panel">
  <h2>下一站</h2>
  <ul>
    <li>Day 02：把功能名改成可验收场景</li>
    <li>供应链能力线：芯片与白牌</li>
  </ul>
</div>`,
  },
  {
    file: 'day-02.html',
    title: 'Day 02 功能证据',
    description: '把 SONiC 功能清单改写成可验收证据：DUT、拓扑、版本、日志与 Owner。',
    kicker: 'Foundation / Day 02',
    h1: '功能证据：从功能名到可验收场景',
    lead: '“支持 RoCE/EVPN”不能直接进定型表。要写成拓扑、拥塞、故障、升级条件下的证据，并绑定版本、配置、日志、Owner 与风险接受人。',
    tags: [{ text: 'Day 02' }, { text: '功能证据' }, { text: '四态语义', cls: 'ok' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '3 天入门', href: 'day-01.html' },
      { label: 'Day 02' },
    ],
    prev: { href: 'day-01.html', label: 'Day 01 产品地图' },
    next: { href: 'day-03.html', label: 'Day 03 试点验收' },
    body: `
<h2>证据模板</h2>
<table class="matrix">
  <thead><tr><th>字段</th><th>要写清楚什么</th><th>常见错误</th></tr></thead>
  <tbody>
    <tr><td>DUT / ASIC</td><td>目标 SKU、芯片族、板卡版本</td><td>只写芯片型号</td></tr>
    <tr><td>拓扑 / 负载</td><td>DUT+Fanout+流量仪，速率、队列、缓冲</td><td>用功能清单代替测试床</td></tr>
    <tr><td>条件</td><td>拥塞、故障、升级/回退、光模块组合</td><td>只报 happy path</td></tr>
    <tr><td>证据</td><td>日志、配置、报告页码、SHA、链接</td><td>口头结论、截图无版本</td></tr>
    <tr><td>责任</td><td>Owner、风险接受人、补丁窗口</td><td>无人签字的“已支持”</td></tr>
  </tbody>
</table>
<h2>四态语义（不许弱化）</h2>
<ul>
  <li><strong>有值</strong>：原文引用已核验，可回溯。</li>
  <li><strong>待复核</strong>：机器推测或未过原文校验，必须人工核对。</li>
  <li><strong>未披露</strong>：公开材料没写，不代表不支持。</li>
  <li><strong>抽取失败</strong>：解析失败，不等于功能不存在。</li>
</ul>
<div class="callout"><strong>对比检查：</strong>测试覆盖点不能替代吞吐、时延、收敛、无损、规模或跨光模块组合的验收结论。</div>
`,
    side: `
<div class="panel">
  <h2>Claim Gate</h2>
  <ul class="gate-list">
    <li><span class="gate-dot"></span><span>SKU 已写明</span></li>
    <li><span class="gate-dot"></span><span>Version 已锁定</span></li>
    <li><span class="gate-dot ok"></span><span>Evidence 可打开</span></li>
    <li><span class="gate-dot warn"></span><span>Owner 已签字</span></li>
  </ul>
</div>`,
  },
  {
    file: 'day-03.html',
    title: 'Day 03 试点验收',
    description: 'SONiC 产品试点验收门禁、交付包与商业化支持边界。',
    kicker: 'Foundation / Day 03',
    h1: '试点验收：让结论能交付、能追责',
    lead: '试点不是演示。交付包、验收矩阵、支持 SLA、生命周期预警，要在试点阶段就写进产品定义，而不是上线后补。',
    tags: [{ text: 'Day 03' }, { text: '试点验收' }, { text: '商业化', cls: 'warn' }],
    breadcrumb: [
      { label: '首页', href: 'index.html' },
      { label: '3 天入门', href: 'day-01.html' },
      { label: 'Day 03' },
    ],
    prev: { href: 'day-02.html', label: 'Day 02 功能证据' },
    next: { href: 'track-01.html', label: '进入供应链能力线' },
    body: `
<h2>试点门禁清单</h2>
<ul>
  <li>目标拓扑与规模：是否覆盖客户真实组网，而非实验室简化拓扑。</li>
  <li>负向条件：MAC 泛洪、BGP 震荡、端口瞬断、PFC 风暴的收敛耗时。</li>
  <li>交付包：整机、NOS、光模块与服务是否同一基线交付。</li>
  <li>升级/回退：窗口、失败恢复、数据保全是否演练过。</li>
  <li>支持边界：TAC/L3、补丁周期、RMA 与 EOL 预警是否写入合同。</li>
</ul>
<h2>从社区代码到可交付版本</h2>
<p>最小证据链通常包括：社区分支基线、必要 PR 选择、CI/CT、平台验证、缺陷关闭记录、发布门禁。它是方法案例，不是任一 release 的公开支持清单——对外材料里要写清边界。</p>
`,
    side: `
<div class="panel">
  <h2>试点输出</h2>
  <ul>
    <li>验收矩阵（满足 / 不满足 / 未知）</li>
    <li>交付包基线清单</li>
    <li>风险与 Owner 表</li>
    <li>是否放行试点扩展</li>
  </ul>
</div>`,
  },
];

const tracks = [
  {
    file: 'track-01.html', num: '01', nav: 'track-01',
    title: '芯片与白牌供应链',
    week: '第 1–2 周',
    lead: '同一芯片家族，是否已形成同一块可交付板卡的 SDK、SAI、平台插件与诊断基线？这是供应链与产品定型的第一道门。',
    body: `
<h2>训练重点</h2>
<ul>
  <li>ASIC 驱动与 SAI 版本严格锁定；不同板卡设计不得泛化为相同支持状态。</li>
  <li>白牌准入：原理图、ONIE 固件、CPLD、光模块/DA 兼容矩阵与实验室烧录证据。</li>
  <li>双 PSU、气流、温升等硬件准入项是否进入产品定义，而非售后补丁。</li>
</ul>
<h2>核验问题</h2>
<ol>
  <li>目标 SKU 的板级版本与固件基线是什么？</li>
  <li>兼容矩阵是否具备同版本实验室证据？</li>
  <li>芯片级能力与目标镜像/硬件 SKU 是否被分开陈述？</li>
</ol>
`,
    side: `<div class="panel"><h2>输出</h2><ul><li>SKU 对齐表</li><li>兼容矩阵草稿</li><li>供应链风险清单</li></ul></div>`,
  },
  {
    file: 'track-02.html', num: '02', nav: 'track-02',
    title: '架构与版本工程',
    week: '第 3–4 周',
    lead: '目标版本的分支策略、patch BOM 与多仓依赖是否锁定？没有版本工程，就没有可服务的产品。',
    body: `
<h2>训练重点</h2>
<ul>
  <li>社区 ref → 平台插件 → 目标镜像的依赖链与发布列车同步。</li>
  <li>多仓依赖（sonic-buildimage / swss / sairedis / utilities）如何进入 BOM。</li>
  <li>升级与回退路径：失败恢复是否进入版本定义。</li>
</ul>
<div class="callout"><strong>注意：</strong>公开架构图与流程可以成为验证问题的输入，不能绕过版本和平台门禁。</div>
`,
    side: `<div class="panel"><h2>输出</h2><ul><li>分支与发布列车图</li><li>patch BOM</li><li>升级/回退策略</li></ul></div>`,
  },
  {
    file: 'track-03.html', num: '03', nav: 'track-03',
    title: '测试与可运营性',
    week: '第 5–6 周',
    lead: '测试床拓扑是否与目标客户真实组网对齐？负向测试与遥测能力如何进入产品验收。',
    body: `
<h2>训练重点</h2>
<ul>
  <li>DUT + Fanout + 流量仪的真实对齐，而不是“能通就行”。</li>
  <li>负向测试：MAC 泛洪、BGP 震荡、端口瞬断的收敛耗时指标。</li>
  <li>可运营性：gNMI/gNOI/REST、Syslog、告警与诊断是否进入交付。</li>
</ul>
`,
    side: `<div class="panel"><h2>输出</h2><ul><li>测试床定义</li><li>负向用例集</li><li>运营验收清单</li></ul></div>`,
  },
  {
    file: 'track-04.html', num: '04', nav: 'track-04',
    title: '开源社区与上游',
    week: '第 7–8 周',
    lead: '上游贡献与商业分发责任要分开看。社区治理好，不等于你的发行版可支持。',
    body: `
<h2>训练重点</h2>
<ul>
  <li>社区贡献路径、review 周期与回归套件。</li>
  <li>OCP / 开放硬件与商业整机的边界。</li>
  <li>把“我们参与上游”翻译成可核验的 PR、版本与回归证据。</li>
</ul>
`,
    side: `<div class="panel"><h2>输出</h2><ul><li>上游策略一页纸</li><li>贡献证据清单</li><li>社区/商业边界说明</li></ul></div>`,
  },
  {
    file: 'track-05.html', num: '05', nav: 'track-05',
    title: '定型与跨部门协同',
    week: '第 9–10 周',
    lead: '定型表不是 PPT。研发、测试、供应链、支持要在同一份门禁上对齐 Owner 与截止时间。',
    body: `
<h2>训练重点</h2>
<ul>
  <li>行业竞争分析与产品定型核验包的最小字段集。</li>
  <li>跨部门门禁：谁签字、何时失效、基线更新后如何复核。</li>
  <li>确认绑定基线哈希：更新后旧结论自动失效。</li>
</ul>
`,
    side: `<div class="panel"><h2>输出</h2><ul><li>定型核验包</li><li>RACI / Owner 表</li><li>门禁日历</li></ul></div>`,
  },
  {
    file: 'track-06.html', num: '06', nav: 'track-06',
    title: '商业化与生命周期',
    week: '第 11–12 周',
    lead: '报价/定型表要写清镜像来源、许可证、CVE 责任、升级窗口、TAC/L3、平台与硬件生命周期。',
    body: `
<h2>训练重点</h2>
<ul>
  <li>商业 SONiC 分发 vs 自主维护开源版的 TCO 与补丁周期。</li>
  <li>支持合同：SLA、RMA、EOL/PCN 响应是否写入。</li>
  <li>生命周期预警如何反哺产品路线图与备件策略。</li>
</ul>
<div class="callout"><strong>收束：</strong>每一个产品结论都能回到版本、平台、证据与责任——这是 12 周训练的终点验收。</div>
`,
    side: `<div class="panel"><h2>输出</h2><ul><li>商业化一页纸</li><li>支持边界说明书</li><li>生命周期风险表</li></ul></div>`,
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
    ? { href: 'day-03.html', label: 'Day 03 试点验收' }
    : { href: `track-${String(idx - 1).padStart(2, '0')}.html`, label: `Track ${String(idx - 1).padStart(2, '0')}` };
  const next = idx === 6
    ? { href: 'index.html', label: '返回首页' }
    : { href: `track-${String(idx + 1).padStart(2, '0')}.html`, label: `Track ${String(idx + 1).padStart(2, '0')}` };
  fs.writeFileSync(path.join(root, t.file), page({
    title: `${t.num} ${t.title}`,
    description: t.lead,
    kicker: `Full-Stack / ${t.week}`,
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
