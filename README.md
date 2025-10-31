# Universal Design System

一个简洁、易用的Web组件库，基于原生Web Components技术构建。

## 安装

```bash
npm install universal-design-system
```

## 使用方法

### 引入组件

```js
// 引入所有组件
import 'universal-design-system';

// 或者单独引入某个组件
import 'universal-design-system/dist/components/button';
```

### 在HTML中使用

```html
<!-- 基础按钮 -->
<uds-button>默认按钮</uds-button>

<!-- 不同类型的按钮 -->
<uds-button type="primary">主要按钮</uds-button>
<uds-button type="secondary">次要按钮</uds-button>
<uds-button type="danger">危险按钮</uds-button>

<!-- 轮廓按钮 -->
<uds-button type="primary" plain>主要轮廓按钮</uds-button>

<!-- 不同尺寸 -->
<uds-button size="small">小按钮</uds-button>
 <uds-button size="medium">中按钮</uds-button>
 <uds-button size="large">大按钮</uds-button>
  
 <!-- 禁用状态 -->
<uds-button disabled>禁用按钮</uds-button>

<!-- 加载状态 -->
<uds-button loading>加载中</uds-button>

<!-- 带图标 -->
<uds-button>
  <svg slot="icon" viewBox="0 0 24 24" width="1em" height="1em">
    <!-- 图标路径 -->
  </svg>
  带图标的按钮
</uds-button>
```

## 组件文档

查看各组件的详细文档和示例：

- [Button 按钮](./src/components/button/README.md)

## 浏览器支持

支持所有现代浏览器和IE11（需要相应的polyfills）。

