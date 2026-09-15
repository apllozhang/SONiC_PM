# SONiC PM Atlas · ALE WebUI 重做版

无线上源码情况下，按 **ALE WebUI 设计规范 v6**（`http://10.20.30.203:8091` / `http://10.10.10.218:8091`）重建的静态站，覆盖：

- 首页 Hero + 左栏学习导航 + 能力地图
- Day 01–03 入门路径
- Track 01–06 十二周能力线
- 组件一致性（按钮 / 卡片 / 标签 / 表格 / 门禁列表）
- 亮暗主题、响应式（桌面左栏 / 移动抽屉）、焦点环与 reduced-motion

## 本地预览

```powershell
cd sonic-pm-atlas
python -m http.server 8790
# 浏览器打开 http://127.0.0.1:8790/
```

## 目录

```text
index.html          首页
day-01.html …       三天入门
track-01.html …     六条能力线（双周模块）
css/tokens.css      ALE 设计令牌（亮/暗）
css/base.css        排版与可访问性基线
css/components.css  按钮/卡片/徽章等组件
css/atlas.css       站点布局与页面层
js/app.js           侧栏折叠、移动端抽屉、主题
scripts/build-pages.js  内容页生成脚本
assets/brand/       ALE Logo
```

## 设计约束（来自规范站）

- 品牌紫只做关键操作与强调，页面底为 `#f7f7f5` 中性纸色
- 字体：Trebuchet MS + Noto Sans SC（中文）
- 圆角 8/12/16，动效 160/240ms，焦点可见
- 状态色双通道（颜色 + 文案/形状）

## 与线上 8788 的关系

线上是深色技术编辑风 SPA（Manus 托管，本机无源码）。本目录是**对齐 ALE 企业规范**的可维护静态重做，不是线上包的补丁。内容骨架来自线上截图与 bundle 文案抽取，深度正文已收敛为可交付的学习路径结构。
