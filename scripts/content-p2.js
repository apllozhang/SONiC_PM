'use strict';

const levels = {
  file: 'levels.html',
  title: 'L1–L3 能力等级',
  description: '定义 L1–L3 能力等级、考核证据，并映射到 3 天入门与 12 周路线。',
  kicker: '成长梯度',
  h1: 'L1–L3 能力等级与 12 周映射',
  lead: 'L1 会问对问题并核验外部材料；L2 能主导单模块证据；L3 能主持定型与商业化边界。等级用于培训结业与晋升参考，不是职称替代。',
  tags: [{ text: 'P2' }, { text: 'L1–L3' }, { text: '考核' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '成长梯度', href: 'levels.html' },
  ],
  prev: { href: 'cases.html', label: '厂商案例拆解' },
  next: { href: 'faq.html', label: '常见问题 FAQ' },
  body: `
<h2>12 周路径总览</h2>
<p>横轴为周次，色条为该阶段主修内容；标签给出建议等级与岗位侧重。可与下表对照使用。</p>
<div class="chart-wrap" role="img" aria-label="12 周学习路径图：从第 0 周定路径到第 12 周商业化">
  <div id="path-chart" class="path-chart"></div>
</div>
<p class="muted" style="font-size:12px;margin-top:4px">图例说明：色条长度 = 该模块占用周数；L1→L2 表示从入门过渡到可独立做单模块。</p>

<h2>角色覆盖对比</h2>
<p>同一知识底座上，三类岗位的侧重不同。颜色越深表示越建议主修；「了解」表示够用即可，不必按完整产出物考核。</p>
<div class="chart-wrap" role="img" aria-label="角色覆盖对比图：产品经理、售前、测试对六条能力线的主修与了解建议">
  <div id="role-chart" class="path-chart"></div>
</div>
<p class="muted" style="font-size:12px;margin-top:4px">口径：主修 = 要交该线产出物并通过自测；重点 = 关键章节必读；了解 = 能听懂并问对问题即可。</p>

<h2>等级一览</h2>
<table class="matrix">
  <thead><tr><th>等级</th><th>一句话</th><th>能做什么</th><th>考核证据</th><th>对应路线</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>L1</strong></td>
      <td>会问对问题</td>
      <td>分清四层责任；功能名改写成可验收场景；正确用四态</td>
      <td>3 天自测 ≥80%；1 份核验包草稿（场景/型号/版本/证据/负责人）</td>
      <td>第 1–3 天 + 术语页</td>
    </tr>
    <tr>
      <td><strong>L2</strong></td>
      <td>能撑起单模块</td>
      <td>读懂控制面与容器；按功能地图定位验证命令；独立收集供应链或测试床证据</td>
      <td>架构/测试自测 + 1 条能力线产出物（兼容矩阵或异常用例集等）</td>
      <td>供应链/架构/测试/社区 中主修 2 条</td>
    </tr>
    <tr>
      <td><strong>L3</strong></td>
      <td>能定型与商业化</td>
      <td>主持定型核验包评审；对齐商业 vs 社区责任；对外不越证据边界</td>
      <td>完整 10 字段核验包 + 模拟定型会纪要；商业化一页纸 + 支持边界说明</td>
      <td>定型/商业化 + 案例页售前与测试口径</td>
    </tr>
  </tbody>
</table>

<h2>12 周映射表</h2>
<table class="matrix">
  <thead><tr><th>周次</th><th>内容</th><th>建议等级目标</th><th>产出物</th></tr></thead>
  <tbody>
    <tr><td>第 0 周</td><td>角色路径 + 术语</td><td>—</td><td>选定 PM/售前/测试路径</td></tr>
    <tr><td>第 1 周（3 天）</td><td>产品地图 / 功能证据 / 试点验收</td><td>L1</td><td>核验包草稿 + 自测达标</td></tr>
    <tr><td>第 1–2 周</td><td>供应链</td><td>L1→L2</td><td>型号对照表、HCL 草稿</td></tr>
    <tr><td>第 3–4 周</td><td>架构与版本工程</td><td>L2</td><td>补丁 BOM、重启策略表</td></tr>
    <tr><td>第 5–6 周</td><td>测试与可运维性</td><td>L2</td><td>异常用例集、测试床差异表</td></tr>
    <tr><td>第 7–8 周</td><td>开源社区与上游</td><td>L2</td><td>上游策略、贡献证据清单</td></tr>
    <tr><td>第 9–10 周</td><td>定型与跨部门</td><td>L2→L3</td><td>可签字核验包</td></tr>
    <tr><td>第 11–12 周</td><td>商业化与生命周期</td><td>L3</td><td>商业化一页纸、支持边界</td></tr>
  </tbody>
</table>

<h2>角色 × 等级（结业口径）</h2>
<table class="matrix">
  <thead><tr><th>角色</th><th>L1 必过</th><th>L2 建议</th><th>L3 结业加项</th></tr></thead>
  <tbody>
    <tr>
      <td>PM</td>
      <td>3 天 + 核验包草稿</td>
      <td>主修定型相关 2 条线</td>
      <td>模拟定型会主持 + 商业化一页纸</td>
    </tr>
    <tr>
      <td>售前</td>
      <td>3 天 + 案例六层追问 1 则</td>
      <td>供应链 + 测试 + 商业化要点</td>
      <td>3 份「客户原句→可承诺」且证据齐全</td>
    </tr>
    <tr>
      <td>测试</td>
      <td>第 2–3 天 + 四态与证据</td>
      <td>架构 + 测试线产出物</td>
      <td>异常用例集 + 诊断包说明可评审</td>
    </tr>
  </tbody>
</table>

<h2>使用说明</h2>
<ol>
  <li>每完成一页自测与验收，在进度表勾选；导师按「考核证据」抽查。</li>
  <li>未达 L1 不进入 12 周主修，避免只会名词。</li>
  <li>L3 结业材料可归档为团队模板，新员工以旧材料为练习样本（脱敏后）。</li>
</ol>
`,
  side: `<div class="panel"><h2>配套</h2><ul>
    <li><a href="index.html#training">培训安排</a></li>
    <li><a href="toc.html">全站目录</a></li>
    <li><a href="faq.html">FAQ</a></li>
  </ul></div>`,
};

