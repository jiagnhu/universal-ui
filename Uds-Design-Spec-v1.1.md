# Universal Design System (Uds) 设计规范 v1.2

> **目标**：构建一个跨框架、跨平台的 Web Components 组件体系。
> **特点**：适配 PC / iOS / Android，仅尺寸与状态不同，视觉统一。
> **更新**：增强暗黑模式支持，优化组件加载性能，提升可访问性。

---

## 1. 设计目标与原则

- **单一外观，多端密度**：统一视觉语言，通过密度与尺寸变量适配多端。
- **框架无关**：使用原生 Web Components（Custom Elements + Shadow DOM）。
- **可访问性优先**：符合 WCAG 2.2 AA 标准。
- **API 稳定**：一致的 Attributes / Properties / Events / Slots。
- **可主题化**：基于 CSS Custom Properties（Design Tokens）。
- **渐进增强**：支持 Declarative Shadow DOM，兼容旧版浏览器。对不支持 Declarative Shadow DOM 的浏览器，提供 polyfill 和服务端预渲染方案，确保基本功能可用。

---

## 2. 设计 Tokens（CSS 变量）

### 2.1 颜色

```css
:root {
  /* 基础颜色 - 亮色模式 */
  --uds-color-bg: #ffffff;
  --uds-color-bg-subtle: #f7f7f8;
  --uds-color-surface: #ffffff;
  --uds-color-border: #e5e7eb;
  --uds-color-text: #111827;
  --uds-color-text-muted: #6b7280;

  /* 品牌颜色 */
  --uds-color-primary: #3b82f6;
  --uds-color-primary-hover: #2563eb;
  --uds-color-primary-active: #1d4ed8;

  /* 功能色 */
  --uds-color-success: #16a34a;
  --uds-color-warning: #d97706;
  --uds-color-danger: #dc2626;
  --uds-color-info: #0ea5e9;

  /* 交互元素 */
  --uds-color-overlay: rgba(17,24,39,0.5);
  --uds-focus-ring: #2563eb;

  /* 按钮特定颜色 */
  --uds-btn-fg: #ffffff;
  --uds-btn-bg: var(--uds-color-primary);
  --uds-btn-bg-hover: var(--uds-color-primary-hover);
  --uds-btn-bg-active: var(--uds-color-primary-active);
  --uds-btn-disabled-bg: #cbd5e1;
  --uds-btn-disabled-fg: #ffffff;
  
  /* 阴影 */
  --uds-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --uds-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --uds-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* 暗黑模式颜色变量 */
[data-theme="dark"] {
  --uds-color-bg: #0b0f14;
  --uds-color-bg-subtle: #1a202c;
  --uds-color-surface: #111827;
  --uds-color-border: #253042;
  --uds-color-text: #e5e7eb;
  --uds-color-text-muted: #94a3b8;
  
  --uds-color-primary: #60a5fa;
  --uds-color-primary-hover: #3b82f6;
  --uds-color-primary-active: #2563eb;
  
  --uds-color-success: #22c55e;
  --uds-color-warning: #f59e0b;
  --uds-color-danger: #ef4444;
  --uds-color-info: #38bdf8;
  
  --uds-color-overlay: rgba(0,0,0,0.7);
  --uds-focus-ring: #60a5fa;
  
  --uds-btn-disabled-bg: #475569;
  --uds-btn-disabled-fg: #94a3b8;
  
  --uds-shadow-sm: 0 1px 2px rgba(255,255,255,0.05);
  --uds-shadow-md: 0 4px 6px rgba(255,255,255,0.07);
  --uds-shadow-lg: 0 10px 15px rgba(255,255,255,0.05);
}
```

---

### 2.2 排版

```css
:root{
  --uds-font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto;
  --uds-fs-md: 16px;
  --uds-line: 1.5;
}
```

---

### 2.3 间距与圆角

```css
:root{
  --uds-space-2: 8px;
  --uds-space-4: 16px;
  --uds-radius-md: 12px;
}
```

---

## 3. 密度（PC / Mobile）

```css
:root{ --uds-density: 0; }
[data-density="mobile"]{ --uds-density: 1; }

:root{
  --uds-cntl-h: 40px;
}
[data-density="mobile"]{
  --uds-cntl-h: 48px;
}
```

---

## 4. 交互状态规范

- 基本状态：`default` / `hover` / `active` / `focus-visible` / `disabled`。
- 焦点环：颜色 `--uds-focus-ring`，描边 2px。
- 移动端按压：scale(`--uds-scale-press`)，持续 120ms。

---

## 5. 无障碍（A11y）

- 组件语义完整（role, aria-*）。
- 键盘可达性：支持 Tab / Space / Enter。
- 对比度 ≥ 4.5:1。
- 屏幕阅读器支持。

