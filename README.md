# SONiC PM Atlas · ALE WebUI 重做版

按 **ALE WebUI 设计规范 v6**（`http://10.20.30.203:8091`）重建的静态学习站，覆盖：

- 首页 Hero + 顶栏主导航 + 能力地图
- 第 1–3 天入门路径
- 六条十二周能力线
- 工具页：术语与四态 / 产品定型核验包 / 厂商案例拆解
- 组件一致性、亮暗主题、响应式与可访问性基线

---

## 评审说明（给同事）

### 我该看哪里

| 角色 | 建议入口 | 要回答的问题 |
|---|---|---|
| 产品 / 售前 / 业务 | 线上站 http://10.20.30.203:8788/ | 路径能不能走通？表述是否好懂？能否直接用于定型会？ |
| 内容评审 | 顶栏「3 天入门」→「术语 / 核验包 / 案例」 | 概念是否正确、例子是否误导、清单字段够不够用 |
| 设计 / 体验 | 首页 + 任意 Day 页，亮暗各一遍 | 对齐 ALE 规范？导航能否回首页？断行与密度？ |
| 工程 / 运维 | 本仓库 + NAS 容器目录 | 结构是否清晰？部署是否可重复？有无密钥入库？ |

内网地址：`http://10.20.30.203:8788/` 与 `http://10.10.10.218:8788/` 为同一服务。

### 建议评审路径（约 30–40 分钟）

1. **首页**：信息优先级是否是「先 3 天入门，再六条能力线」。
2. **第 1 天**：四层责任表、案例陷阱、核验包八字段是否可直接用。
3. **第 2 天**：功能名 → 可验收场景改写、参数四态。
4. **第 3 天**：试点检查清单、交付包、证据链六步。
5. **工具三页**：术语、核验包十项字段、厂商案例六层追问。
6. **对照能力线 01–06**：任选一条看是否与入门内容重复或矛盾。

### 意见怎么提（推荐格式）

在 GitHub Issue 或共享表格里，每条意见包含：

```text
位置：页面 + 章节标题（例：day-01.html ·「四层责任地图」）
类型：事实错误 / 表述不清 / 缺例子 / 结构问题 / 设计问题
建议：希望改成什么（可选）
严重度：P0 必须改 / P1 应改 / P2 可改可不改
```

### 代码与运行位置（给要改的人）

| 位置 | 路径 |
|---|---|
| 本地源码 | `F:\AIwork\Xiaomi\Vibe Coding\sonic-pm-atlas\` |
| 正文真源 | `scripts/content-days.js`、`scripts/content-tracks.js` |
| Git | https://github.com/apllozhang/SONiC_PM （`main`） |
| 线上静态文件 | NAS `/vol1/1000/docker/sonic-pm-academy/site/` |
| 线上服务 | 容器 `sonic-pm-academy`（镜像 `1.7.1`，端口 `8788`） |

改内容：编辑 `content-*.js` → `node scripts/build-pages.js` → 本地预览确认 → `node scripts/deploy-nas.js`。  
**口令不入库**：使用环境变量 `NAS_PASSWORD` 或仓库外的 `10.20.30.203.txt`。

### 评审边界（避免扯偏）

- 本站在训练「分层核验产品结论」，**不是**任一厂商的正式支持清单或型号 HCL。
- 案例页只用公开叙事做练习，**不作**厂商排名，对外材料须以官方文档与合同范围为准。
- 参数四态（有值 / 待复核 / 未披露 / 抽取失败）语义不可弱化：未披露 ≠ 不支持。

### 本地预览

```powershell
cd sonic-pm-atlas
python -m http.server 8790
# http://127.0.0.1:8790/
```

### 部署到 NAS（:8788）

```powershell
$env:NODE_PATH = "F:\AIwork\Xiaomi\Vibe Coding\nvci-lite\node_modules"
node scripts\deploy-nas.js
# http://10.20.30.203:8788/
```

脚本：打包 → SFTP → 替换 `site/` → `docker compose build` → 重建容器 → 校验。

---

## 目录

```text
index.html                 首页
day-01.html …              三天入门
track-01.html …            六条能力线
glossary.html              术语与参数四态
checklist.html             产品定型核验包
cases.html                 厂商案例拆解
css/                       ALE 令牌与组件样式
js/app.js                  主题 + 移动端导航
scripts/content-days.js    Day 正文真源
scripts/content-tracks.js  Track / 工具页正文真源
scripts/build-pages.js     页面生成
scripts/deploy-nas.js      一键部署
scripts/nas-ssh.js         SSH（口令外置）
assets/brand/              ALE Logo
```

## 设计约束（来自规范站）

- 品牌紫只做关键操作与强调，页面底为 `#f7f7f5` 中性纸色
- 字体：Trebuchet MS + Noto Sans SC（中文）
- 圆角 8/12/16，动效 160/240ms，焦点可见
- 主导航在顶栏；Logo 始终回首页

## 与线上 8788 的关系

NAS 容器 `sonic-pm-academy` 的 `site/` 已替换为本仓库静态站（旧 Manus 包不再提供）。GitHub：https://github.com/apllozhang/SONiC_PM
