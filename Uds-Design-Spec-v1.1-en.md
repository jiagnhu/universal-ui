# Universal Design System (Uds) Design Specification v1.2

> **Goal**: Build a cross-framework, cross-platform Web Components system.
> **Features**: Compatible with PC / iOS / Android, with only size and state differences, unified visual design.
> **Updates**: Enhanced dark mode support, optimized component loading performance, improved accessibility.

---

## 1. Design Goals and Principles

- **Single Appearance, Multi-Density**: Unified visual language, adapting to multiple platforms through density and size variables.
- **Framework Agnostic**: Using native Web Components (Custom Elements + Shadow DOM).
- **Accessibility First**: Compliant with WCAG 2.2 AA standards.
- **Stable API**: Consistent Attributes / Properties / Events / Slots.
- **Themeable**: Based on CSS Custom Properties (Design Tokens).
- **Progressive Enhancement**: Support for Declarative Shadow DOM, compatible with older browsers. For browsers that don't support Declarative Shadow DOM, provide polyfill and server-side pre-rendering solutions to ensure basic functionality.

---

## 2. Design Tokens (CSS Variables)

### 2.1 Colors

```css
:root {
  /* Base Colors - Light Mode */
  --uds-color-bg: #ffffff;
  --uds-color-bg-subtle: #f7f7f8;
  --uds-color-surface: #ffffff;
  --uds-color-border: #e5e7eb;
  --uds-color-text: #111827;
  --uds-color-text-muted: #6b7280;

  /* Brand Colors */
  --uds-color-primary: #3b82f6;
  --uds-color-primary-hover: #2563eb;
  --uds-color-primary-active: #1d4ed8;

  /* Functional Colors */
  --uds-color-success: #16a34a;
  --uds-color-warning: #d97706;
  --uds-color-danger: #dc2626;
  --uds-color-info: #0ea5e9;

  /* Interactive Elements */
  --uds-color-overlay: rgba(17,24,39,0.5);
  --uds-focus-ring: #2563eb;

  /* Button-specific Colors */
  --uds-btn-fg: #ffffff;
  --uds-btn-bg: var(--uds-color-primary);
  --uds-btn-bg-hover: var(--uds-color-primary-hover);
  --uds-btn-bg-active: var(--uds-color-primary-active);
  --uds-btn-disabled-bg: #cbd5e1;
  --uds-btn-disabled-fg: #ffffff;
  
  /* Shadows */
  --uds-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --uds-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --uds-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* Dark Mode Color Variables */
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

### 2.2 Typography

```css
:root{
  --uds-font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto;
  --uds-fs-md: 16px;
  --uds-line: 1.5;
}
```

---

### 2.3 Spacing and Border Radius

```css
:root{
  --uds-space-2: 8px;
  --uds-space-4: 16px;
  --uds-radius-md: 12px;
}
```

---

## 3. Density (PC / Mobile)

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

## 4. Interaction State Specification

- Basic states: `default` / `hover` / `active` / `focus-visible` / `disabled`.
- Focus ring: Color `--uds-focus-ring`, 2px outline.
- Mobile press: scale(`--uds-scale-press`), duration 120ms.

---

## 5. Accessibility (A11y)

- Complete component semantics (role, aria-*).
- Keyboard accessibility: Support for Tab / Space / Enter.
- Contrast ratio ≥ 4.5:1.
- Screen reader support.

---

## 6. Component API Conventions

- Unified prefix: `<uds-button>`, `<uds-input>`.
- Attributes in lowercase kebab-case format.
- Events consistently use `uds-*` naming.
- Slot naming convention: `icon`, `label`, `suffix`.
- Provide `::part()` interface for styling.

---

## 7. Core Component Examples

### 7.1 Button `<uds-button>`

| Attribute | Type | Default | Description |
|------|------|-------|------|
| type | primary / secondary / danger / text | primary | Button type, determines button color and style |
| plain | boolean | false | Whether to use outline style, when set to true applies outline style |
| size | xs / sm / md / lg | md | Button size, where xs is extra small, suitable for mobile |
| round | boolean | false | Whether to use rounded corners, default is square |
| disabled | boolean | false | Whether disabled |
| loading | boolean | false | Whether to show loading state |

> Note: The previous `variant` attribute has been removed, please use the `type` and `plain` attributes combination to control button style

```html
<uds-button type="primary" size="medium">
  <svg slot="icon" viewBox="0 0 24 24" width="1em" height="1em"></svg>
  Save
