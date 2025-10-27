# 基于 Framework7 架构思想的组件库目录结构设计方案

本文档给出一份基于 Framework7 架构思想的组件库目录结构方案，涵盖多端适配、插件体系、主题与构建发布等关键维度，适用于从零规划或渐进式演进的组件库。

**总体思路**
- 双层内核：核心能力与平台适配分层（Core + Platform Adapters）。
- 组件分域：UI 组件、功能组件、服务能力解耦（Components + Services）。
- 插件扩展：以插件注册、生命周期与指令/方法扩展为主（Plugins）。
- 主题系统：变量、皮肤、暗色方案独立（Themes + Styles）。
- 多端输出：Web/Vue/React/Svelte 等 adapter 同源组件模型（Adapters）。
- 工程支撑：脚手架、文档站、测试与发布流水线（Tools + Scripts + Docs）。

## 目录结构

- packages/
  - core/
    - src/
      - index.ts
      - app/
        - create-app.ts
        - config.ts
        - lifecycle.ts
        - router/
          - index.ts
          - route-types.ts
        - state/
          - store.ts
          - modules/
      - dom/
        - utils.ts
        - events.ts
      - utils/
        - device.ts
        - support.ts
        - i18n/
          - index.ts
          - locales/
      - plugins/
        - plugin-registry.ts
        - plugin-types.ts
      - themes/
        - index.ts
        - tokens/
          - default.ts
          - dark.ts
          - ios.ts
          - md.ts
      - styles/
        - core.css
        - reset.css
      - components/
        - base-component.ts
        - helpers/
    - tests/
    - package.json
    - README.md
  - adapters/
    - web/
      - src/
        - index.ts
        - runtime/
          - mount.ts
          - hydrate.ts
        - bridges/
          - events-bridge.ts
          - style-bridge.ts
      - package.json
    - vue/
      - src/
        - index.ts
        - components/
          - Button.vue
          - List.vue
          - Modal.vue
          - form/
        - directives/
        - composables/
          - useTheme.ts
          - useStore.ts
        - plugin.ts
      - tests/
      - package.json
    - react/
      - src/
        - index.ts
        - components/
          - Button.tsx
          - List.tsx
          - Modal.tsx
        - hooks/
          - useTheme.ts
          - useStore.ts
        - provider/
          - UIProvider.tsx
      - tests/
      - package.json
    - svelte/
      - src/
        - index.ts
        - components/
      - package.json
  - components/
    - src/
      - atoms/
        - button/
          - button.core.ts
          - button.tokens.ts
          - button.css
          - README.md
        - icon/
      - molecules/
        - list/
        - toolbar/
      - organisms/
        - modal/
        - tabs/
      - layouts/
        - grid/
        - page/
      - services/
        - toast/
          - toast.core.ts
          - toast.css
        - dialog/
      - form/
        - input/
        - checkbox/
        - select/
      - navigation/
        - router-link/
        - view/
      - data/
        - virtual-list/
        - pull-to-refresh/
      - animations/
        - transition.ts
        - ripple.ts
      - index.ts
    - tests/
    - package.json
  - plugins/
    - src/
      - virtualization/
        - index.ts
        - core.ts
      - pull-to-refresh/
      - swipe-actions/
      - keyboard/
      - accessibility/
      - i18n-ext/
      - analytics/
    - package.json
  - themes/
    - src/
      - ios/
        - tokens.ts
        - components/
          - button.css
          - list.css
      - md/
        - tokens.ts
        - components/
      - dark/
        - tokens.ts
      - high-contrast/
        - tokens.ts
      - mixins/
        - color-schemes.ts
        - elevation.ts
      - index.ts
    - package.json
  - icons/
    - src/
      - f7/
      - material/
      - outline/
    - build/
      - generate-sprites.ts
    - package.json
  - docs/
    - site/
      - pages/
        - getting-started.md
        - theming.md
        - routing.md
        - plugins.md
        - adapters/
          - vue.md
          - react.md
      - examples/
        - kitchen-sink/
        - mobile/
      - components/
        - button.md
        - list.md
        - modal.md
      - playground/
    - scripts/
      - gen-docs-from-ts.ts
    - package.json
  - cli/
    - src/
      - index.ts
      - create/
      - build/
      - migrate/
    - package.json
  - build/
    - rollup.config.base.mjs
    - rollup.config.vue.mjs
    - rollup.config.react.mjs
    - tsconfig.base.json
    - postcss.config.cjs
  - scripts/
    - release.ts
    - verify-types.ts
    - check-themes.ts
    - benchmark/
      - perf-scenarios.ts
  - playground/
    - vue/
    - react/
    - web/
  - tsconfig.json
  - package.json
  - pnpm-workspace.yaml

## 关键设计说明

