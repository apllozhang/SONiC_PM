'use strict';

const tracks = [
  {
    file: 'track-01.html', num: '01', nav: 'track-01',
    title: '芯片与白牌供应链',
    week: '第 1–2 周',
    lead: '同一颗芯片，是否已经形成同一块可交付板卡的 SDK、SAI、平台插件和诊断基线？这是供应链和产品定型的第一道关。',
    body: `
<h2>本周要建立的判断力</h2>
<p>能一眼看出材料停在哪一层：是 ASIC 公开定位、ODM 板卡就绪、还是目标 SKU 已有实验室证据。把 ASIC 型号当成起点而不是准入结论：先冻结硬件型号、SDK/SAI、平台插件、固件、端口映射、热电与诊断责任，再谈「支持」。</p>

<h2>ASIC 与软件栈怎么锁</h2>
<ul>
  <li>ASIC 驱动经 <code>syncd</code> 容器加载；转发表项与状态同步必须经过 SAI 抽象。</li>
  <li>核验硬件型号（HW-SKU）驱动是否与目标内核及 SAI 版本严格锁定。</li>
  <li>同 ASIC 的不同板卡设计（端口映射、光学、电源）不能泛化为相同支持状态。</li>
</ul>

<h2>白牌准入：六件套</h2>
<table class="matrix">
  <thead><tr><th>项</th><th>说明</th><th>证据形态</th></tr></thead>
  <tbody>
    <tr><td>板级原理图 / 版本</td><td>目标 SKU 的硬件基线</td><td>受控文档版本号</td></tr>
    <tr><td>ONIE 固件</td><td>安装器与机型识别</td><td>版本 + 校验值 + 烧录记录</td></tr>
    <tr><td>CPLD</td><td>板级逻辑与端口/风扇控制</td><td>版本矩阵</td></tr>
    <tr><td>光模块 / DAC HCL</td><td>兼容组合与距离/速率</td><td>实验室互通列表，不是营销矩阵</td></tr>
    <tr><td>热与电</td><td>双电源、气流、温升</td><td>是否进入产品定义而非售后补丁</td></tr>
    <tr><td>诊断</td><td>日志、LED、现场可更换件</td><td>Support Bundle 是否覆盖该板卡</td></tr>
  </tbody>
</table>

<h2>案例拆解（示意，非排名）</h2>
<ul>
  <li><strong>芯片商生态页</strong>：Tomahawk 5 等以 51.2 Tb/s 档位介绍 AI/ML 定位——这是芯片级公开定位，不能自动等于某整机、某镜像已支持。</li>
  <li><strong>整机/ODM harden 叙事</strong>：基于社区分支选 PR、跑 CI/CT、用 Jira 与测试床建追溯链——要问：是否能对每个目标补丁给出 Issue/PR、commit、DUT、已知限制与负责人。</li>
  <li><strong>光学协同</strong>：强调交换机 + NOS + 多来源光模块组合验证——要落到你项目的 HCL 行，而不是「支持第三方光模块」一句话。</li>
</ul>
<div class="callout"><strong>网关：</strong>生态声明不能替代型号级 HCL。评审必须追到准确型号、端口/分拆模式、光模块、镜像、BIOS/CPLD、温度/气流、RMA 与测试报告。</div>

<h2>真实样例：HCL 行与证据列（示意）</h2>
<table class="matrix">
  <thead><tr><th>型号 / 板卡</th><th>光模块</th><th>速率/距离</th><th>镜像版本</th><th>证据</th><th>负责人</th></tr></thead>
  <tbody>
    <tr><td>ODM-A / B1.3</td><td>厂商 X 25G SR</td><td>25G / 100m MMF</td><td>4.2.1</td><td>实验室互通表 E-112</td><td>李四</td></tr>
    <tr><td>ODM-A / B1.3</td><td>厂商 Y 100G DAC 3m</td><td>100G / 机柜内</td><td>4.2.1</td><td>待复核（缺报告号）</td><td>王五</td></tr>
  </tbody>
</table>
<p class="sample-cap">样例：兼容矩阵必须带证据与负责人；「待复核」不能写成「已兼容」。</p>

<h2>核对问题（周会上直接用）</h2>
<ol>
  <li>目标 SKU 的板级版本与固件基线是什么？谁签字冻结？</li>
  <li>兼容矩阵是否有同版本实验室证据？还是供应商 Excel？</li>
  <li>芯片级能力与目标镜像/硬件型号是否分开陈述？</li>
  <li>双电源与温升测试是否在准入阶段完成？</li>
  <li>光学不兼容时的责任在芯片、板卡还是光学供应商？</li>
</ol>

<h2>本阶段产出</h2>
<ul>
  <li>型号对照表（ASIC ↔ 板卡 ↔ 镜像 ↔ 插件版本）。</li>
  <li>兼容矩阵草稿（含证据列与负责人列）。</li>
  <li>供应链风险清单（缺证据项、依赖单一 ODM 等）。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>型号对照表</li><li>兼容矩阵草稿</li><li>供应链风险清单</li></ul></div>
<div class="panel"><h2>相关</h2><ul><li><a href="glossary.html">术语表</a></li><li><a href="cases.html">厂商案例拆解</a></li></ul></div>`,
  },
  {
    file: 'track-02.html', num: '02', nav: 'track-02',
    title: '架构与版本工程',
    week: '第 3–4 周',
    lead: '目标版本的分支策略、补丁清单和多仓库依赖是否锁定？没有版本工程，就没有可长期服务的产品。',
    body: `
<h2>控制面：意图如何到芯片</h2>
<p>分布式控制面核心在 Redis 多实例与管道：管理接口对 <code>CONFIG_DB</code>（如 Redis DB 4）的写入触发 OrchAgent 监听；OrchAgent（sonic-swss）把 VLAN、BGP 等意图转成 SAI 对象，经 <code>ASIC_DB</code> 下发到 <code>syncd</code>。产品化时要能回答：配置从哪进、状态从哪出、失败卡在哪一环、如何取证。</p>

<h2>容器全景：谁负责什么</h2>
<p class="muted">下表为社区常见容器职责示意，商业发行版可能增删组件；以目标镜像 <code>docker ps</code> 与文档为准。</p>
<table class="matrix">
  <thead><tr><th>容器 / 进程</th><th>主要仓库</th><th>职责</th><th>故障时业务感知</th><th>取证点</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>database</strong></td>
      <td>sonic-buildimage 等</td>
      <td>承载 CONFIG_DB / APP_DB / ASIC_DB / STATE_DB 等 Redis 实例</td>
      <td>严重；配置与状态链路中断</td>
      <td>redis-cli ping；各 DB 键空间</td>
    </tr>
    <tr>
      <td><strong>orchagent</strong></td>
      <td>sonic-swss</td>
      <td>监听 DB，把网络意图转成 SAI 对象并下发</td>
      <td>高；新配置不生效，依赖 warm/fast 语义</td>
      <td>orchagent 日志；APP_DB→ASIC_DB 变化</td>
    </tr>
    <tr>
      <td><strong>syncd</strong></td>
      <td>sonic-sairedis 等</td>
      <td>执行 SAI 调用，与 ASIC SDK 交互</td>
      <td>极高；转发表项异常</td>
      <td>syncd 日志；SAI 返回码</td>
    </tr>
    <tr>
      <td><strong>fpm / FRR</strong></td>
      <td>sonic-frr 等</td>
      <td>BGP/路由协议栈，向控制面提供路由信息</td>
      <td>高；邻居与路由震荡</td>
      <td>show ip bgp summary；FRR 日志</td>
    </tr>
    <tr>
      <td><strong>teamd</strong></td>
      <td>sonic-teamd 等</td>
      <td>PortChannel / LAG 成员状态机</td>
      <td>中高；聚合口成员异常</td>
      <td>teamdctl state</td>
    </tr>
    <tr>
      <td><strong>telemetry</strong></td>
      <td>sonic-gnmi 等</td>
      <td>gNMI 遥测推送</td>
      <td>通常不影响转发；影响可观测</td>
      <td>订阅日志；推送样本</td>
    </tr>
    <tr>
      <td><strong>snmp</strong></td>
      <td>sonic-snmp 等</td>
      <td>SNMP Agent</td>
      <td>通常不影响转发</td>
      <td>snmpwalk / agent 日志</td>
    </tr>
    <tr>
      <td><strong>lldp / dhcp_relay 等</strong></td>
      <td>对应 sonic-* 仓库</td>
      <td>邻居发现、DHCP 中继等</td>
      <td>按功能影响</td>
      <td>对应 show 命令</td>
    </tr>
  </tbody>
</table>

<h2>Redis 各 DB 关键表速查（示意）</h2>
<table class="matrix">
  <thead><tr><th>DB（社区常见编号）</th><th>角色</th><th>谁写</th><th>谁读</th><th>关键表举例</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>CONFIG_DB</strong>（常为 4）</td>
      <td>期望配置</td>
      <td>用户 / config 命令 / 网管</td>
      <td>orchagent、bgpcfgd 等</td>
      <td>VLAN、VLAN_MEMBER、PORT、INTERFACE、PORTCHANNEL、ACL_TABLE、ACL_RULE、PORT_QOS_MAP、DEVICE_NEIGHBOR</td>
    </tr>
    <tr>
      <td><strong>APP_DB</strong>（常为 0）</td>
      <td>应用层意图</td>
      <td>部分应用 / 转换组件</td>
      <td>orchagent</td>
      <td>与转发意图相关的 INTF、ROUTE、NEIGH 等（视版本）</td>
    </tr>
    <tr>
      <td><strong>ASIC_DB</strong>（常为 1）</td>
      <td>SAI 层状态/下发</td>
      <td>orchagent / syncd</td>
      <td>syncd、调试工具</td>
      <td>SAI 对象与属性（ASIC_* 风格键，调试用）</td>
    </tr>
    <tr>
      <td><strong>STATE_DB</strong>（常为 6）</td>
      <td>运行状态</td>
      <td>各组件</td>
      <td>show 命令、遥测、诊断</td>
      <td>端口状态、转发表项摘要、温感等（视版本）</td>
    </tr>
    <tr>
      <td><strong>COUNTERS_DB</strong>（常为 2）</td>
      <td>计数器</td>
      <td>syncd / 计数器收集</td>
      <td>show counters、遥测</td>
      <td>端口/队列计数</td>
    </tr>
  </tbody>
</table>
<p class="muted">编号在不同版本/发行版可能变化；培训时要求学员用目标镜像实际确认，而不是背死数字。</p>

<h2>容器重启影响矩阵（示意）</h2>
<table class="matrix">
  <thead><tr><th>操作</th><th>对已装转发的影响</th><th>对新配置的影响</th><th>产品定义要写什么</th></tr></thead>
  <tbody>
    <tr>
      <td>重启 telemetry / snmp</td>
      <td>通常不影响</td>
      <td>不影响转发配置</td>
      <td>可观测短暂缺口的告警说明</td>
    </tr>
    <tr>
      <td>重启 teamd</td>
      <td>可能影响 LAG 成员收敛</td>
      <td>PortChannel 相关变更延迟</td>
      <td>是否允许在线重启、回退步骤</td>
    </tr>
    <tr>
      <td>重启 FRR/fpm</td>
      <td>BGP 邻居可能重连、路由收敛</td>
      <td>协议配置重算</td>
      <td>收敛时间指标与客户沟通口径</td>
    </tr>
    <tr>
      <td>重启 orchagent</td>
      <td>取决于 warm/fast 与实现；可能重编程</td>
      <td>配置处理中断</td>
      <td>是否支持及窗口；失败如何取证</td>
    </tr>
    <tr>
      <td>重启 syncd</td>
      <td>高风险；SAI/ASIC 交互中断</td>
      <td>下发中断</td>
      <td>通常仅维护窗口；必须有回退</td>
    </tr>
    <tr>
      <td>重启 database</td>
      <td>极高风险</td>
      <td>全链路依赖</td>
      <td>禁止随意重启；灾备与恢复手册</td>
    </tr>
  </tbody>
</table>
<div class="callout"><strong>培训要求：</strong>能画出「CONFIG_DB → orchagent → ASIC_DB → syncd → ASIC」并说出每一环的取证命令/日志位置；不要求学员在无实验环境时操作生产。</div>

<h2>真实样例：版本锁定声明（示意）</h2>
<pre class="code-sample"><code>社区基线：202311
厂商发行版：Example-SONiC 4.2.1（构建 2026-08-01）
平台：ODM-A / HW-SKU: A-48X / 板卡 B1.3
SAI：vendor-sai 3.x.y   内核：5.10.xxx
orchagent/syncd：与镜像同构建
证据：内部报告 R-2026-0815  Owner：张三</code></pre>

<h2>多仓库依赖怎么进物料清单</h2>
<ul>
  <li>sonic-buildimage：镜像组装、构建参数、产物哈希</li>
  <li>sonic-swss：OrchAgent 与 SAI/平台插件兼容版本</li>
  <li>sonic-sairedis / syncd：SAI 头文件与厂商库版本</li>
  <li>sonic-utilities：CLI 与镜像同版本</li>
  <li>平台插件 / BSP：板卡版本矩阵</li>
</ul>

<h2>分支与发布节奏</h2>
<ul>
  <li>社区基线 → 平台插件 → 目标镜像的依赖链要与发布节奏对齐。</li>
  <li>补丁物料清单（BOM）：来源 PR、优先级、冲突风险、回退方式。</li>
  <li>升级与回退写进版本定义：失败恢复、数据保全、时间窗口。</li>
</ul>

<h2>核对问题</h2>
<ol>
  <li>目标 release 的分支策略是什么？与上游同步周期？</li>
  <li>patch BOM 是否锁定？谁负责合并冲突？</li>
  <li>多仓依赖进入 BOM 的机制是手工还是流水线？</li>
  <li>升级失败时回退到哪一版？谁演练过？</li>
  <li>哪些容器重启允许在线做？依据是什么？</li>
</ol>

<h2>本阶段产出</h2>
<ul>
  <li>分支与发布节奏图 + 补丁 BOM + 升级/回退策略。</li>
  <li>目标镜像的容器清单与重启策略表。</li>
  <li>CONFIG_DB 关键表与本项目配置片段的对应说明。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>分支与发布节奏图</li><li>补丁物料清单</li><li>升级/回退策略</li><li>容器与重启策略</li></ul></div>
<div class="panel"><h2>外链</h2><ul>
  <li><a href="https://sonic.readthedocs.io/" target="_blank" rel="noopener">官方文档</a></li>
  <li><a href="https://github.com/sonic-net/sonic-swss" target="_blank" rel="noopener">sonic-swss</a></li>
  <li><a href="feature-map.html">功能特性地图</a></li>
</ul></div>`,
  },
  {
    file: 'track-03.html', num: '03', nav: 'track-03',
    title: '测试与可运维性',
    week: '第 5–6 周',
    lead: '测试环境是否贴近客户真实组网？异常场景和运维能力，如何写进产品验收。',
    body: `
<h2>测试床：对齐真实，而不是「能通」</h2>
<p>被测设备 + 交换机 + 流量仪要对齐客户真实组网：速率、分拆、缓冲、跨设备型号。实验室简化拓扑测出的结论，不能直接写成客户场景验收。</p>

<h2>异常场景最小集</h2>
<table class="matrix">
  <thead><tr><th>场景</th><th>关注指标</th><th>产品要提供的证据</th></tr></thead>
  <tbody>
    <tr><td>MAC 泛洪</td><td>CPU、表项、业务影响</td><td>限速/保护是否生效，恢复时间</td></tr>
    <tr><td>BGP 震荡</td><td>收敛时间、路由稳定性</td><td>震荡日志与收敛曲线</td></tr>
    <tr><td>端口闪断</td><td>业务切换、告警风暴</td><td>闪断时间与恢复时间</td></tr>
    <tr><td>PFC 风暴</td><td>暂停帧范围、级联影响</td><td>阈值配置与风暴抑制策略</td></tr>
    <tr><td>控制面异常</td><td>orchagent/syncd 重启影响</td><td>Support Bundle 样例与恢复步骤</td></tr>
  </tbody>
</table>

<h2>RoCE / AI 场景怎么拆（进阶）</h2>
<ul>
  <li>把验证拆到 Leaf 封装、Spine 隧道转发、Leaf 解封装。</li>
  <li>EVPN/VXLAN 至少区分 L2、L3 对称与 L3 非对称路径。</li>
  <li>明确 PFC/ECN 参数、拥塞点位置、性能目标与回退条件。</li>
</ul>
<div class="callout"><strong>注意：</strong>测试覆盖点不能代替吞吐、时延、收敛、无损、规模或跨光模块组合的验收结论。</div>

<h2>可运维性是否进入交付</h2>
<ul>
  <li>结构化遥测（如 gNMI）与传统 CLI/SNMP 的分工：订阅路径、采样间隔、推送时延。</li>
  <li>本地网管与云网管：安全隔离、证书轮换、断网离线自治差异。</li>
  <li>Syslog、告警字段是否能进客户工单系统。</li>
</ul>

<h2>真实样例：异常用例行（示意）</h2>
<table class="matrix">
  <thead><tr><th>用例</th><th>步骤摘要</th><th>通过标准</th><th>证据</th></tr></thead>
  <tbody>
    <tr>
      <td>BGP 邻居震荡恢复</td>
      <td>反复 shut/no shut 邻居 10 次，间隔 5s</td>
      <td>每次收敛时间 ≤ 约定秒数；无残留黑洞</td>
      <td>show ip bgp summary 时间戳 + 流量曲线</td>
    </tr>
    <tr>
      <td>端口闪断</td>
      <td>物理闪断 1s / 30s 两档</td>
      <td>业务恢复时间达标；告警可进工单字段</td>
      <td>syslog + 接口计数</td>
    </tr>
  </tbody>
</table>
<p class="sample-cap">样例：报告行应能直接进验收表，而不是「测试通过」四个字。</p>

<h2>核对问题</h2>
<ol>
  <li>测试床是否覆盖客户真实组网差异清单？</li>
  <li>负向用例集是否量化恢复时间？</li>
  <li>遥测与告警是否做过对接演练？</li>
  <li>诊断包是否覆盖该板卡与该镜像版本？</li>
</ol>

<h2>本阶段产出</h2>
<ul>
  <li>测试环境定义与差异说明。</li>
  <li>异常用例集（含指标与证据列）。</li>
  <li>运维验收清单。</li>
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
<h2>两种责任不要混</h2>
<p>上游贡献说明技术影响力与代码质量路径；商业发行说明你愿意对哪些型号、哪些版本、多长周期负责。把「我们参与上游」翻译成可核对的提交记录、版本号和回归证据，而不是口号。</p>

<h2>社区路径怎么核验</h2>
<ul>
  <li>贡献路径：Issue → PR → 评审 → 合并 → 进入哪个 release。</li>
  <li>回归套件：sonic-mgmt 或等价，覆盖了哪些场景，失败如何关闭。</li>
  <li>OCP / 开放硬件与商业整机的边界：硬件开放不等于软件支持承诺。</li>
</ul>

<h2>商业分发要独立回答的问题</h2>
<table class="matrix">
  <thead><tr><th>问题</th><th>为何重要</th></tr></thead>
  <tbody>
    <tr><td>镜像谁编译、谁签名、谁提供 CVE 补丁？</td><td>出漏洞时责任不能空转</td></tr>
    <tr><td>许可证与 entitlement 如何约束客户？</td><td>影响报价与法务</td></tr>
    <tr><td>升级窗口与回退是否写进合同？</td><td>影响现场与备件</td></tr>
    <tr><td>社区快速演进 vs 商业稳定周期如何解释？</td><td>避免客户拿社区节奏要求商业 SLA</td></tr>
  </tbody>
</table>

<h2>真实样例：贡献与版本对应（示意）</h2>
<pre class="code-sample"><code>PR: sonic-net/sonic-swss #12345  标题：…（示例）
合并：进入社区 202311
本产品镜像：Example-SONiC 4.2.1 已包含对应 commit abc123
回归：相关用例通过（报告编号 R-…）
已知限制：在 HW-SKU B 上不适用
Owner：赵六</code></pre>

<h2>核对问题</h2>
<ol>
  <li>我们对上游的贡献，能否列出进入主线的 PR 与版本？</li>
  <li>商业发行相对社区，具体多做了哪些测试与补丁？</li>
  <li>客户若自建社区版，我们的支持边界写在哪一条？</li>
</ol>

<h2>本阶段产出</h2>
<ul>
  <li>上游策略一页纸。</li>
  <li>贡献证据清单。</li>
  <li>社区/商业边界说明（给售前与法务共用）。</li>
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
<h2>定型核验包最少要有什么</h2>
<p>完整字段见 <a href="checklist.html">产品定型核验包</a>。本周重点是把字段变成跨部门可签字的流程，而不是多填一列。</p>

<h2>跨部门检查点</h2>
<table class="matrix">
  <thead><tr><th>检查点</th><th>研发</th><th>测试</th><th>供应链</th><th>支持</th></tr></thead>
  <tbody>
    <tr><td>型号与板卡冻结</td><td>签字</td><td>知悉</td><td>备料</td><td>备件策略</td></tr>
    <tr><td>镜像与补丁 BOM</td><td>签字</td><td>回归</td><td>—</td><td>升级窗口</td></tr>
    <tr><td>HCL 与光学</td><td>提供</td><td>互通</td><td>采购</td><td>现场清单</td></tr>
    <tr><td>验收表四态</td><td>提供证据</td><td>签字</td><td>—</td><td>风险说明</td></tr>
    <tr><td>停产 / 变更通知</td><td>知悉</td><td>—</td><td>主责</td><td>客户沟通</td></tr>
  </tbody>
</table>

<h2>确认绑定基线哈希</h2>
<ul>
  <li>确认结果绑定当时的彩页/规格哈希或镜像哈希。</li>
  <li>资料或镜像一更新，旧结论自动失效并提示复核——避免拿旧事实冒充新事实。</li>
  <li>「清除确认」应保留覆盖前快照，便于审计。</li>
</ul>

<h2>真实样例：定型表一行（示意）</h2>
<pre class="code-sample"><code>字段：EVPN/VXLAN L3 对称路径
四态：待复核
证据：待补报告链接
负责人：钱七
风险签字人：孙八（接受「未在目标拓扑验证」）
基线哈希：规格书 S-2026-03 若变更则本行失效</code></pre>

<h2>核对问题</h2>
<ol>
  <li>定型表里每一行是否都有 Owner 与截止时间？</li>
  <li>未知项是否有风险签字人？</li>
  <li>基线更新后，谁负责触发复核？</li>
</ol>

<h2>本阶段产出</h2>
<ul>
  <li>定型核验包（可签字版）。</li>
  <li>职责与负责人表（RACI 简化版）。</li>
  <li>检查点日历。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>定型核验包</li><li>职责与负责人表</li><li>检查点日历</li></ul></div>
<div class="panel"><h2>工具</h2><ul><li><a href="checklist.html">完整字段清单</a></li></ul></div>`,
  },
  {
    file: 'track-06.html', num: '06', nav: 'track-06',
    title: '商业化与生命周期',
    week: '第 11–12 周',
    lead: '报价和定型表要写清：镜像来源、许可证、安全漏洞责任、升级窗口、技术支持层级、平台与硬件生命周期。',
    body: `
<h2>报价/定型表必须拆开的行</h2>
<p>把「SONiC」当成一个含混的支持对象是商业化阶段最常见事故。至少拆成：镜像来源、许可证、CVE 责任、升级窗口、技术支持层级、平台 RMA、硬件生命周期，分独立行。</p>

<h2>商业发行 vs 自建社区：怎么比</h2>
<table class="matrix">
  <thead><tr><th>维度</th><th>商业发行</th><th>自主维护社区版</th></tr></thead>
  <tbody>
    <tr><td>补丁周期</td><td>合同约定窗口</td><td>取决于自身人力与上游节奏</td></tr>
    <tr><td>集成测试成本</td><td>通常含在许可/服务费</td><td>自己承担，且常被低估</td></tr>
    <tr><td>CVE 响应</td><td>有 SLA 或公告机制</td><td>自己跟踪上游与回补丁</td></tr>
    <tr><td>总体拥有成本</td><td>许可 + 服务</td><td>人力 + 测试 + 风险</td></tr>
  </tbody>
</table>
<p>竞品对比时，软件许可费用、ASIC 硬件加速限制、第三方光模块锁定策略与厂商漏洞响应 SLA 必须同时对齐，不能只比功能列表。</p>

<h2>支持合同与生命周期</h2>
<ul>
  <li>服务级别：响应与恢复时间、现场/远程边界、备件时限。</li>
  <li>返修与停产：EOL/变更通知提前期是否写入。</li>
  <li>生命周期预警如何回流到产品路线与备件策略——不是售后单方面的事。</li>
</ul>

<h2>真实样例：报价表拆行（示意）</h2>
<table class="matrix">
  <thead><tr><th>行项目</th><th>写法</th><th>不要写成</th></tr></thead>
  <tbody>
    <tr><td>镜像来源</td><td>基于社区 202311 的 Example-SONiC 4.2.1</td><td>最新 SONiC</td></tr>
    <tr><td>CVE 责任</td><td>发行版提供通告，窗口 ≤ X 个工作日</td><td>社区会修</td></tr>
    <tr><td>硬件 RMA</td><td>按整机合同条款编号</td><td>SONiC 负责</td></tr>
  </tbody>
</table>

<h2>商业化网关（放行条件）</h2>
<ul>
  <li>未通过目标规模/拓扑真实测试床闭环验证的方案，不进入 GA 叙述。</li>
  <li>每一项对外「支持」都能回到版本、平台、证据与负责人。</li>
  <li>未知项有风险签字人，且不进「已支持」统计口径。</li>
</ul>
<div class="callout"><strong>本阶段验收：</strong>12 周训练的终点不是做完 PPT，而是定型包、证据链与责任表能同时过法务、售前与交付。</div>

<h2>本阶段产出</h2>
<ul>
  <li>商业化一页纸（给报价与售前）。</li>
  <li>支持边界说明（给合同附件）。</li>
  <li>生命周期风险表。</li>
</ul>
`,
    side: `<div class="panel"><h2>本阶段产出</h2><ul><li>商业化一页纸</li><li>支持边界说明</li><li>生命周期风险表</li></ul></div>
<div class="panel"><h2>收口</h2><ul><li><a href="checklist.html">核验包总表</a></li><li><a href="index.html">返回首页</a></li></ul></div>`,
  },
];

