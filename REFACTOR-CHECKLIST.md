# 名片秒递用户手册 -- 设计重构清单

**生成日期**: 2026-03-26
**评审范围**: `manual/` 目录 (VitePress 用户手册站点)
**Lighthouse**: A11y 100 | Best Practices 100 | SEO 83→预期 95+

---

## 已完成的修复 (Done)

### /typeset + /arrange (排版与布局)
- [x] H3 子元素间距优化 (h3+ul/ol/p margin-top: 0.6rem)
- [x] 连续 H3 标题间距紧凑化 (h3+h3 margin-top: 1.2rem)
- [x] 手机截图面板列宽 260px → 300px, 间距 12px → 18px
- [x] 手机边框 max-width 246px → 280px (提升截图可读性)

### /normalize + /adapt (一致性与响应式)
- [x] 小屏 (≤639px) 断点: 缩小 h2/h3 字号、表格字号、圆角适配
- [x] 平板 (640-959px) 断点: 文档区 padding 和图片宽度适配
- [x] 移除单页循环 footer pager (prev/next: false frontmatter)
- [x] SEO 增强: description、keywords、og:title、og:description meta 标签
- [x] 添加 favicon.png (64x64) 并在 head 中引用

### /quieter (视觉降噪)
- [x] body 背景: 4 层 radial-gradient 减为 2 层, 降低视觉噪音
- [x] 暗色模式背景: 简化为单层渐变

### /clarify + /harden (清晰度与健壮性)
- [x] 截图面板 aria-label="页面截图预览"
- [x] 截图图片 loading="lazy"
- [x] 截图加载失败兜底: onerror 显示"截图加载失败"文案
- [x] 打印样式表: 隐藏导航/侧栏/手机边框, 白色背景, 图片恢复显示
- [x] prefers-reduced-motion: 所有动画/过渡禁用

### /animate + /delight (动画与微交互)
- [x] H2 标题入场动画 (sectionFadeIn 0.4s)
- [x] 手机边框状态过渡: cubic-bezier 280ms 平滑曲线
- [x] 侧栏活跃链接 translateX(2px) 微交互
- [x] 回到顶部按钮: 滚动 >600px 渐入, 平滑滚动回顶部

### /polish (最终打磨)
- [x] 表格内 code 元素样式统一 (字号/内距/圆角/背景)
- [x] 回到顶部按钮无障碍: aria-label="回到顶部"
- [x] logo.png 压缩: 5.8MB → 69KB (256x256)

---

## 待办清单 (Remaining)

### P0 -- 必须修复

| # | 问题 | 技能 | 预估工时 |
|---|------|------|----------|
| 1 | 截图图片 alt 文本不够描述性 (如 "首页" → "名片秒递首页-显示名片卡片和访客统计") | /clarify | 15min |
| 2 | 所有截图 PNG 可压缩 (当前 7KB-90KB, 可用 tinypng 或 webp 进一步压缩 40%+) | /optimize | 10min |

### P1 -- 强烈建议

| # | 问题 | 技能 | 预估工时 |
|---|------|------|----------|
| 3 | 分离 style.css 为多文件: `base.css` / `layout.css` / `phone-frame.css` / `print.css` (当前 950+ 行) | /extract | 30min |
| 4 | 提取 PhoneFrame.vue 组件 (从 Layout.vue 中分离手机边框逻辑) | /extract | 45min |
| 5 | 表格在窄屏溢出 (附录页面路径表) -- 需要 overflow-x: auto wrapper | /adapt | 15min |
| 6 | "快速上手" 章节应增加步骤图示或编号圆圈样式以区分文字列表 | /bolder | 20min |
| 7 | 常见问题 (FAQ) 章节可改为折叠手风琴组件, 减少页面长度 | /distill | 40min |

### P2 -- 建议改进

| # | 问题 | 技能 | 预估工时 |
|---|------|------|----------|
| 8 | 暗色模式下表格 code 链接颜色偏暗, 需提高对比度 | /colorize | 10min |
| 9 | 搜索结果弹窗缺少中文本地化 (如 "No results" 应为 "未找到结果") | /clarify | 5min |
| 10 | 侧栏在窄桌面 (1100-1200px) 与手机面板可能重叠 | /adapt | 15min |
| 11 | 手机边框内截图长按保存/右键菜单未禁用 (可能误操作) | /harden | 10min |
| 12 | 页面无进度指示器 (如阅读进度条) | /delight | 25min |

### P3 -- 可选增强

| # | 问题 | 技能 | 预估工时 |
|---|------|------|----------|
| 13 | 添加页面切换/章节间的平滑过渡动画 | /animate | 20min |
| 14 | 侧栏当前章节高亮可增加左侧竖线指示器 | /polish | 10min |
| 15 | 支持 PWA 离线阅读 (VitePress PWA 插件) | /optimize | 30min |
| 16 | 页面底部增加 "本文是否有帮助?" 反馈组件 | /delight | 30min |

---

## 设计评分 (Nielsen Heuristics)

| # | 启发式 | 修前 | 修后 | 说明 |
|---|--------|------|------|------|
| 1 | 系统状态可见性 | 3 | 3.5 | +回到顶部按钮; TOC 仍可改进 |
| 2 | 系统与现实匹配 | 4 | 4 | 中文标签恰当 |
| 3 | 用户控制与自由 | 2 | 3 | +回到顶部; -缺少章节折叠 |
| 4 | 一致性与标准 | 3 | 3.5 | +统一排版间距; 锚链样式一致 |
| 5 | 错误预防 | 3 | 3.5 | +图片加载兜底 |
| 6 | 识别而非回忆 | 3 | 3 | 侧栏导航良好 |
| 7 | 灵活与高效 | 2 | 2.5 | +打印样式; 缺键盘快捷键 |
| 8 | 美学与极简 | 3 | 3.5 | +背景降噪; +手机面板增大 |
| 9 | 错误恢复 | 3 | 3 | 文档站无操作错误 |
| 10 | 帮助与文档 | 3 | 3 | 本身即文档 |
| **总分** | | **29/40** | **32.5/40** | **良好→优秀** |

---

## 技术债务备注

1. `style.css` 已膨胀至 ~950 行, 应拆分模块化管理
2. `Layout.vue` 中 DOM 操作逻辑过重, 建议拆为 composable (usePhonePanel / useScrollToTop)
3. 考虑用 VitePress 的 markdown-it 插件替代运行时 DOM panel 构建
4. 截图图片应考虑 WebP 格式 + `<picture>` 标签 fallback

---

## 推荐执行顺序

```
P0 #1-2  →  P1 #3-4  →  P1 #5-7  →  P2 #8-12  →  P3 可选
(30min)     (75min)     (75min)     (65min)       (90min)
```

**总预期工时**: 约 5.5 小时 (不含 P3)

> 可运行 `/critique` 复审评分变化。
