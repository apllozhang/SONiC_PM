'use strict';
// 站点正文：结构化知识块，避免空洞口号式堆字
// 供 build-pages.js 引用

const day01 = {
  file: 'day-01.html',
  title: '第 1 天 · 产品地图',
  description: '分清芯片、整机、镜像、服务四层责任；建立 SONiC 产品坐标系与核验包草稿。',
  kicker: '入门 / 第 1 天',
  h1: '产品地图：先分清谁负责什么',
  lead: '第 1 天不背命令。先立坐标系：芯片能力、平台适配、镜像来源、硬件型号、测试加固、售后支持，每一层都要能对应到具体版本和负责人。',
  tags: [{ text: '第 1 天' }, { text: '责任划分' }, { text: '核验包' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '3 天入门', href: 'day-01.html' },
    { label: '第 1 天' },
  ],
  prev: { href: 'index.html', label: '返回首页' },
  next: { href: 'day-02.html', label: '第 2 天 · 功能证据' },
  body: `
<h2>为什么「支持 SONiC」不能一句话说完</h2>
<p>同一句话在不同材料里指的往往不是同一层。芯片厂页面写「Enterprise SONiC 支持基于 StrataXGS 的 50 多个 ODM/OEM 平台」，说的是生态范围，不是某一块板卡的硬件兼容列表（HCL）。整机厂页面写「已在 1G–400G 开放交换机上 harden」，说的是方法路径，不等于你的目标型号已进正式支持清单。</p>
<p>产品经理第 1 天的任务，是把「支持」拆成可核对的层，避免把生态声明当成客户现场结论。</p>

<h2>四层责任地图</h2>
<table class="matrix">
  <thead>
    <tr><th>层</th><th>典型对象</th><th>公开材料常写什么</th><th>你必须核对什么</th><th>常见误判</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>芯片 / SDK / SAI</strong></td>
      <td>Tomahawk、Trident、Spectrum、Prestera</td>
      <td>吞吐档位、端口速率、SAI 能力列表</td>
      <td>ASIC 驱动与 SAI 版本是否锁死；内核版本（如 5.10 / 6.1）是否匹配；同 ASIC 不同板卡是否分开陈述</td>
      <td>把「芯片支持 EVPN」写成「本型号支持 EVPN」</td>
    </tr>
    <tr>
      <td><strong>平台 / 整机 / 白牌</strong></td>
      <td>ONIE、CPLD、BIOS、风扇电源、端口映射</td>
      <td>机型矩阵、端口形态、总容量</td>
      <td>目标 HW-SKU 的板级版本、固件基线、光模块/DAC 兼容矩阵、实验室烧录与灌包证据</td>
      <td>同芯片家族的不同板卡当成同一支持状态</td>
    </tr>
    <tr>
      <td><strong>NOS 发行版</strong></td>
      <td>community SONiC、商业发行、厂商加固版</td>
      <td>版本号、功能列表、下载与授权方式</td>
      <td>镜像来源、许可证、补丁清单、升级/回退路径、CVE 责任归属</td>
      <td>社区功能清单直接当商业版承诺</td>
    </tr>
    <tr>
      <td><strong>服务与支持</strong></td>
      <td>技术支持层级、RMA、生命周期</td>
      <td>服务网络、响应级别</td>
      <td>合同里的 SLA、补丁窗口、停产/变更通知、现场与远程边界</td>
      <td>市场页「全球服务」= 你的项目有专属响应</td>
    </tr>
  </tbody>
</table>

<h2>责任链示意（读法）</h2>
<ol>
  <li><strong>芯片级能力</strong>：SAI/SDK 暴露了什么，是接口事实，不是交付承诺。</li>
  <li><strong>平台适配</strong>：驱动、插件、端口映射、热电诊断是否按该板卡锁定。</li>
  <li><strong>镜像交付</strong>：谁编译、谁签名、谁提供补丁、升级怎么回退。</li>
  <li><strong>硬件与光学</strong>：HCL 是否有同版本实验室证据，而不是 PPT 矩阵。</li>
  <li><strong>测试与硬化</strong>：是否有问题单、补丁、测试床、缺陷关闭记录。</li>
  <li><strong>支持服务</strong>：出问题找谁、多久响应、备件与停产怎么通知。</li>
</ol>
<div class="callout"><strong>硬性原则：</strong>不能把同 ASIC 的不同板卡设计泛化成相同支持状态；不能把芯片级公开定位外推为客户部署已获支持。</div>

<h2>案例：三句话里的三个陷阱</h2>
<table class="matrix">
  <thead><tr><th>材料原句（示意）</th><th>陷阱</th><th>产品经理应改写为</th></tr></thead>
  <tbody>
    <tr>
      <td>「支持 StrataXGS Tomahawk / Trident 的 50+ 平台」</td>
      <td>生态范围 ≠ 单一 SKU HCL</td>
      <td>目标型号 × 端口分拆 × 光模块 × 镜像版本，是否在本项目 HCL 上</td>
    </tr>
    <tr>
      <td>「已在开放交换机上 harden」</td>
      <td>方法标签 ≠ 可追溯发布</td>
      <td>每个目标补丁是否有 Issue/PR、CI、DUT、测试床、已知限制与负责人</td>
    </tr>
    <tr>
      <td>「商用 Enterprise SONiC 含 EVPN/VXLAN」</td>
      <td>功能名 ≠ 场景验收</td>
      <td>在何拓扑、何拥塞、何故障、何升级条件下验证过（见第 2 天）</td>
    </tr>
  </tbody>
</table>

<h2>一小时动手（有产出）</h2>
<ol>
  <li>打开一份厂商公开页，用荧光笔标出它说的是哪一层（芯片 / 平台 / 镜像 / 服务）。</li>
  <li>按下面模板写 <strong>核验包草稿</strong>（可整段复制到备忘录）：</li>
</ol>
<table class="matrix">
  <thead><tr><th>字段</th><th>填写要求</th><th>你的值</th></tr></thead>
  <tbody>
    <tr><td>目标场景</td><td>园区接入 / 数据中心 / AI Fabric 等</td><td></td></tr>
    <tr><td>目标客户 / 拓扑</td><td>规模、跨地域、是否有 RoCE</td><td></td></tr>
    <tr><td>目标型号 / ASIC</td><td>板卡版本也要写</td><td></td></tr>
    <tr><td>目标 NOS / 版本 / 镜像</td><td>社区 or 商业，下载与授权方式</td><td></td></tr>
    <tr><td>SDK / SAI / 平台插件</td><td>版本号与锁定方式</td><td></td></tr>
    <tr><td>硬件、光模块与 HCL</td><td>是否有同版本实验室证据</td><td></td></tr>
    <tr><td>证据链接与负责人</td><td>URL 可打开，人可联系</td><td></td></tr>
    <tr><td>已知限制与风险签字人</td><td>谁接受「未知」项</td><td></td></tr>
  </tbody>
</table>
<ol start="3">
  <li>对无法回到版本与平台的结论，一律标「待核对」，不要写成「已有数据」。</li>
</ol>

<h2>今日检查点</h2>
<ul>
  <li>能用一句话向研发解释：为什么「SAI 开放了 EVPN」不等于「这块板已支持」。</li>
  <li>核验包草稿至少填满：场景、型号、NOS 版本、证据链接、负责人。</li>
  <li>知道 draft 路线图不能写进对外 GA 承诺。</li>
  <li>知道保密图表与未公开材料不得复制进学习笔记再外传。</li>
</ul>

<h2>延伸（进阶读）</h2>
<ul>
  <li>控制面简图：用户/管理写入 <code>CONFIG_DB</code> → OrchAgent 转成 SAI 对象 → <code>ASIC_DB</code> → <code>syncd</code> 下发芯片。第 1 天只需知道「意图要经过这条链」，细节在「架构」能力线。</li>
  <li>术语：HCL、HW-SKU、ONIE、CPLD、SAI、syncd 见 <a href="glossary.html">术语与参数四态</a>。</li>
</ul>
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
  <h2>本日产出</h2>
  <ul>
    <li>责任链示意（六层）</li>
    <li>核验包草稿（八字段）</li>
    <li>三条材料改写练习</li>
  </ul>
</div>
<div class="panel">
  <h2>下一步</h2>
  <ul>
    <li>第 2 天：把功能名写成可验收场景</li>
    <li>工具页：<a href="checklist.html">产品定型核验包</a></li>
  </ul>
</div>`,
};