const faq = {
  file: 'faq.html',
  title: '常见问题 FAQ',
  description: '从各页核对问题沉淀的培训 FAQ，覆盖四态、证据、版本、试点与商业化。',
  kicker: '工具',
  h1: '常见问题 FAQ',
  lead: '答案尽量短、可执行；若与正式文档冲突，以目标发行版官方文档与合同为准。',
  tags: [{ text: 'P2' }, { text: 'FAQ' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '工具', href: 'faq.html' },
  ],
  prev: { href: 'levels.html', label: 'L1–L3 能力等级' },
  next: { href: 'toc.html', label: '全站目录' },
  body: `
<h2>方法与四态</h2>
<details class="quiz-item"><summary>未披露能不能写「不支持」？</summary><div class="quiz-a">不能。未披露只是公开材料没写，应提问或标待核。</div></details>
<details class="quiz-item"><summary>「待复核」能进报价承诺吗？</summary><div class="quiz-a">不能单独作为承诺依据。承诺前需升为「有值」并附证据，或书面标风险。</div></details>
<details class="quiz-item"><summary>抽取失败等于功能没有吗？</summary><div class="quiz-a">不等于。换资料源或人工读原文后再标四态。</div></details>

<h2>证据与定型</h2>
<details class="quiz-item"><summary>定型表空白行算通过吗？</summary><div class="quiz-a">不算。标未知并指定 Owner，禁止空白通过。</div></details>
<details class="quiz-item"><summary>为什么要绑基线哈希？</summary><div class="quiz-a">资料或镜像更新后旧结论失效，避免拿旧事实冒充新事实。</div></details>
<details class="quiz-item"><summary>测试覆盖点能否代替性能验收？</summary><div class="quiz-a">不能。覆盖点 ≠ 吞吐/时延/无损/规模结论。</div></details>

<h2>版本与架构</h2>
<details class="quiz-item"><summary>为什么不能写「最新 SONiC」？</summary><div class="quiz-a">无法复现与追责。写清社区基线、发行版、构建哈希与平台型号。</div></details>
<details class="quiz-item"><summary>同 ASIC 不同板能写同一支持吗？</summary><div class="quiz-a">不能。按 HW-SKU 分开，核对端口映射、光学、固件与证据。</div></details>
<details class="quiz-item"><summary>重启 orchagent 一定不影响业务吗？</summary><div class="quiz-a">不一定。取决于 warm/fast 与实现；产品定义需写明策略与回退。</div></details>

<h2>试点与商业化</h2>
<details class="quiz-item"><summary>试点通过是否等于可 GA？</summary><div class="quiz-a">不等于。还要过定型核验包、支持边界与发布门禁。</div></details>
<details class="quiz-item"><summary>客户自建社区版我们怎么写支持边界？</summary><div class="quiz-a">合同写清：我们支持的镜像与型号范围；社区自建的责任与收费项单独列。</div></details>
<details class="quiz-item"><summary>「未知」在验收表怎么处理？</summary><div class="quiz-a">单独列出，指定 Owner 与风险签字人；不计入「已支持」。</div></details>
`,
  side: `<div class="panel"><h2>相关</h2><ul>
    <li><a href="glossary.html">四态与术语</a></li>
    <li><a href="checklist.html">核验包</a></li>
    <li><a href="levels.html">L1–L3</a></li>
  </ul></div>`,
};