const glossary = {
  file: 'glossary.html',
  title: '术语与参数四态',
  description: 'SONiC 产品常用术语、架构缩写与参数四态语义速查。',
  kicker: '工具',
  h1: '术语与参数四态',
  lead: '给售前、研发、测试共用的一页速查。四态语义不可弱化：未披露不等于不支持，抽取失败不等于功能不存在。',
  tags: [{ text: '工具' }, { text: '术语' }, { text: '四态' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '工具', href: 'glossary.html' },
  ],
  prev: { href: 'day-02.html', label: '第 2 天 · 功能证据' },
  next: { href: 'checklist.html', label: '产品定型核验包' },
  body: `
<h2>参数四态</h2>
<table class="matrix">
  <thead><tr><th>状态</th><th>含义</th><th>不可写成</th></tr></thead>
  <tbody>
    <tr><td>有值</td><td>原文引用已核验，可回溯</td><td>无引用的「听说支持」</td></tr>
    <tr><td>待复核</td><td>机器推测或未过原文校验</td><td>直接当「有值」</td></tr>
    <tr><td>未披露</td><td>公开材料没写</td><td>「不支持」或「已支持」</td></tr>
    <tr><td>抽取失败</td><td>解析失败</td><td>「功能不存在」</td></tr>
  </tbody>
</table>

<h2>架构与组件</h2>
<table class="matrix">
  <thead><tr><th>术语</th><th>一句话</th><th>产品经理要问</th></tr></thead>
  <tbody>
    <tr><td>SAI</td><td>交换机抽象接口，统一转发面 API</td><td>目标镜像用的 SAI 版本与厂商库？</td></tr>
    <tr><td>syncd</td><td>执行 SAI 调用、与 ASIC 交互的组件</td><td>异常时如何取证、是否影响转发？</td></tr>
    <tr><td>OrchAgent</td><td>把网络意图转成 SAI 对象（sonic-swss）</td><td>配置卡在这一环时的日志在哪？</td></tr>
    <tr><td>CONFIG_DB / ASIC_DB / STATE_DB</td><td>配置、下发、状态的 Redis 库</td><td>遥测与诊断分别读哪里？</td></tr>
    <tr><td>HW-SKU</td><td>硬件型号标识，驱动与端口映射关联</td><td>同芯片不同板是否分开发布？</td></tr>
    <tr><td>ONIE</td><td>开放网络安装环境，装 NOS 用</td><td>固件版本与机型识别是否锁定？</td></tr>
    <tr><td>CPLD</td><td>板级逻辑（风扇、端口、指示灯等）</td><td>版本是否进兼容矩阵？</td></tr>
    <tr><td>HCL</td><td>硬件兼容列表</td><td>是否有同版本实验室证据？</td></tr>
    <tr><td>gNMI / gNOI</td><td>配置遥测 / 运维操作的 gRPC 接口</td><td>对接客户网管的字段与权限？</td></tr>
    <tr><td>Support Bundle</td><td>现场诊断打包（日志、状态等）</td><td>是否覆盖该板卡与该镜像？</td></tr>
  </tbody>
</table>

<h2>商业与交付</h2>
<table class="matrix">
  <thead><tr><th>术语</th><th>一句话</th></tr></thead>
  <tbody>
    <tr><td>community SONiC</td><td>Apache 2.0 下的社区版本，支持通常以服务型方式提供</td></tr>
    <tr><td>Enterprise / 商业发行</td><td>将社区代码、平台、镜像版本、授权与升级资料绑定为可服务交付</td></tr>
    <tr><td>harden / 加固</td><td>选补丁、跑 CI/CT、平台验证与缺陷关闭的路径；是方法，不是自动等于 GA</td></tr>
    <tr><td>EOL / 变更通知</td><td>停产与重大变更的提前告知，应写入合同</td></tr>
    <tr><td>TAC / L3</td><td>技术支持层级；要写清升级路径与响应级别</td></tr>
  </tbody>
</table>
`,
  side: `
<div class="panel"><h2>速记</h2><ul class="gate-list">
  <li><span class="gate-dot ok"></span><span>有值 = 可回溯</span></li>
  <li><span class="gate-dot"></span><span>待复核 = 要人核</span></li>
  <li><span class="gate-dot warn"></span><span>未披露 ≠ 不支持</span></li>
  <li><span class="gate-dot err"></span><span>抽取失败 ≠ 不存在</span></li>
</ul></div>`,
};

