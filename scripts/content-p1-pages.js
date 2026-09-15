'use strict';

const featureMap = {
  file: 'feature-map.html',
  title: '功能特性地图',
  description: '功能 × 仓库 × 容器 × DB 表 × 验证命令速查，覆盖 L2/L3/EVPN-VXLAN/QoS/遥测。',
  kicker: '知识库',
  h1: '功能特性地图',
  lead: '给售前查「归谁管」、给测试找「验什么」、给 PM 问「证据在哪」。每行尽量对应：社区仓库、容器、关键 DB 表、配置入口、验证命令。',
  tags: [{ text: 'P1' }, { text: '速查' }, { text: '功能地图' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '知识库', href: 'feature-map.html' },
  ],
  prev: { href: 'track-02.html', label: '架构与版本工程' },
  next: { href: 'ecosystem.html', label: '版本与生态怎么对上' },
  body: `
<p class="muted">说明：表中命令为社区常见 CLI 示意，商业发行版命令可能不同；验收前以目标镜像文档为准。仓库名以 GitHub 组织 <code>sonic-net</code> 为准。</p>

<h2>L2：VLAN / LAG / MCLAG / STP 类</h2>
<table class="matrix">
  <thead><tr><th>功能</th><th>主要仓库</th><th>容器 / 组件</th><th>关键 DB 表（示意）</th><th>配置入口</th><th>验证命令（示意）</th></tr></thead>
  <tbody>
    <tr>
      <td>VLAN / 端口加入</td>
      <td>sonic-swss、sonic-utilities</td>
      <td>orchagent（vlanorch）</td>
      <td>VLAN、VLAN_MEMBER、PORT</td>
      <td>config vlan add / config vlan member add</td>
      <td>show vlan brief；show vlan config</td>
    </tr>
    <tr>
      <td>PortChannel / LAG</td>
      <td>sonic-swss、teamd</td>
      <td>teamd + orchagent</td>
      <td>PORTCHANNEL、PORTCHANNEL_MEMBER、TEAM</td>
      <td>config portchannel add …</td>
      <td>show interfaces portchannel；teamdctl</td>
    </tr>
    <tr>
      <td>MCLAG / 双活网关类</td>
      <td>视发行版与平台插件</td>
      <td>常与 orchagent / 专用进程相关</td>
      <td>MCLAG 相关表（因版本而异）</td>
      <td>以目标镜像文档为准</td>
      <td>show mclag 之类（发行版差异大）</td>
    </tr>
  </tbody>
</table>
<pre class="code-sample" aria-label="VLAN 配置样例"><code>{
  "VLAN": {
    "Vlan100": { "vlanid": "100" }
  },
  "VLAN_MEMBER": {
    "Vlan100|Ethernet0": { "tagging_mode": "tagged" }
  }
}</code></pre>
<p class="sample-cap">样例：config_db 中 VLAN 与成员的最小片段（示意，字段随版本可能增减）</p>

<h2>L3：接口 / 路由 / BGP（FRR）</h2>
<table class="matrix">
  <thead><tr><th>功能</th><th>主要仓库</th><th>容器 / 组件</th><th>关键 DB 表（示意）</th><th>配置入口</th><th>验证命令（示意）</th></tr></thead>
  <tbody>
    <tr>
      <td>三层接口 / IP</td>
      <td>sonic-swss</td>
      <td>orchagent</td>
      <td>INTERFACE、LOOPBACK</td>
      <td>config interface ip add …</td>
      <td>show ip interfaces；show interfaces counters</td>
    </tr>
    <tr>
      <td>BGP / 静态路由</td>
      <td>sonic-frr / FRR、sonic-bgpcfgd</td>
      <td>fpm（FRR）+ bgpcfgd</td>
      <td>DEVICE_NEIGHBOR、BGP 相关表</td>
      <td>config bgp / vtysh（视版本）</td>
      <td>show ip bgp summary；show ip route</td>
    </tr>
    <tr>
      <td>ECMP / 下一代跳</td>
      <td>sonic-swss</td>
      <td>orchagent</td>
      <td>ROUTE、NEXTHOP、NEXTHOP_GROUP</td>
      <td>路由协议或静态配置</td>
      <td>show ip route &lt;prefix&gt;；ASIC 计数器</td>
    </tr>
  </tbody>
</table>

<h2>EVPN / VXLAN</h2>
<table class="matrix">
  <thead><tr><th>功能</th><th>主要仓库</th><th>容器 / 组件</th><th>关键 DB 表（示意）</th><th>配置入口</th><th>验证命令（示意）</th></tr></thead>
  <tbody>
    <tr>
      <td>VXLAN 隧道 / VNI</td>
      <td>sonic-swss</td>
      <td>orchagent（vxlan）</td>
      <td>VXLAN_TUNNEL、VXLAN_TUNNEL_MAP、VLAN</td>
      <td>config vxlan …</td>
      <td>show vxlan tunnel；show vxlan map</td>
    </tr>
    <tr>
      <td>EVPN 邻居与路由</td>
      <td>FRR、sonic-swss</td>
      <td>fpm + orchagent</td>
      <td>与 BGP/EVPN 表相关</td>
      <td>vtysh / config</td>
      <td>show bgp l2vpn evpn summary；show bgp evpn route</td>
    </tr>
  </tbody>
</table>
<p class="muted">验收提醒：必须区分 L2、L3 对称、L3 非对称路径；只写「支持 EVPN」无法验收。</p>

<h2>QoS / ACL / 队列</h2>
<table class="matrix">
  <thead><tr><th>功能</th><th>主要仓库</th><th>容器 / 组件</th><th>关键 DB 表（示意）</th><th>配置入口</th><th>验证命令（示意）</th></tr></thead>
  <tbody>
    <tr>
      <td>端口 QoS 模板 / 队列</td>
      <td>sonic-swss</td>
      <td>orchagent（qos）</td>
      <td>PORT_QOS_MAP、QUEUE、SCHEDULER</td>
      <td>config qos …</td>
      <td>show qos configuration；show queue counters</td>
    </tr>
    <tr>
      <td>ACL</td>
      <td>sonic-swss</td>
      <td>orchagent（acl）</td>
      <td>ACL_TABLE、ACL_RULE</td>
      <td>config acl add …</td>
      <td>show acl table；show acl rule</td>
    </tr>
    <tr>
      <td>PFC / ECN（RoCE 相关）</td>
      <td>sonic-swss、平台相关</td>
      <td>orchagent + 硬件能力</td>
      <td>PORT_QOS_MAP、PFC 相关映射</td>
      <td>config qos pfc …</td>
      <td>show pfc counters；show ecn</td>
    </tr>
  </tbody>
</table>

<h2>遥测 / 网管 / 日志</h2>
<table class="matrix">
  <thead><tr><th>功能</th><th>主要仓库</th><th>容器 / 组件</th><th>关键 DB 表（示意）</th><th>配置入口</th><th>验证命令（示意）</th></tr></thead>
  <tbody>
    <tr>
      <td>gNMI 遥测</td>
      <td>sonic-gnmi 等</td>
      <td>telemetry</td>
      <td>从 CONFIG_DB/STATE_DB 等读取路径相关数据</td>
      <td>配置订阅客户端与证书</td>
      <td>客户端订阅成功日志；推送样本</td>
    </tr>
    <tr>
      <td>SNMP</td>
      <td>sonic-snmp 等</td>
      <td>snmp</td>
      <td>多库聚合，视实现</td>
      <td>config snmp …</td>
      <td>snmpwalk 指定 OID（环境内）</td>
    </tr>
    <tr>
      <td>Syslog / 诊断包</td>
      <td>utilities、平台</td>
      <td>多容器日志</td>
      <td>—</td>
      <td>系统 syslog 配置</td>
      <td>show techsupport / support dump（视版本）</td>
    </tr>
  </tbody>
</table>

<h2>怎么用这张地图做培训</h2>
<ol>
  <li><strong>售前</strong>：客户问「支不支持 X」，先定位行，再问「目标镜像上验证命令输出是否归档」。</li>
  <li><strong>测试</strong>：按行设计用例，证据列写「命令输出 + 版本」。</li>
  <li><strong>PM</strong>：定型表「功能」列必须能映射到本页某一行，禁止只写营销词。</li>
</ol>
`,
  side: `
<div class="panel"><h2>使用方式</h2><ul>
  <li>售前：定位归谁管</li>
  <li>测试：生成验证命令</li>
  <li>PM：写入定型表</li>
</ul></div>
<div class="panel"><h2>官方文档</h2><ul>
  <li><a href="https://sonic.readthedocs.io/" target="_blank" rel="noopener">sonic.readthedocs.io</a></li>
  <li><a href="https://github.com/sonic-net" target="_blank" rel="noopener">github.com/sonic-net</a></li>
</ul></div>`,
};