const day02 = {
  file: 'day-02.html',
  title: '第 2 天 · 功能证据',
  description: '把功能清单写成可验收证据：拓扑、拥塞、故障、版本、日志与负责人；参数四态不可弱化。',
  kicker: '入门 / 第 2 天',
  h1: '功能证据：从功能名到可验收场景',
  lead: '「支持 RoCE/EVPN」不能直接进定型表。要写清楚在什么拓扑、什么拥塞、什么故障、什么升级条件下验证过，并绑定版本、配置、日志、负责人和风险签字人。',
  tags: [{ text: '第 2 天' }, { text: '功能证据' }, { text: '参数四态' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '3 天入门', href: 'day-01.html' },
    { label: '第 2 天' },
  ],
  prev: { href: 'day-01.html', label: '第 1 天 · 产品地图' },
  next: { href: 'day-03.html', label: '第 3 天 · 试点验收' },
  body: `
<h2>功能名为什么不够用</h2>
<p>定型表里写「支持 RoCEv2 over VXLAN」，评审时几乎无法反驳，也无法验收。可验收写法是把场景拆开：Leaf 封装、Spine 隧道转发、Leaf 解封装分别测什么；EVPN/VXLAN 至少区分 L2、L3 对称与 L3 非对称路径；队列/缓冲、PFC/ECN 参数、拥塞点、性能目标、故障恢复、日志与回退条件是否都写明。</p>
<p>测试覆盖点不能代替吞吐、时延、收敛、无损、规模或跨光模块组合的验收结论。</p>

<h2>证据五要素模板</h2>
<table class="matrix">
  <thead>
    <tr><th>字段</th><th>要写清楚</th><th>常见问题</th><th>合格示例（示意）</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>被测设备 / 芯片</td>
      <td>目标型号、芯片系列、板卡版本</td>
      <td>只写芯片型号</td>
      <td>型号 A / Trident 4 / 板卡 B1</td>
    </tr>
    <tr>
      <td>拓扑 / 负载</td>
      <td>被测设备 + 交换机 + 流量仪，速率、队列、缓冲</td>
      <td>用功能清单代替测试环境</td>
      <td>2 Leaf + 1 Spine，100G，PFC 阈值 …</td>
    </tr>
    <tr>
      <td>条件</td>
      <td>拥塞、故障、升级/回退、光模块组合</td>
      <td>只测顺利路径</td>
      <td>上行丢包 1% 时 RoCE 完成时间；端口闪断恢复 &lt; X 秒</td>
    </tr>
    <tr>
      <td>证据</td>
      <td>日志、配置、报告页码、哈希、链接</td>
      <td>口头结论、截图不带版本</td>
      <td>报告第 N 页 + 配置片段 + 镜像 SHA</td>
    </tr>
    <tr>
      <td>责任</td>
      <td>负责人、风险签字人、补丁窗口</td>
      <td>没人签字的「已支持」</td>
      <td>张三签字；风险由李四接受；补丁双周</td>
    </tr>
  </tbody>
</table>

<h2>把功能名改成场景（练习表）</h2>
<table class="matrix">
  <thead><tr><th>功能名（不要直接用）</th><th>可验收改写</th><th>需要的证据</th></tr></thead>
  <tbody>
    <tr>
      <td>支持 EVPN/VXLAN</td>
      <td>在 L2 与 L3 对称路径下，指定租户规模与网关角色，验证 ARP/路由学习与收敛时间</td>
      <td>拓扑图、配置、学习与收敛日志、时间戳</td>
    </tr>
    <tr>
      <td>支持 RoCE</td>
      <td>指定 PFC/ECN 阈值与拥塞点，测无损传输完成时间与暂停帧风暴范围</td>
      <td>队列配置、流量仪报告、交换机计数器</td>
    </tr>
    <tr>
      <td>支持热升级</td>
      <td>指定升级窗口内业务中断上限、失败回退步骤与数据保全结果</td>
      <td>升级前后版本、回退演练记录、业务监控曲线</td>
    </tr>
    <tr>
      <td>支持遥测</td>
      <td>指定订阅路径与采样间隔，测推送时延与丢点率；断网后本地自治行为</td>
      <td>gNMI 配置、抓包或服务端日志、断网演练</td>
    </tr>
  </tbody>
</table>

<h2>参数四态（语义不可弱化）</h2>
<table class="matrix">
  <thead><tr><th>状态</th><th>含义</th><th>允许写进定型表？</th><th>下一步动作</th></tr></thead>
  <tbody>
    <tr><td><strong>有值</strong></td><td>原文已核对，可回溯</td><td>可以，附引用</td><td>归档</td></tr>
    <tr><td><strong>待复核</strong></td><td>系统推测或未对过原文</td><td>可以，但必须标待复核</td><td>人工核对原文</td></tr>
    <tr><td><strong>未披露</strong></td><td>公开材料没写</td><td>可以，标未披露</td><td>向厂商提问，不默认不支持</td></tr>
    <tr><td><strong>抽取失败</strong></td><td>解析失败</td><td>可以，标失败</td><td>换资料源或人工读原文</td></tr>
  </tbody>
</table>
<div class="callout"><strong>对比检查：</strong>写了「已测」，仍不能代替吞吐、时延、收敛、无损、规模或跨光模块组合的验收结论。覆盖点 ≠ 验收结论。</div>

<h2>一小时动手</h2>
<ol>
  <li>从厂商彩页或白皮书抽 3 个功能名，按上表各改写一条「设备 + 条件 + 证据 + 负责人」。</li>
  <li>把无法证明的项标「待复核」，不要删除。</li>
  <li>为每条证据补上版本绑定：目标 release 与配置摘要。</li>
</ol>

<h2>声明门禁（出门前自检）</h2>
<ul>
  <li>型号、版本已写明，不是系列名。</li>
  <li>证据链接可打开，且带版本号或哈希。</li>
  <li>负责人已确认；风险项有签字人。</li>
  <li>四态标注完整，没有把「未披露」写成「不支持」或「已支持」。</li>
</ul>
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
</div>
<div class="panel">
  <h2>本日产出</h2>
  <ul>
    <li>3 条场景化功能证据</li>
    <li>四态标注练习</li>
    <li>证据模板表</li>
  </ul>
</div>
<div class="panel">
  <h2>相关</h2>
  <ul>
    <li><a href="glossary.html">术语与参数四态</a></li>
    <li>测试能力线：异常与遥测</li>
  </ul>
</div>`,
};