const checklist = {
  file: 'checklist.html',
  title: '产品定型核验包',
  description: '行业竞争与产品定型核验包完整字段，可直接复制到表格使用。',
  kicker: '工具',
  h1: '产品定型核验包',
  lead: '给定型会与售前共用的字段表。每一行都要能回到证据链接与负责人；未知项单独列出并指定风险签字人。',
  tags: [{ text: '工具' }, { text: '定型' }, { text: '核验包' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '工具', href: 'checklist.html' },
  ],
  prev: { href: 'glossary.html', label: '术语与参数四态' },
  next: { href: 'cases.html', label: '厂商案例拆解' },
  body: `
<h2>字段总表（复制用）</h2>
<table class="matrix">
  <thead><tr><th>#</th><th>字段</th><th>填写说明</th><th>四态</th><th>证据链接</th><th>负责人</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>目标场景</td><td>园区 / 数据中心 / AI Fabric…</td><td></td><td></td><td></td></tr>
    <tr><td>2</td><td>目标客户 / 拓扑</td><td>规模、冗余、是否 RoCE</td><td></td><td></td><td></td></tr>
    <tr><td>3</td><td>目标型号 / ASIC</td><td>含板卡版本</td><td></td><td></td><td></td></tr>
    <tr><td>4</td><td>目标 NOS / 版本 / 镜像</td><td>社区或商业、授权方式</td><td></td><td></td><td></td></tr>
    <tr><td>5</td><td>SDK / SAI / 平台插件</td><td>版本锁定方式</td><td></td><td></td><td></td></tr>
    <tr><td>6</td><td>硬件、光模块与 HCL</td><td>实验室证据有无</td><td></td><td></td><td></td></tr>
    <tr><td>7</td><td>补丁 / CI / DUT / 回归</td><td>hardening 追溯链</td><td></td><td></td><td></td></tr>
    <tr><td>8</td><td>AI/DC 拓扑与拥塞验证</td><td>PFC/ECN、封装路径</td><td></td><td></td><td></td></tr>
    <tr><td>9</td><td>升级 / 回退 / CVE / RMA</td><td>窗口与责任</td><td></td><td></td><td></td></tr>
    <tr><td>10</td><td>已知限制与风险签字人</td><td>未知项必须有主</td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<h2>使用规则</h2>
<ol>
  <li>四态只能填：有值 / 待复核 / 未披露 / 抽取失败。</li>
  <li>「有值」必须有可打开的证据链接，且链接指向的版本与第 3、4 行一致。</li>
  <li>定型会纪要中，未知项单独列表，不混入「已支持」统计。</li>
  <li>基线哈希变化后，相关行自动标复核。</li>
</ol>
<div class="callout"><strong>提醒：</strong>这张表的目的是减少会后扯皮，不是增加填表工作量。字段不全的行宁可标未知，也不要空白通过。</div>
`,
  side: `<div class="panel"><h2>配套</h2><ul>
    <li><a href="glossary.html">四态与术语</a></li>
    <li><a href="day-01.html">第 1 天核验包草稿</a></li>
    <li><a href="cases.html">厂商案例</a></li>
  </ul></div>`,
};