const ecosystem = {
  file: 'ecosystem.html',
  title: '版本与生态怎么对上',
  description: '社区 release 节奏与命名、商业发行版对照、主流 ASIC 与白牌整机矩阵，附官方外链。',
  kicker: '知识库',
  h1: '版本与生态怎么对上',
  lead: '全站反复要求「结论对上版本」——本页解释版本从哪来、商业发行如何对照、ASIC 与整机如何分层，避免名词悬空。',
  tags: [{ text: 'P1' }, { text: '版本' }, { text: '生态' }],
  breadcrumb: [
    { label: '首页', href: 'index.html' },
    { label: '知识库', href: 'ecosystem.html' },
  ],
  prev: { href: 'feature-map.html', label: '功能特性地图' },
  next: { href: 'glossary.html', label: '术语与参数四态' },
  body: `
<h2>社区 release：节奏与命名（理解用）</h2>
<ul>
  <li>SONiC 社区以<strong>年份命名</strong>的版本线演进（如 202012、202211、202311、202411 等），具体以官方 release 页为准。</li>
  <li>分支与 feature freeze、回归窗口由社区治理流程决定；你的商业镜像<strong>必须写明基于哪条社区基线</strong>。</li>
  <li>产品文档禁止只写「最新 SONiC」；应写「基于 &lt;社区版本&gt; + &lt;发行版/厂商版本&gt; + 构建号/哈希」。</li>
</ul>
<div class="callout"><strong>官方入口：</strong>文档 <a href="https://sonic.readthedocs.io/" target="_blank" rel="noopener">sonic.readthedocs.io</a> · 代码组织 <a href="https://github.com/sonic-net" target="_blank" rel="noopener">github.com/sonic-net</a> · 镜像与发布说明以社区 GitHub Release / 分支说明为准。</div>

<h2>商业发行版对照（概念层，非推荐）</h2>
<table class="matrix">
  <thead><tr><th>类型</th><th>典型特征</th><th>产品要单独核验</th><th>易混点</th></tr></thead>
  <tbody>
    <tr>
      <td>community SONiC</td>
      <td>Apache 2.0；社区合并节奏；支持常以服务型提供</td>
      <td>自建镜像的构建链、补丁责任、CVE 跟踪</td>
      <td>把社区功能列表当商业 SLA</td>
    </tr>
    <tr>
      <td>芯片商 Enterprise SONiC</td>
      <td>与特定 ASIC SDK 深度绑定；生态平台列表</td>
      <td>目标板卡是否在清单；SDK/SAI 锁定</td>
      <td>「50+ 平台」= 你的 SKU 已支持</td>
    </tr>
    <tr>
      <td>整机厂商业发行</td>
      <td>绑定品牌机型、授权、升级资料、服务网络</td>
      <td>仅列出型号/授权路径能否覆盖项目</td>
      <td>推到非清单硬件</td>
    </tr>
    <tr>
      <td>厂商加固版（加固）</td>
      <td>选 PR、CI/CT、平台验证、缺陷关闭</td>
      <td>每个补丁的追溯链是否完整</td>
      <td>市场标签代替发布门禁</td>
    </tr>
  </tbody>
</table>

<h2>主流 ASIC 与白牌整机（分层矩阵示意）</h2>
<table class="matrix">
  <thead><tr><th>层</th><th>代表（示意）</th><th>公开材料常说</th><th>你必须落到</th></tr></thead>
  <tbody>
    <tr>
      <td>交换芯片</td>
      <td>Broadcom Tomahawk / Trident；NVIDIA Spectrum；Marvell Prestera 等</td>
      <td>吞吐档位、端口速率、AI/DC 定位</td>
      <td>目标 ASIC 型号 + SAI/SDK 版本 + 内核</td>
    </tr>
    <tr>
      <td>白牌 / ODM 整机</td>
      <td>Edgecore、Celestica、Delta 等开放网络机型（示例方向）</td>
      <td>机型矩阵、端口形态</td>
      <td>HW-SKU、板卡版本、ONIE/CPLD、HCL</td>
    </tr>
    <tr>
      <td>品牌整机</td>
      <td>Dell PowerSwitch 等与商业 SONiC 绑定的路径（示例方向）</td>
      <td>授权、升级、服务</td>
      <td>是否在该品牌清单与合同范围内</td>
    </tr>
    <tr>
      <td>光学与线缆</td>
      <td>多来源光模块 / DAC</td>
      <td>兼容、距离、速率</td>
      <td>实验室互通证据行</td>
    </tr>
  </tbody>
</table>
<p class="muted">本表只用于建立「参照框架」，不是选型推荐或正式 HCL。对外材料请以各厂商最新官方文档与合同范围为准。</p>

<h2>把版本写进结论的模板</h2>
<pre class="code-sample"><code>社区基线：202311（或目标发行版所声明的上游）
发行版/厂商版本：&lt;名称+版本&gt;
构建：&lt;镜像名/构建号/SHA256&gt;
平台：&lt;ODM/品牌 + HW-SKU + 板卡版本&gt;
SAI/SDK：&lt;版本&gt;  内核：&lt;版本&gt;
证据：&lt;链接或报告编号&gt;  负责人：&lt;姓名&gt;</code></pre>

<h2>官方与社区外链</h2>
<ul>
  <li><a href="https://sonic.readthedocs.io/" target="_blank" rel="noopener">SONiC 官方文档</a></li>
  <li><a href="https://github.com/sonic-net/sonic-buildimage" target="_blank" rel="noopener">sonic-buildimage</a>（镜像组装）</li>
  <li><a href="https://github.com/sonic-net/sonic-swss" target="_blank" rel="noopener">sonic-swss</a>（OrchAgent 等）</li>
  <li><a href="https://github.com/sonic-net/sonic-utilities" target="_blank" rel="noopener">sonic-utilities</a>（CLI）</li>
  <li><a href="https://github.com/sonic-net" target="_blank" rel="noopener">sonic-net 组织主页</a></li>
  <li><a href="https://www.opencompute.org/" target="_blank" rel="noopener">OCP（开放计算项目）</a></li>
</ul>
`,
  side: `
<div class="panel"><h2>版本一句话</h2><p style="font-size:14px">禁止「最新 SONiC」。必须写清社区基线 + 发行版 + 构建哈希 + 平台型号。</p></div>
<div class="panel"><h2>外链</h2><ul>
  <li><a href="https://sonic.readthedocs.io/" target="_blank" rel="noopener">Read the Docs</a></li>
  <li><a href="https://github.com/sonic-net" target="_blank" rel="noopener">GitHub sonic-net</a></li>
</ul></div>`,
};

module.exports = { featureMap, ecosystem };