---

## 6. 组件 API 约定

- 前缀统一：`<uds-button>`, `<uds-input>`。
- 属性小写短横线形式。
- 事件统一使用 `uds-*` 命名。
- 插槽（slot）命名规范：`icon`, `label`, `suffix`。
- 提供 `::part()` 接口样式出口。

---

## 7. 核心组件示例

### 7.1 Button `<uds-button>`

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| type | primary / secondary / danger / text | primary | 按钮类型，决定按钮的颜色和样式 |
| plain | boolean | false | 是否使用轮廓样式，设置为true时会应用outline样式 |
| size | xs / sm / md / lg | md | 按钮尺寸，其中xs为超小尺寸，适用于移动端 |
| round | boolean | false | 是否使用圆角，默认为直角 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |

> 注意：之前的`variant`属性已被移除，请使用`type`和`plain`属性组合来控制按钮样式

```html
<uds-button type="primary" size="md">
  <svg slot="icon" viewBox="0 0 24 24" width="1em" height="1em"></svg>
  保存
</uds-button>
```

#### 插槽

| 名称 | 描述 |
|------|------|
| default | 按钮文本内容 |
| icon | 按钮图标，通常放置在文本前面 |
| icon-right | 按钮右侧图标，通常放置在文本后面 |

#### 样式定制

```css
/* 使用::part选择器自定义按钮样式 */
uds-button::part(base) {
  border-radius: 4px;
}
```

#### 无障碍

- 按钮支持键盘导航和焦点状态
- 当按钮处于加载状态时，会自动添加`aria-busy="true"`属性
- 当按钮被禁用时，会自动添加`aria-disabled="true"`属性

---

### 7.2 Input `<uds-input>`

| 属性 | 类型 | 描述 |
|------|------|------|
| type | text / email / number / password | 输入类型 |
| placeholder | string | 占位提示 |
| value | string | 当前值 |
| disabled | boolean | 禁用状态 |
| readonly | boolean | 只读状态 |
| required | boolean | 是否必填 |
| pattern | string | 验证模式（正则表达式） |
| min-length | number | 最小长度 |
| max-length | number | 最大长度 |

#### 事件

| 事件名 | 描述 |
|--------|------|
| uds-input | 输入值变化时触发 |
| uds-change | 输入框失去焦点且值变化时触发 |
| uds-focus | 输入框获得焦点时触发 |
| uds-blur | 输入框失去焦点时触发 |

```html
<uds-input type="text" placeholder="请输入用户名">
  <svg slot="prefix-icon" viewBox="0 0 24 24"></svg>
  <button slot="suffix">清除</button>
</uds-input>
```

---

### 7.3 Switch `<uds-switch>`

| 属性 | 类型 | 描述 |
|------|------|------|
| checked | boolean | 是否选中 |
| disabled | boolean | 禁用状态 |
| size | sm / md / lg | 尺寸 |
| name | string | 表单名称 |

#### 事件

| 事件名 | 描述 |
|--------|------|
| uds-change | 开关状态变化时触发 |

```html
<uds-switch checked>
  <span slot="label">开启通知</span>
</uds-switch>
```

---

## 8. 主题与品牌扩展

- 主题切换：`data-theme="dark|light"`。
- 支持覆盖：`--uds-color-primary`、`--uds-color-text` 等。
- 通过 `::part()` 自定义样式。

---

## 9. 性能与工程

- 原生 + TypeScript。
- ESM 输出，Tree-shaking。
- 可按需加载组件。
- 支持 Declarative Shadow DOM。

### 9.1 组件文件结构

每个组件采用以下文件结构，实现关注点分离，提高可维护性：

```
src/components/[组件名]/
├── uds-[组件名].js    # 组件逻辑
├── uds-[组件名].css   # 组件样式
└── uds-[组件名].html  # 组件模板
```

组件逻辑文件通过动态导入方式加载CSS和HTML文件：