const toc = {
  file: 'toc.html',
  title: '全站目录',
  description: 'SONiC PM Atlas 全站页面目录与建议阅读顺序。',
  kicker: '导航',
  h1: '全站目录',
  lead: '培训组织者可用本页做签到清单；个人可用页内检索框过滤标题。',
  tags: [{ text: 'P2' }, { text: '目录' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '全站目录' },
  ],
  prev: { href: 'faq.html', label: '常见问题 FAQ' },
  next: { href: 'changelog.html', label: '更新日志' },
  body: `
<div class="toc-search">
  <label class="sr-only" for="toc-q">过滤目录</label>
  <input id="toc-q" type="search" placeholder="输入关键词过滤标题…" data-toc-filter>
</div>
<table class="matrix toc-table">
  <thead><tr><th>分组</th><th>页面</th><th>用途</th></tr></thead>
  <tbody>
    <tr><td>入口</td><td><a href="index.html">首页</a></td><td>角色路径、培训说明、能力地图</td></tr>
    <tr><td>入门</td><td><a href="day-01.html">第 1 天 产品地图</a></td><td>四层责任、核验包草稿</td></tr>
    <tr><td>入门</td><td><a href="day-02.html">第 2 天 功能证据</a></td><td>可验收场景、四态</td></tr>
    <tr><td>入门</td><td><a href="day-03.html">第 3 天 试点验收</a></td><td>检查清单、证据链</td></tr>
    <tr><td>能力线</td><td><a href="track-01.html">供应链</a></td><td>ASIC/板卡/HCL</td></tr>
    <tr><td>能力线</td><td><a href="track-02.html">架构与版本</a></td><td>容器、DB、重启矩阵</td></tr>
    <tr><td>能力线</td><td><a href="track-03.html">测试与运维</a></td><td>测试床、异常、遥测</td></tr>
    <tr><td>能力线</td><td><a href="track-04.html">社区与上游</a></td><td>贡献与商业边界</td></tr>
    <tr><td>能力线</td><td><a href="track-05.html">定型协同</a></td><td>跨部门检查点</td></tr>
    <tr><td>能力线</td><td><a href="track-06.html">商业化</a></td><td>报价拆行、生命周期</td></tr>
    <tr><td>知识库</td><td><a href="feature-map.html">功能特性地图</a></td><td>功能×仓库×容器×命令</td></tr>
    <tr><td>知识库</td><td><a href="ecosystem.html">版本与生态</a></td><td>release、ASIC、外链</td></tr>
    <tr><td>工具</td><td><a href="glossary.html">术语与四态</a></td><td>速查</td></tr>
    <tr><td>工具</td><td><a href="checklist.html">定型核验包</a></td><td>10 字段模板</td></tr>
    <tr><td>工具</td><td><a href="cases.html">案例拆解</a></td><td>六层追问 + 售前/测试口径</td></tr>
    <tr><td>梯度</td><td><a href="levels.html">L1–L3</a></td><td>等级与 12 周映射</td></tr>
    <tr><td>工具</td><td><a href="faq.html">FAQ</a></td><td>培训高频问题</td></tr>
    <tr><td>维护</td><td><a href="changelog.html">更新日志</a></td><td>版本与负责人</td></tr>
    <tr><td>评审</td><td><a href="review/index.html">评审意见</a></td><td>内容评审入口</td></tr>
  </tbody>
</table>
`,
  side: `<div class="panel"><h2>建议顺序</h2><ol style="margin:0;padding-left:1.2em;font-size:14px;color:var(--color-text-secondary)">
  <li>首页选角色</li>
  <li>3 天入门</li>
  <li>术语 / 核验包</li>
  <li>主修能力线</li>
  <li>功能地图 / 版本生态</li>
  <li>案例 + L1–L3</li>
</ol></div>`,
};

module.exports = { levels, faq, toc };
