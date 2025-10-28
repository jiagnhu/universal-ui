# Button 按钮

按钮用于触发一个操作，如提交表单、确认选择、取消操作等。

## 使用方式

```html
<uds-button type="primary">默认按钮</uds-button>
<uds-button type="primary" plain>轮廓按钮</uds-button>
<uds-button>幽灵按钮</uds-button>
<uds-button type="text">文本按钮</uds-button>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| type | `primary` \| `secondary` \| `danger` \| `text` \| `ghost` | `ghost` | 按钮类型，决定按钮的颜色和样式 |
| plain | `boolean` | `false` | 是否使用轮廓样式，设置为true时会应用outline样式 |
| size | `xs` \| `sm` \| `md` \| `lg` | `md` | 按钮尺寸，其中xs为超小尺寸，适用于移动端 |
| round | `boolean` | `false` | 是否使用圆角，默认为直角 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态 |

> 注意：之前的`variant`属性已被移除，请使用`type`和`plain`属性组合来控制按钮样式

## 插槽

| 名称 | 描述 |
|------|------|
| default | 按钮文本内容 |
| icon | 按钮图标，通常放置在文本前面 |
| icon-right | 按钮右侧图标，通常放置在文本后面 |

## 事件

| 名称 | 描述 |
|------|------|
| click | 点击按钮时触发 |

## 移动端适配

按钮组件针对移动端做了特殊适配：

1. **移除hover效果**：在移动设备（屏幕宽度 ≤ 768px）上，所有按钮的hover效果都被移除，以提供更好的触摸体验。
2. **超小尺寸按钮**：提供了xs尺寸的超小按钮，专为移动端紧凑布局设计。

## 示例

### 基础用法

```html
<uds-button type="primary">默认按钮</uds-button>
```

### 不同视觉样式

```html
<uds-button type="primary">实心按钮</uds-button>
<uds-button type="primary" plain>轮廓按钮</uds-button>
<uds-button>幽灵按钮</uds-button>
<uds-button type="text">文本按钮</uds-button>
```

### 不同语义类型

```html
<uds-button type="primary">主要按钮</uds-button>
<uds-button type="secondary">次要按钮</uds-button>
<uds-button type="danger">危险按钮</uds-button>
```

### 组合使用

```html
<uds-button type="primary" variant="outline">主要轮廓按钮</uds-button>
<uds-button type="secondary" variant="ghost">次要幽灵按钮</uds-button>
<uds-button type="danger" variant="text">危险文本按钮</uds-button>
```

### 不同尺寸

```html
<uds-button size="xs">超小按钮</uds-button>
<uds-button size="sm">小按钮</uds-button>
<uds-button size="md">中按钮</uds-button>
<uds-button size="lg">大按钮</uds-button>
```

> 注意：超小尺寸(xs)按钮专为移动端设计，在移动端使用时不会显示hover效果。

### 禁用状态

```html
<uds-button disabled>禁用按钮</uds-button>
```

### 加载状态

```html
<uds-button loading>加载中</uds-button>
```

### 带图标

```html
<uds-button>
  <svg slot="icon" viewBox="0 0 24 24" width="1em" height="1em">
    <!-- 图标路径 -->
  </svg>
  带图标按钮
</uds-button>
```

## 设计指南

- 使用不同的视觉样式（variant）来表达按钮的视觉层级：
  - solid：最突出的视觉效果，用于重要操作
  - outline：中等视觉强调，用于次要但仍需关注的操作
  - ghost：轻量级视觉效果，用于辅助操作
  - text：最轻量级的视觉效果，用于不需要强调的操作
- 使用不同的语义类型（type）来表达按钮的功能：
  - primary：主要操作，如确认、提交、保存
  - secondary：次要操作，如取消、返回、重置
  - danger：危险操作，如删除、清空、移除
- 按钮文本应简洁明了，通常使用动词或动词短语
- 避免在一个界面中放置过多同等重要性的按钮

## 无障碍

- 按钮支持键盘导航和焦点状态
- 当按钮处于加载状态时，会自动添加`aria-busy="true"`属性
- 当按钮被禁用时，会自动添加`aria-disabled="true"`属性

## CSS自定义属性

| 属性 | 默认值 | 描述 |
|------|-------|------|
| --uds-button-border-radius | var(--uds-radius-md) | 按钮边框圆角 |
| --uds-button-font-weight | 500 | 按钮文字粗细 |
| --uds-button-transition | all 0.2s | 按钮过渡效果 |