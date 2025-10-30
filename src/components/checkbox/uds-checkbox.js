// @ts-nocheck

// UDS Checkbox Component
class UdsCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'disabled', 'checked', 'indeterminate', 'name', 'value', 'text', 'ghost', 'outline', 'solid'];
  }

  constructor() {
    super();
    this._container = null;
    this._input = null;
    this._onClick = this._onClick.bind(this);
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  connectedCallback() {
    this._upgradeProperty('type');
    this._upgradeProperty('size');
    this._upgradeProperty('disabled');
    this._upgradeProperty('checked');
    this._upgradeProperty('indeterminate');
    this._upgradeProperty('name');
    this._upgradeProperty('value');
    this._upgradeProperty('text');
    this._upgradeProperty('ghost');
    this._upgradeProperty('outline');
    this._upgradeProperty('solid');

    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
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
    linkElem.setAttribute('href', new URL('./uds-checkbox.css', import.meta.url).href);
    this.shadowRoot.appendChild(linkElem);
    
    // 加载HTML模板
    try {
      const response = await fetch(new URL('./uds-checkbox.html', import.meta.url).href);
      const templateText = await response.text();
      const template = document.createElement('template');
      template.innerHTML = templateText;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      // 获取元素引用
      this._container = this.shadowRoot.querySelector('.checkbox-container');
      this._input = this.shadowRoot.querySelector('.checkbox-input');
      this._updateState();
    } catch (error) {
      console.error('Failed to load checkbox template:', error);
    }
  }

  _updateState() {
    if (!this._container || !this._input) return;
    
    // 处理类型
    this._container.classList.remove('primary', 'secondary', 'danger');
    if (this.hasAttribute('type')) {
      const type = this.getAttribute('type');
      this._container.classList.add(type);
    } else {
      this._container.classList.add('primary'); // 默认为primary
    }
    
    // 处理样式
    this._container.classList.remove('style-text', 'style-ghost', 'style-outline', 'style-solid');
    if (this.hasAttribute('text')) {
      this._container.classList.add('style-text');
    } else if (this.hasAttribute('ghost')) {
      this._container.classList.add('style-ghost');
    } else if (this.hasAttribute('outline')) {
      this._container.classList.add('style-outline');
    } else if (this.hasAttribute('solid')) {
      this._container.classList.add('style-solid');
    } else {
      this._container.classList.add('style-text'); // 默认为text样式
    }
    
    // 处理尺寸
    this._container.classList.remove('size-sm', 'size-md', 'size-lg');
    if (this.hasAttribute('size')) {
      const size = this.getAttribute('size');
      this._container.classList.add(`size-${size}`);
    } else {
      this._container.classList.add('size-md'); // 默认为md尺寸
    }
    
    // 处理禁用状态
    if (this.hasAttribute('disabled')) {
      this._container.classList.add('disabled');
      this._input.disabled = true;
    } else {
      this._container.classList.remove('disabled');
      this._input.disabled = false;
    }
    
    // 处理选中状态
    if (this.hasAttribute('checked')) {
      this._input.checked = true;
    } else {
      this._input.checked = false;
    }
    
    // 处理半选状态
    if (this.hasAttribute('indeterminate')) {
      this._input.indeterminate = true;
    } else {
      this._input.indeterminate = false;
    }
    
    // 处理name和value
    if (this.hasAttribute('name')) {
      this._input.name = this.getAttribute('name');
    }
    
    if (this.hasAttribute('value')) {
      this._input.value = this.getAttribute('value');
    }
    
    // 更新描述
    this._updateDescription();
  }
  
  
  _updateDescription() {
    const descriptionElement = this.shadowRoot.querySelector('.description');
    if (descriptionElement) {
      if (this.hasAttribute('description')) {
        const description = this.getAttribute('description') || '';
        descriptionElement.textContent = description;
        descriptionElement.style.display = 'block';
      } else {
        descriptionElement.style.display = 'none';
      }
    }
  }

  _onClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    
    // 更新选中状态
    if (this.checked) {
      this.removeAttribute('checked');
    } else {
      this.setAttribute('checked', '');
    }
    
    // 触发change事件
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        checked: this.checked,
        value: this.value
      }
    });
    this.dispatchEvent(changeEvent);
  }

  // Getters and Setters
  get type() {
    return this.getAttribute('type') || 'primary';
  }
  
  set type(value) {
    this.setAttribute('type', value);
  }
  
  get size() {
    return this.getAttribute('size') || 'md';
  }
  
  set size(value) {
    this.setAttribute('size', value);
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
  }
  
  get checked() {
    return this.hasAttribute('checked');
  }
  
  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }
  
  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }
  
  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
  }
  
  get name() {
    return this.getAttribute('name') || '';
  }
  
  set name(value) {
    this.setAttribute('name', value);
  }
  
  get value() {
    return this.getAttribute('value') || '';
  }
  
  set value(value) {
    this.setAttribute('value', value);
  }
  
  get solid() {
    return this.hasAttribute('solid');
  }
  
  set solid(value) {
    if (value) {
      this.setAttribute('solid', '');
    } else {
      this.removeAttribute('solid');
    }
  }
  
  // 自动检测是否有 counter 内容
  get hasCounter() {
    const slot = this.shadowRoot.querySelector('slot[name="counter"]');
    return slot && slot.assignedNodes().length > 0;
  }
  
  // 自动检测是否有描述内容
  get hasDescription() {
    return this.getAttribute('description') && this.getAttribute('description').trim() !== '';
  }
}

// 注册自定义元素
customElements.define('uds-checkbox', UdsCheckbox);

export { UdsCheckbox };