const cases = {
  file: 'cases.html',
  title: '厂商案例拆解',
  description: '用 Broadcom/Edgecore、NVIDIA、Marvell/OpenLAN、Dell 等公开叙事练习分层核验，不作排名。',
  kicker: '工具',
  h1: '厂商案例拆解（分层练习）',
  lead: '本页以公开叙事为练习材料，训练区分芯片、软件分发、平台适配、硬件、测试加固和支持服务。不是厂商排名，也不是型号支持清单。',
  tags: [{ text: '案例' }, { text: '分层核验' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '工具', href: 'cases.html' },
  ],
  prev: { href: 'checklist.html', label: '产品定型核验包' },
  next: { href: 'track-01.html', label: '供应链能力线' },
  body: `
<h2>练习框架</h2>
<p>每一则公开材料都按六层问：芯片 → 平台 → 镜像 → 硬件/光学 → 测试加固 → 支持服务。问完再决定能不能写进定型表。</p>

<h2>案例 A：芯片商 + 整机 ODM</h2>
<ul>
  <li><strong>常见叙事</strong>：Enterprise SONiC 覆盖 StrataXGS 系列大量 ODM 平台；整机侧在开放交换机上做 harden，强调与多来源光模块协同验证。</li>
  <li><strong>分层追问</strong>
    <ul>
      <li>芯片：目标 ASIC 与 SAI 版本？内核是否锁定？</li>
      <li>平台：目标板卡的 ONIE/CPLD/端口映射证据？</li>
      <li>加固：每个补丁的 Issue/PR、CI、DUT、已知限制与 Owner？</li>
      <li>光学：是否落到你项目的 HCL 行？</li>
    </ul>
  </li>
  <li><strong>易错</strong>：把「50+ 平台」当成「我的型号已支持」。</li>
</ul>

<h2>案例 B：AI / 高带宽芯片定位</h2>
<ul>
  <li><strong>常见叙事</strong>：以 Tomahawk 5 等介绍 51.2 Tb/s 与 AI/ML 数据中心定位。</li>
  <li><strong>分层追问</strong>：整机是否采用该芯片？镜像与插件是否适配？RoCE 拥塞验证是否拆到封装/隧道/解封装？</li>
  <li><strong>易错</strong>：芯片公开定位 = 客户 AI Fabric 已验收。</li>
</ul>

<h2>案例 C：开放管理路径（Prestera / OpenLAN 类）</h2>
<ul>
  <li><strong>常见叙事</strong>：SAI、SONiC、客户端、gNMI/gNOI/REST 与云管 SDK 串成开放管理路径。</li>
  <li><strong>分层追问</strong>：哪些进目标镜像？权限与证书如何？断网自治？对接客户网管的字段映射？</li>
  <li><strong>易错</strong>：架构齐全 = 管理面产品化已完成。</li>
</ul>

<h2>案例 D：商业发行（PowerSwitch 类叙事）</h2>
<ul>
  <li><strong>常见叙事</strong>：社区代码 + 品牌平台 + 镜像版本 + 授权 + ONIE + 升级资料，绑定为可服务交付。</li>
  <li><strong>分层追问</strong>：仅列出的型号与授权路径是否覆盖你的项目？非列出硬件能否外推？</li>
  <li><strong>易错</strong>：商业发行文档外推到非清单硬件。</li>
</ul>

<h2>你自己的练习模板</h2>
<table class="matrix">
  <thead><tr><th>材料</th><th>层</th><th>原句</th><th>可写入定型表的改写</th><th>证据链接</th></tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>
<div class="callout"><strong>边界：</strong>本页只用于内部训练分层阅读能力。对外材料请以各厂商最新官方文档与你的合同范围为准。</div>
`,
  side: `<div class="panel"><h2>六层追问</h2><ul>
    <li>芯片 / SAI</li><li>平台 / 板卡</li><li>镜像 / 补丁</li>
    <li>硬件 / 光学</li><li>测试 / 加固</li><li>支持 / 生命周期</li>
  </ul></div>`,
};

module.exports = { tracks, glossary, checklist, cases };
