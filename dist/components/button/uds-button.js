// @ts-nocheck

// UDS Button Component
class UdsButton extends HTMLElement {
  // Define private properties
  _button = null;
  
  static get observedAttributes() {
    return ['size', 'disabled', 'loading', 'type', 'round', 'plain'];
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  connectedCallback() {
    this._upgradeProperty('size');
    this._upgradeProperty('disabled');
    this._upgradeProperty('loading');
    this._upgradeProperty('type');
    this._upgradeProperty('round');
    this._upgradeProperty('plain');

    this.setAttribute('role', 'button');
    this.tabIndex = this.disabled ? -1 : 0;
    this.addEventListener('click', this._onClick);
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  attributeChangedCallback() {
    this._updateState();
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  async _render() {
    if (!this.shadowRoot) return;
    
    // 加载CSS
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', new URL('./uds-button.css', import.meta.url).href);
    this.shadowRoot.appendChild(linkElem);
    
    // 加载HTML模板
    try {
      const response = await fetch(new URL('./uds-button.html', import.meta.url).href);
      const templateText = await response.text();
      const template = document.createElement('template');
      template.innerHTML = templateText;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      // 获取按钮元素引用
      this._button = this.shadowRoot.querySelector('.button');
      this._updateState();
    } catch (error) {
      console.error('Failed to load button template:', error);
    }
  }

  _updateState() {
    if (!this._button) return;
    
    // 处理variant属性（优先）
    this._button.classList.remove('button--solid', 'button--outline', 'button--ghost', 'button--text');
    if (this.hasAttribute('variant')) {
      const variant = this.getAttribute('variant');
      this._button.classList.add(`button--${variant}`);
    } else if (this.type === 'text') {
      // 如果type是text，应用文本按钮样式
      this._button.classList.add('button--text');
    } else if (this.plain) {
      // 如果没有variant但有plain属性
      this._button.classList.add('button--outline');
    } else if (this.hasAttribute('type')) {
      // 如果有type属性但没有variant和plain
      this._button.classList.add('button--solid');
    } else {
      // 默认为ghost（幽灵按钮）
      this._button.classList.add('button--ghost');
    }
    
    // Update type
    this._button.classList.remove('button--primary', 'button--secondary', 'button--danger');
    if (this.hasAttribute('type') && this.type !== 'text') {
      const type = this.type || 'primary';
      this._button.classList.add(`button--${type}`);
    } else if (this.type === 'text') {
      // 为文本按钮添加默认primary类型
      this._button.classList.add('button--primary');
    }
    
    // Update size
    this._button.classList.remove('button--sm', 'button--lg');
    if (this.size && this.size !== 'md') {
      this._button.classList.add(`button--${this.size}`);
    }
    
    // Update shape
    this._button.classList.remove('button--round');
    if (this.round) {
      this._button.classList.add('button--round');
    }
    
    // Update disabled state
    this._button.disabled = this.disabled;
    this._button.setAttribute('aria-disabled', String(this.disabled));
    
    // Update loading state
    if (this.loading) {
      this._button.classList.add('button--loading');
      this._button.setAttribute('aria-busy', 'true');
    } else {
      this._button.classList.remove('button--loading');
      this._button.removeAttribute('aria-busy');
    }
  }

  _onClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('uds-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }

  _onKeyDown(event) {
    if (this.disabled || this.loading) return;
    
    // Handle space and enter keys
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this._button) {
        this._button.click();
      }
    }
  }

  // Properties
  get plain() {
    return this.hasAttribute('plain');
  }
  
  set plain(value) {
    if (value) {
      this.setAttribute('plain', '');
    } else {
      this.removeAttribute('plain');
    }
  }
  
  get size() {
    return this.getAttribute('size');
  }
  
  set size(value) {
    if (value === null) {
      this.removeAttribute('size');
    } else {
      this.setAttribute('size', value);
    }
  }
  
  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
    
    this.tabIndex = value ? -1 : 0;
  }
  
  get loading() {
    return this.hasAttribute('loading');
  }
  
  set loading(value) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }
  
  get round() {
    return this.hasAttribute('round');
  }
  
  set round(value) {
    if (value) {
      this.setAttribute('round', '');
    } else {
      this.removeAttribute('round');
    }
  }
  
  get type() {
    return this.getAttribute('type') || 'primary';
  }
  
  set type(value) {
    if (value === null) {
      this.removeAttribute('type');
    } else {
      this.setAttribute('type', value);
    }
  }
}

// Register the custom element
customElements.define('uds-button', UdsButton);

export default UdsButton;