</uds-button>
```

#### Slots

| Name | Description |
|------|------|
| default | Button text content |
| icon | Button icon, typically placed before the text |
| icon-right | Right button icon, typically placed after the text |

#### Style Customization

```css
/* Use ::part selector to customize button styles */
uds-button::part(base) {
  border-radius: 4px;
}
```

#### Accessibility

- Buttons support keyboard navigation and focus states
- When a button is in loading state, `aria-busy="true"` attribute is automatically added
- When a button is disabled, `aria-disabled="true"` attribute is automatically added

---

### 7.2 Input `<uds-input>`

| Attribute | Type | Description |
|------|------|------|
| type | text / email / number / password | Input type |
| placeholder | string | Placeholder text |
| value | string | Current value |
| disabled | boolean | Disabled state |
| readonly | boolean | Read-only state |
| required | boolean | Whether required |
| pattern | string | Validation pattern (regular expression) |
| min-length | number | Minimum length |
| max-length | number | Maximum length |

#### Events

| Event Name | Description |
|--------|------|
| uds-input | Triggered when input value changes |
| uds-change | Triggered when input loses focus and value has changed |
| uds-focus | Triggered when input gains focus |
| uds-blur | Triggered when input loses focus |

```html
<uds-input type="text" placeholder="Please enter username">
  <svg slot="prefix-icon" viewBox="0 0 24 24"></svg>
  <button slot="suffix">Clear</button>
</uds-input>
```

---

### 7.3 Checkbox `<uds-checkbox>`

| Attribute | Type | Description |
|------|------|------|
| checked | boolean | Whether checked |
| disabled | boolean | Disabled state |
| size | sm / md / lg | Size |
| name | string | Form name |
| description | string | Description text, provides additional explanation |

#### Events

| Event Name | Description |
|--------|------|
| uds-change | Triggered when checkbox state changes |

```html
<uds-checkbox checked>
  Accept Terms of Service
  <span slot="description">Including privacy policy and user agreement</span>
</uds-checkbox>
```

#### Style Specification

- When `description` attribute exists, container uses `align-items: flex-start` alignment
- When `description` attribute doesn't exist, container uses `align-items: center` alignment
- When `description` attribute doesn't exist, description element is not displayed

---

### 7.4 Radio `<uds-radio>`

| Attribute | Type | Description |
|------|------|------|
| checked | boolean | Whether checked |
| disabled | boolean | Disabled state |
| size | sm / md / lg | Size |
| name | string | Form name |
| value | string | Radio value |
| description | string | Description text, provides additional explanation |

#### Events

| Event Name | Description |
|--------|------|
| uds-change | Triggered when radio state changes |

```html
<uds-radio name="plan" value="basic" checked>
  Basic Plan
  <span slot="description">Suitable for individual users</span>
</uds-radio>
```

#### Style Specification

- When `description` attribute exists, container uses `align-items: flex-start` alignment
- When `description` attribute doesn't exist, container uses `align-items: center` alignment
- When `description` attribute doesn't exist, description element is not displayed

---

### 7.5 Switch `<uds-switch>`

| Attribute | Type | Description |
|------|------|------|
| checked | boolean | Whether checked |
| disabled | boolean | Disabled state |
| size | sm / md / lg | Size |
| name | string | Form name |

#### Events

| Event Name | Description |
|--------|------|
| uds-change | Triggered when switch state changes |

```html
<uds-switch checked>
  <span slot="label">Enable Notifications</span>