```js
// uds-button.js 示例
class UdsButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // 动态导入CSS和HTML
    Promise.all([
      fetch(new URL('./uds-button.css', import.meta.url)).then(r => r.text()),
      fetch(new URL('./uds-button.html', import.meta.url)).then(r => r.text())
    ]).then(([css, html]) => {
      this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
      // 初始化组件...
    });
  }
  // 其他方法...
}

### 9.2 浏览器兼容性

| 浏览器 | 最低支持版本 |
|--------|------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 15+ |
| Edge | 90+ |
| iOS Safari | 15+ |
| Android Chrome | 90+ |

对于不支持的浏览器，提供降级方案和polyfill。

### 9.3 Shadow DOM封装模式

组件默认使用`open`模式的Shadow DOM，允许外部JavaScript访问组件内部DOM：

```js
this.attachShadow({ mode: 'open' });
```

这种模式便于调试和第三方工具集成，同时保持足够的封装性。

### 9.4 组件生命周期

组件遵循标准Web Components生命周期：

- `constructor`: 初始化状态和Shadow DOM
- `connectedCallback`: 添加事件监听、初始化外部资源
- `disconnectedCallback`: 清理事件监听、释放资源
- `attributeChangedCallback`: 响应属性变化
- `adoptedCallback`: 处理组件在文档间移动

### 9.5 性能优化策略

- 延迟加载非关键组件
- 最小化重绘和回流
- 使用IntersectionObserver优化可见性检测
- 组件内部状态变更批量更新
- 资源预加载和缓存策略
- 组件渲染性能基准测试（≤16ms/帧）

---

## 10. 命名规范

| 类型 | 规则 |
|------|------|
| 组件名 | uds-* |
| 事件名 | uds-* |
| 部件名 | base, label, icon, field |
| Token | --uds-* |

---

## 11. 文档与交付清单

- `tokens.css`：设计变量。
- 基础组件：Button / Input / Select / Switch / Dialog。
- 文档：Markdown + Playground。
- 可访问性测试：axe / keyboard。

---

**Version**：1.2.0  
**Prefix**：Uds  
**Author**：Tang Yikai (YK)  
**Last Updated**：2023-11-15

---

## 13. 响应式设计指南

### 13.1 断点设计

```css
:root {
  --uds-breakpoint-sm: 640px;  /* 小屏幕设备 */
  --uds-breakpoint-md: 768px;  /* 中等屏幕设备 */
  --uds-breakpoint-lg: 1024px; /* 大屏幕设备 */
  --uds-breakpoint-xl: 1280px; /* 超大屏幕设备 */
}
```

### 13.2 响应式布局策略

- 移动优先设计：先为移动设备设计，再逐步扩展到更大屏幕
- 流式布局：使用百分比和视口单位（vw, vh）
- CSS Grid 和 Flexbox：灵活的布局系统
- 媒体查询：根据屏幕尺寸调整布局和组件尺寸

```css
@media (min-width: 768px) {
  :root {
    --uds-cntl-h: 40px;
    --uds-space-4: 16px;
  }
}
```

### 13.3 组件响应式行为

- 导航栏：小屏幕折叠为汉堡菜单
- 表格：小屏幕堆叠或水平滚动
- 网格：根据屏幕尺寸调整列数
- 图片：使用 `max-width: 100%` 确保不溢出容器

---

## 🌙 12. 暗黑模式（Dark Theme）设计规范

### 12.1 模式切换机制

```html
<html data-theme="light">…</html>
<html data-theme="dark">…</html>
```

JavaScript 自动检测与切换：

```js
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.dataset.theme = "dark";
}
document.querySelector("#toggle").onclick = () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
};
```

---

### 12.2 Token 层颜色定义

```css
:root {
  --uds-color-bg: #ffffff;
  --uds-color-surface: #ffffff;
  --uds-color-border: #e5e7eb;
  --uds-color-text: #111827;
  --uds-color-text-muted: #6b7280;
  --uds-color-primary: #3b82f6;
}

[data-theme="dark"] {
  --uds-color-bg: #0b0f14;
  --uds-color-surface: #111827;
  --uds-color-border: #253042;
  --uds-color-text: #e5e7eb;
  --uds-color-text-muted: #94a3b8;
  --uds-color-primary: #60a5fa;
}
```

✅ **要点**：暗色背景应更柔和、减少纯黑，主色略提亮以保持对比度。

---

### 12.3 阴影与层次调整

```css
:root {
  --uds-elevation-1: 0 1px 2px rgba(0,0,0,0.06);
}
[data-theme="dark"] {
  --uds-elevation-1: 0 1px 2px rgba(255,255,255,0.05);
}
```

---

### 12.4 动效与状态

- Hover / Focus / Active 状态用亮度变化表现：

```css
[data-theme="dark"] uds-button:hover::part(base) {
  filter: brightness(1.2);
}
```

- 动画平滑过渡：

```css
html {
  transition: background-color 0.3s var(--uds-ease),
              color 0.3s var(--uds-ease);
}
```

---

### 12.5 插图与图标

- 图标使用透明背景 SVG；颜色继承文本色。
- 若为彩色图标，提供暗色版本或动态亮度调整。

---

### ✅ 设计验证清单

| 检查项 | 说明 |
|--------|------|
| 对比度 | 文本/交互元素 ≥ 4.5:1 |
| 背景层次 | 明暗分明、不刺眼 |
| 焦点环 | 在暗色下依然清晰 |
| 图标与插图 | 在深色背景下可辨识 |

---
