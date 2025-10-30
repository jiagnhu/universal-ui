import '@testing-library/jest-dom';

// 全局测试设置
window.customElements = window.customElements || {
  define: () => {},
  get: () => {},
  whenDefined: () => Promise.resolve(),
};

// 模拟自定义元素注册
class MockCustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback() {}
}

// 注册测试用的自定义元素
window.customElements.define = (name) => {
  customElements.get = (tagName) => {
    if (tagName === name) {
      return MockCustomElement;
    }
    return undefined;
  };
};