</uds-switch>
```

---

## 8. Theme and Brand Extension

- Theme switching: `data-theme="dark|light"`.
- Support for overrides: `--uds-color-primary`, `--uds-color-text`, etc.
- Custom styling through `::part()`.

---

## 9. Performance and Engineering

- Native + TypeScript.
- ESM output, Tree-shaking.
- Components can be loaded on demand.
- Support for Declarative Shadow DOM.

### 9.1 Component File Structure

Each component adopts the following file structure, implementing separation of concerns and improving maintainability:

```
src/components/[component-name]/
├── uds-[component-name].js    # Component logic
├── uds-[component-name].css   # Component styles
└── uds-[component-name].html  # Component template
```

Component logic files load CSS and HTML files through dynamic imports:

```js
// uds-button.js example
class UdsButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Dynamic import of CSS and HTML
    Promise.all([
      fetch(new URL('./uds-button.css', import.meta.url)).then(r => r.text()),
      fetch(new URL('./uds-button.html', import.meta.url)).then(r => r.text())
    ]).then(([css, html]) => {
      this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
      // Initialize component...
    });
  }
  // Other methods...
}
```

### 9.2 Browser Compatibility

| Browser | Minimum Supported Version |
|--------|------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 15+ |
| Edge | 90+ |
| iOS Safari | 15+ |
| Android Chrome | 90+ |

For unsupported browsers, fallback solutions and polyfills are provided.

### 9.3 Shadow DOM Encapsulation Mode

Components use Shadow DOM in `open` mode by default, allowing external JavaScript to access the component's internal DOM:

```js
this.attachShadow({ mode: 'open' });
```

This mode facilitates debugging and third-party tool integration while maintaining sufficient encapsulation.

### 9.4 Component Lifecycle

Components follow the standard Web Components lifecycle:

- `constructor`: Initialize state and Shadow DOM
- `connectedCallback`: Add event listeners, initialize external resources
- `disconnectedCallback`: Clean up event listeners, release resources
- `attributeChangedCallback`: Respond to attribute changes
- `adoptedCallback`: Handle component movement between documents

### 9.5 Performance Optimization Strategies

- Lazy loading of non-critical components
- Minimizing repaints and reflows
- Using IntersectionObserver for visibility detection
- Batch updates for component internal state changes
- Resource preloading and caching strategies
- Component rendering performance benchmarking (≤16ms/frame)

---

## 10. Naming Conventions

| Type | Rule |
|------|------|
| Component names | uds-* |
| Event names | uds-* |
| Part names | base, label, icon, field |
| Tokens | --uds-* |

---

## 11. Documentation and Delivery Checklist

- `tokens.css`: Design variables.
- Basic components: Button / Input / Select / Switch / Dialog.
- Documentation: Markdown + Playground.
- Accessibility testing: axe / keyboard.

---

## 12. Testing Framework and Usage

### 12.1 Testing Technology Stack

Universal Design System uses the following testing technology stack to ensure component quality:

| Tool | Purpose | Version |
|------|------|------|
| Vitest | Unit testing framework | 0.34.x+ |
| Testing Library | DOM testing tools | 14.x+ |
| Playwright | E2E testing | 1.40.x+ |
| Axe-core | Accessibility testing | 4.8.x+ |

### 12.2 Test Environment Configuration

The `vitest.config.js` file in the project root configures the test environment:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
    include: ['./test/**/*.test.js'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/']
    },
    globals: true
  }
});
```

### 12.3 Component Testing Specifications

Each component should include the following test types:

1. **Unit tests**: Test component API and functionality
2. **Accessibility tests**: Ensure components comply with WCAG standards
3. **Visual regression tests**: Ensure UI appearance consistency
4. **Integration tests**: Test component interaction with other components

### 12.4 Testing Examples

#### 12.4.1 Button Component Test Example