- Core 内核
  - 统一应用模型：`create-app`、`config`、`lifecycle`、`router`、`state`，借鉴 Framework7 App 实例思想，保持无框架依赖。
  - DOM/Utils 分离：设备/能力探测、事件封装、国际化基础设施集中在 core。
  - 插件注册中心：`plugin-registry` 管理插件生命周期（install/use）、命名空间与依赖。

- Components 分层
  - atoms/molecules/organisms 分级，组件核心逻辑与样式、主题 tokens 解耦（`.core.ts` + `.css` + `tokens.ts`）。
  - 服务型组件如 Toast/Dialog 归入 `services`，暴露命令式 API 与可挂载的容器。

- Adapters 多端
  - Web Adapter 负责与 DOM/样式运行时桥接。
  - Vue/React/Svelte Adapter 将 core 组件包装为各框架组件，提供 hooks/composables 与 Provider/Plugin。

- 主题与样式
  - 独立 tokens 仓：`themes/tokens` 定义平台主题变量（iOS/Material/暗色/高对比）。
  - 组件样式按主题覆写：`themes/*/components/*`。
  - 全局样式与 Reset 在 `core/styles`，组件局部样式靠按需引入。

- 插件体系
  - 官方插件集中至 `packages/plugins`，与第三方插件保持一致约定（manifest、peerDeps、install(app)）。
  - 常用能力：虚拟列表、下拉刷新、滑动动作、A11y、键盘、分析埋点等。

- 文档与示例
  - 文档站包含“厨房 Sink”和移动示例；通过脚本从 TS 注释生成 API 文档。
  - 按适配器分章提供使用指南与最佳实践。

- 构建与发布
  - Monorepo（pnpm）管理，子包独立版本或统一版本可选。
  - Rollup 多入口：core、components、adapters、plugins 按需打包 ES/CJS/DTS。
  - 脚本自动化：类型校验、主题一致性检查、基准性能场景。

## 代码与命名约定

- 文件命名：核心逻辑 `.core.ts`，适配层 `.vue/.tsx` 包装；样式 `.css`，主题变量 `tokens.ts`。
- 组件导出：每个组件目录内 `index.ts` 统一导出，`packages/components/src/index.ts` 聚合导出。
- 前缀规范：组件命名统一前缀（如 F7Button），指令/插件命名空间防冲突。
- 样式变量：尽量使用 CSS Variables 暴露主题钩子，JS Tokens -> CSS Vars 转译。

## 最小落地路径（建议迭代）

1. 初始化 core（app、router、state、plugins），提供最小运行骨架。
2. 搭建 Vue Adapter，封装 3–5 个基础组件（Button/List/Modal/Input/Toolbar）。
3. 建立主题 tokens（default + dark），完成样式变量接入。
4. 打通文档站和 kitchen-sink，验证移动端交互。
5. 扩展插件（virtual-list、pull-to-refresh），完善导航与服务组件。
6. 引入 React Adapter，实现同构用法与一致 API。

> 如需，我可以进一步补充：组件 API 规范模板、插件 manifest 约定、Rollup 配置样例或主题 token 示例。

## 当前最小实现（Web Components）

- 入口与演示：`index.html`，直接用浏览器打开即可预览按钮组件。
- 样式与主题：
  - `src/styles/tokens.css` 定义 CSS 变量（颜色、圆角、间距、字号）。
  - `src/styles/base.css` 提供基础样式与 Button 的外观（支持 size/variant/loading/disabled）。
- 组件注册：
  - `src/index.js` 作为入口，注册 Web Components。
  - `src/components/button/f7-button.js` 实现 `<f7-button>` 自定义元素。

### 使用示例

在任意 HTML 中：

```
<link rel="stylesheet" href="src/styles/tokens.css" />
<link rel="stylesheet" href="src/styles/base.css" />
<script type="module" src="src/index.js"></script>

<f7-button>默认按钮</f7-button>
<f7-button variant="primary">主要按钮</f7-button>
<f7-button variant="outline">描边按钮</f7-button>
<f7-button variant="ghost">幽灵按钮</f7-button>

<f7-button size="sm">小</f7-button>
<f7-button size="lg">大</f7-button>

<f7-button loading>加载中</f7-button>
<f7-button disabled>禁用</f7-button>
```

JS 监听事件：

```
document.querySelector('f7-button')
  .addEventListener('f7-click', (e) => {
    console.log('clicked', e.detail);
  });
```

属性支持：`variant`（primary/outline/ghost）、`size`（sm/md/lg，默认 md）、`disabled`、`loading`。

后续可扩展项：
- 无障碍增强：键盘交互与 aria 属性细化、聚焦环自定义。
- 图标与内容布局：支持 `icon` slot 与 `icon-only` 尺寸规范。
- 设计令牌：根据 iOS/Material 主题派生 token，并按主题切换覆盖。

