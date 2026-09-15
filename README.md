# SONiC PM Atlas · ALE WebUI 重做版

无线上源码情况下，按 **ALE WebUI 设计规范 v6**（`http://10.20.30.203:8091`）重建的静态站，覆盖：

- 首页 Hero + 顶栏主导航 + 能力地图
- 第 1–3 天入门路径
- 六条十二周能力线
- 组件一致性（按钮 / 卡片 / 标签 / 表格 / 检查点）
- 亮暗主题、响应式（移动抽屉）、焦点环与 reduced-motion

## 本地预览

```powershell
cd sonic-pm-atlas
python -m http.server 8790
# 浏览器打开 http://127.0.0.1:8790/
```

## 部署到 NAS（:8788）

```powershell
# 口令：环境变量 NAS_PASSWORD，或 F:\AIwork\10.20.30.203.txt（勿入库）
$env:NODE_PATH = "F:\AIwork\Xiaomi\Vibe Coding\nvci-lite\node_modules"
node scripts\deploy-nas.js
# 完成后访问 http://10.20.30.203:8788/
```

脚本会：打包运行时文件 → SFTP 上传 → 替换 `/vol1/1000/docker/sonic-pm-academy/site/` → `docker compose build` → `docker rm -f` + `up -d` → 校验首页/health/静态资源。

## 目录

```text
index.html              首页
day-01.html …           三天入门
track-01.html …         六条能力线
css/tokens.css          ALE 设计令牌（亮/暗）
css/base.css            排版与可访问性基线
css/components.css      按钮/卡片/徽章等组件
css/atlas.css           顶栏导航与页面层
js/app.js               主题切换 + 移动端导航
scripts/build-pages.js  内容页生成
scripts/deploy-nas.js   一键部署 NAS
scripts/nas-ssh.js      SSH/SFTP（口令外置）
assets/brand/           ALE Logo
```

## 设计约束（来自规范站）

- 品牌紫只做关键操作与强调，页面底为 `#f7f7f5` 中性纸色
- 字体：Trebuchet MS + Noto Sans SC（中文）
- 圆角 8/12/16，动效 160/240ms，焦点可见
- 状态色双通道（颜色 + 文案/形状）
- 主导航在顶栏；Logo 始终回首页

## 与线上 8788 的关系

NAS 上容器 `sonic-pm-academy` 的 `site/` 已替换为本仓库静态站（旧 Manus SPA 不再提供）。GitHub：https://github.com/apllozhang/SONiC_PM

## 与线上 8788 的关系

线上是深色技术编辑风 SPA（Manus 托管，本机无源码）。本目录是**对齐 ALE 企业规范**的可维护静态重做，不是线上包的补丁。内容骨架来自线上截图与 bundle 文案抽取，深度正文已收敛为可交付的学习路径结构。