```js
// test/components/button/uds-button.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import '../../../src/components/button/uds-button.js';

describe('uds-button', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <uds-button>Click me</uds-button>
    `;
  });

  it('renders with correct text content', () => {
    const button = document.querySelector('uds-button');
    expect(button).toHaveTextContent('Click me');
  });

  it('emits click event when clicked', () => {
    const button = document.querySelector('uds-button');
    const clickSpy = vi.fn();
    button.addEventListener('click', clickSpy);
    
    button.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state correctly', () => {
    const button = document.querySelector('uds-button');
    button.setAttribute('disabled', '');
    
    expect(button.shadowRoot.querySelector('button')).toHaveAttribute('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});
```

#### 12.4.2 Accessibility Testing Example

```js
// test/a11y/button.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import '../../../src/components/button/uds-button.js';

expect.extend(toHaveNoViolations);

describe('uds-button accessibility', () => {
  it('should not have accessibility violations', async () => {
    document.body.innerHTML = `
      <uds-button>Accessible Button</uds-button>
    `;
    
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
```

### 12.5 Testing Best Practices

1. **Test coverage targets**: Core components ≥ 90%, non-core components ≥ 80%
2. **Test naming convention**: `[component-name].[test-type].test.js`
3. **Test priorities**:
   - High: Core interaction functionality, accessibility
   - Medium: Edge cases, performance
   - Low: Visual style details

### 12.6 Continuous Integration

The project uses GitHub Actions for continuous integration, running the following tests on each commit:

```yaml
# Test workflow example
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run test:a11y
```

---

## 13. Responsive Design Guidelines

### 13.1 Breakpoint Design

```css
:root {
  --uds-breakpoint-sm: 640px;  /* Small screen devices */
  --uds-breakpoint-md: 768px;  /* Medium screen devices */
  --uds-breakpoint-lg: 1024px; /* Large screen devices */
  --uds-breakpoint-xl: 1280px; /* Extra large screen devices */
}
```

### 13.2 Responsive Layout Strategies

- Mobile-first design: Design for mobile devices first, then progressively enhance for larger screens
- Fluid layouts: Use percentages and viewport units (vw, vh)
- CSS Grid and Flexbox: Flexible layout systems
- Media queries: Adjust layout and component sizes based on screen dimensions

```css
@media (min-width: 768px) {
  :root {
    --uds-cntl-h: 40px;
    --uds-space-4: 16px;
  }
}
```

### 13.3 Component Responsive Behaviors

- Navigation bar: Collapses to hamburger menu on small screens
- Tables: Stack or horizontally scroll on small screens
- Grids: Adjust number of columns based on screen size
- Images: Use `max-width: 100%` to ensure they don't overflow containers

---

## 🌙 14. Dark Mode Design Specification

### 14.1 Mode Switching Mechanism

```html
<html data-theme="light">…</html>
<html data-theme="dark">…</html>
```

Automatic detection and switching with JavaScript:

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

### 14.2 Token Layer Color Definition

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

✅ **Key points**: Dark backgrounds should be softer, avoid pure black, and primary colors should be slightly brightened to maintain contrast.

---

### 14.3 Shadow and Layer Adjustments

```css
:root {
  --uds-elevation-1: 0 1px 2px rgba(0,0,0,0.06);
}
[data-theme="dark"] {
  --uds-elevation-1: 0 1px 2px rgba(255,255,255,0.05);
}
```

---

### 14.4 Animation and States

- Hover / Focus / Active states expressed through brightness changes:

```css
[data-theme="dark"] uds-button:hover::part(base) {
  filter: brightness(1.2);
}
```

- Smooth transition animations:

```css
html {
  transition: background-color 0.3s var(--uds-ease),
              color 0.3s var(--uds-ease);
}
```

---

### 14.5 Illustrations and Icons

- Icons use transparent background SVGs; colors inherit from text color.
- For colored icons, provide dark versions or dynamic brightness adjustments.

---

### ✅ Design Validation Checklist

| Check Item | Description |
|--------|------|
| Contrast ratio | Text/interactive elements ≥ 4.5:1 |
| Background layers | Clear distinction, not harsh on eyes |
| Focus ring | Still clearly visible in dark mode |
| Icons and illustrations | Recognizable on dark backgrounds |

---

**Version**: 1.2.0  
**Prefix**: Uds  
**Author**: Tang Yikai (YK)  
**Last Updated**: 2025-10-30

---