const day03 = {
  file: 'day-03.html',
  title: '第 3 天 · 试点验收',
  description: '试点检查清单、交付包基线、从社区代码到可服务版本的最小证据链。',
  kicker: '入门 / 第 3 天',
  h1: '试点验收：结论要能交付、能追责',
  lead: '试点不是演示。交付包、验收表、服务级别、生命周期预警，要在试点阶段就写进产品定义，不能等上线后再补。',
  tags: [{ text: '第 3 天' }, { text: '试点验收' }, { text: '交付包' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '3 天入门', href: 'day-01.html' },
    { label: '第 3 天' },
  ],
  prev: { href: 'day-02.html', label: '第 2 天 · 功能证据' },
  next: { href: 'track-01.html', label: '进入供应链能力线' },
  body: `
<h2>试点要证明什么</h2>
<p>试点要证明三件事：在客户真实约束下能跑通；出问题时能定位、能回退、有人负责；扩大量时交付物是同一基线，而不是每次手工拼。</p>

<h2>试点检查清单（可勾选）</h2>
<table class="matrix">
  <thead><tr><th>维度</th><th>检查项</th><th>通过标准（建议）</th></tr></thead>
  <tbody>
    <tr>
      <td>拓扑与规模</td>
      <td>是否覆盖客户真实组网，而不是实验室简化环境</td>
      <td>节点数、链路冗余、跨机房/跨 Pod 与客户图纸一致或有书面差异说明</td>
    </tr>
    <tr>
      <td>异常场景</td>
      <td>MAC 泛洪、BGP 震荡、端口闪断、PFC 风暴下的恢复时间</td>
      <td>有量化指标与实测数据，不是「表现正常」</td>
    </tr>
    <tr>
      <td>交付包</td>
      <td>整机、NOS、光模块与服务是否同一基线</td>
      <td>版本清单可复现安装；光学件有 HCL 行</td>
    </tr>
    <tr>
      <td>升级与回退</td>
      <td>窗口、失败恢复、数据保全是否演练过</td>
      <td>至少一次成功升级 + 一次成功回退记录</td>
    </tr>
    <tr>
      <td>支持边界</td>
      <td>技术支持层级、补丁周期、返修与停产预警是否写进合同</td>
      <td>合同或服务附件可引用条款编号</td>
    </tr>
    <tr>
      <td>可观测</td>
      <td>日志、告警、遥测是否接到客户现有体系</td>
      <td>样例告警可进客户工单；字段映射表已评审</td>
    </tr>
  </tbody>
</table>

<h2>交付包最小构成</h2>
<ul>
  <li><strong>镜像与签名</strong>：版本号、校验值、下载与授权方式。</li>
  <li><strong>配置基线</strong>：起机配置模板、差异项说明、敏感信息脱敏策略。</li>
  <li><strong>硬件与光学</strong>：型号、板卡版本、光模块/线缆兼容行。</li>
  <li><strong>操作手册</strong>：安装、升级、回退、收集诊断包（Support Bundle）步骤。</li>
  <li><strong>责任表</strong>：现场、远程、备件、升级窗口的负责人与升级路径。</li>
</ul>

<h2>从社区代码到可交付版本（最小证据链）</h2>
<ol>
  <li><strong>基线</strong>：选定社区分支与版本号。</li>
  <li><strong>补丁取舍</strong>：每个目标补丁有 Issue/PR、commit、目标分支/镜像。</li>
  <li><strong>持续集成</strong>：CI 结果可查，失败有关闭记录。</li>
  <li><strong>平台验证</strong>：DUT 自测、sonic-mgmt 或等价测试床结果。</li>
  <li><strong>缺陷关闭</strong>：已知限制列表与 Owner。</li>
  <li><strong>发布门禁</strong>：哪些项不过就不能进 GA 功能清单。</li>
</ol>
<div class="callout"><strong>边界：</strong>这是方法示例，不是任一正式版本的公开支持清单。对外材料必须写清适用型号与版本范围。</div>

<h2>诊断与 Support Bundle（产品要预埋）</h2>
<p>客户现场出问题时，能一次导出 STATE_DB 相关状态、syslog、orchagent/syncd 异常栈的诊断包，会直接决定 L3 介入时长。试点阶段就要验证：收集命令是否可用、包大小是否可控、敏感字段是否脱敏、接收方是否有权限打开。</p>

<h2>试点产出清单</h2>
<ul>
  <li>验收表：满足 / 不满足 / 未知（未知不按不满足处理，但必须有 Owner）。</li>
  <li>交付包基线清单（版本 + 哈希）。</li>
  <li>风险与负责人表。</li>
  <li>是否放量扩大试点的书面结论。</li>
</ul>
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
</div>
<div class="panel">
  <h2>本日产出</h2>
  <ul>
    <li>试点检查清单勾选版</li>
    <li>交付包目录草稿</li>
    <li>证据链六步说明</li>
  </ul>
</div>
<div class="panel">
  <h2>下一步</h2>
  <ul>
    <li><a href="track-01.html">能力线 01 · 供应链</a></li>
    <li><a href="checklist.html">完整核验包字段</a></li>
  </ul>
</div>`,
};

module.exports = { day01, day02, day03 };
