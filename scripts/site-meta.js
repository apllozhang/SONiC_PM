'use strict';

/** 全站唯一版本号：改这里再 build/deploy */
const SITE_VERSION = '2.1.0';
const SITE_VERSION_LABEL = `v${SITE_VERSION}`;

/** CHANGELOG 数据（内容负责人列） */
const CHANGELOG = [
  {
    version: '2.1.0',
    date: '2026-09-15',
    owner: '内容组 / SONiC PM Atlas',
    summary: 'P2 成长梯度：L1–L3、案例口径、FAQ、目录',
    changes: [
      '新增 L1–L3 能力等级页并映射 12 周路线',
      '案例页补售前应答口径与测试用例要点',
      '新增 FAQ 与全站目录（目录内标题过滤）',
    ],
  },
  {
    version: '2.0.1',
    date: '2026-09-15',
    owner: '内容组 / SONiC PM Atlas',
    summary: 'P1 知识底座：架构扩容、功能地图、版本生态、真实样例',
    changes: [
      '架构线：容器全景、Redis 库表速查、重启影响矩阵、版本锁定样例',
      '新增功能特性地图（功能×仓库×容器×DB×命令）',
      '新增版本与生态坐标系（release、商业发行、ASIC/整机、官方外链）',
      '各能力线至少 1 个真实样例（HCL 行 / 用例 / PR 对应 / 定型行 / 报价拆行）',
    ],
  },
  {
    version: '2.0.0',
    date: '2026-09-15',
    owner: '内容组 / SONiC PM Atlas',
    summary: '培训可用性改版（评审 P0）',
    changes: [
      '统一全站版本号；新增 CHANGELOG 页与内容负责人列',
      '每页增加自测题与动手任务验收标准',
      '首页增加 PM / 售前 / 测试角色导航与培训使用说明',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-09-15',
    owner: '内容组 / SONiC PM Atlas',
    summary: '内容加厚与工具页',
    changes: [
      'Day/Track 扩写为结构化表格与案例',
      '新增术语与四态、产品定型核验包、厂商案例拆解',
      '部署脚本 deploy-nas.js 一键上线 NAS :8788',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-09-15',
    owner: '内容组 / SONiC PM Atlas',
    summary: 'ALE WebUI 静态站基线',
    changes: [
      '按 ALE 规范重建顶栏导航、亮暗主题、能力地图',
      '替换原 Manus SPA 内容骨架',
    ],
  },
];

/** 角色学习路径（首页用） */
const ROLE_PATHS = [
  {
    id: 'pm',
    name: '新任产品经理',
    focus: '分清责任层 · 定型核验包 · 商业化边界',
    weeks: '建议 3 天入门 + 12 周能力线全修',
    exam: '提交一份完整核验包（10 字段 + 证据链接 + 四态）并通过模拟定型会',
    steps: [
      { href: 'day-01.html', label: '第 1 天 产品地图' },
      { href: 'day-02.html', label: '第 2 天 功能证据' },
      { href: 'day-03.html', label: '第 3 天 试点验收' },
      { href: 'track-01.html', label: '供应链' },
      { href: 'track-05.html', label: '定型协同' },
      { href: 'track-06.html', label: '商业化' },
      { href: 'checklist.html', label: '核验包' },
    ],
  },
  {
    id: 'presales',
    name: '售前',
    focus: '场景化应答 · 证据口径 · 不过度承诺',
    weeks: '建议 3 天入门 + 供应链/测试/商业化 重点线',
    exam: '完成 3 份「客户原句 → 可承诺表述」改写，并附证据链接或明确标未披露',
    steps: [
      { href: 'day-01.html', label: '第 1 天' },
      { href: 'day-02.html', label: '第 2 天' },
      { href: 'cases.html', label: '案例拆解' },
      { href: 'track-01.html', label: '供应链' },
      { href: 'track-03.html', label: '测试运维' },
      { href: 'track-06.html', label: '商业化' },
      { href: 'glossary.html', label: '术语四态' },
    ],
  },
  {
    id: 'qa',
    name: '测试 / 质量',
    focus: '测试床对齐 · 异常用例 · 证据可回溯',
    weeks: '建议 3 天入门 + 架构/测试/定型 重点线',
    exam: '提交异常用例集（含恢复时间指标）与一份 Support Bundle 收集说明',
    steps: [
      { href: 'day-02.html', label: '第 2 天 功能证据' },
      { href: 'day-03.html', label: '第 3 天 试点验收' },
      { href: 'track-02.html', label: '架构与容器' },
      { href: 'track-03.html', label: '测试与运维' },
      { href: 'feature-map.html', label: '功能特性地图' },
      { href: 'checklist.html', label: '核验包' },
    ],
  },
];

/** L1–L3 等级 */
const LEVELS = [
  {
    level: 'L1',
    name: '入门 · 会问对问题',
    can: [
      '分清芯片 / 平台 / 镜像 / 服务四层责任',
      '把功能名改写成可验收场景（设备+条件+证据+负责人）',
      '正确使用参数四态，不把未披露写成不支持',
    ],
    evidence: [
      '3 天入门自测题正确率 ≥ 80%',
      '提交 1 份核验包草稿（至少场景、型号、NOS 版本、证据、负责人）',
    ],
    maps: '第 1–3 天入门 + 术语页',
  },
  {
    level: 'L2',
    name: '熟练 · 能撑起单模块',
    can: [
      '读懂控制面链路与容器职责，能解释故障卡在哪一环',
      '按功能×仓库×容器×DB 表定位验证命令',
      '独立完成供应链或测试床的证据收集',
    ],
    evidence: [
      '架构/测试自测 + 1 个真实样例解读笔记',
      '提交 1 条能力线的产出物（如兼容矩阵草稿或异常用例集）',
    ],
    maps: '供应链 / 架构 / 测试 / 社区 四条线任选 2 条主修',
  },
  {
    level: 'L3',
    name: '决策 · 能定型与商业化',
    can: [
      '主持定型核验包评审，处理未知项与风险签字',
      '对齐商业发行 vs 社区版的 TCO 与补丁责任',
      '对外材料不越过证据边界',
    ],
    evidence: [
      '完整 10 字段核验包 + 模拟定型会纪要',
      '商业化一页纸 + 支持边界说明',
    ],
    maps: '定型 / 商业化 + 案例页售前与测试口径',
  },
];

module.exports = {
  SITE_VERSION,
  SITE_VERSION_LABEL,
  CHANGELOG,
  ROLE_PATHS,
  LEVELS,
};
