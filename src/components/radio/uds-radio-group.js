// @ts-nocheck

// UDS RadioGroup Component
class UdsRadioGroup extends HTMLElement {
  // Define private properties
  _container = null;
  
  static get observedAttributes() {
    return ['type', 'size', 'disabled', 'value', 'name', 'horizontal'];
  }

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  connectedCallback() {
    this._upgradeProperty('type');
    this._upgradeProperty('size');
    this._upgradeProperty('disabled');
    this._upgradeProperty('value');
    this._upgradeProperty('name');
    this._upgradeProperty('horizontal');

    this.addEventListener('change', this._onChange);
    this._updateRadioButtons();
  }

  disconnectedCallback() {
    this.removeEventListener('change', this._onChange);
  }

  attributeChangedCallback() {
    this._updateState();
    this._updateRadioButtons();
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
    linkElem.setAttribute('href', new URL('./uds-radio-group.css', import.meta.url).href);
    this.shadowRoot.appendChild(linkElem);
    
    // 加载HTML模板
    try {
      const response = await fetch(new URL('./uds-radio-group.html', import.meta.url).href);
      const templateText = await response.text();
      const template = document.createElement('template');
      template.innerHTML = templateText;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      // 获取元素引用
      this._container = this.shadowRoot.querySelector('.radio-group');
      this._updateState();
    } catch (error) {
      console.error('Failed to load radio-group template:', error);
    }
  }

  _updateState() {
    if (!this._container) return;
    
    // 处理水平布局
    if (this.hasAttribute('horizontal')) {
      this._container.classList.add('horizontal');
    } else {
      this._container.classList.remove('horizontal');
    }
  }

  _updateRadioButtons() {
    // 获取所有子Radio组件
    const radioButtons = this.querySelectorAll('uds-radio');
    
    // 设置共享属性
    radioButtons.forEach(radio => {
      // 如果RadioGroup有type属性，则应用到所有Radio
      if (this.hasAttribute('type')) {
        radio.setAttribute('type', this.getAttribute('type'));
      }
      
      // 如果RadioGroup有size属性，则应用到所有Radio
      if (this.hasAttribute('size')) {
        radio.setAttribute('size', this.getAttribute('size'));
      }
      
      // 如果RadioGroup有disabled属性，则应用到所有Radio
      if (this.hasAttribute('disabled')) {
        radio.setAttribute('disabled', '');
      }
      
      // 设置name属性，确保所有Radio属于同一组
      if (this.hasAttribute('name')) {
        radio.setAttribute('name', this.getAttribute('name'));
      }
      
      // 设置选中状态
      if (this.hasAttribute('value') && radio.getAttribute('value') === this.getAttribute('value')) {
        radio.setAttribute('checked', '');
      } else {
        radio.removeAttribute('checked');
      }
    });
  }

  _onChange(event) {
    // 确保事件来自子Radio组件
    if (event.target.tagName.toLowerCase() === 'uds-radio') {
      const selectedRadio = event.target;
      
      // 更新value属性
      this.value = selectedRadio.value;
      
      // 更新其他Radio的选中状态
      const radioButtons = this.querySelectorAll('uds-radio');
      radioButtons.forEach(radio => {
        if (radio !== selectedRadio) {
          radio.removeAttribute('checked');
        }
      });
      
      // 触发change事件
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value
        }
      }));
    }
  }

  // Getters/Setters
  get type() {
    return this.getAttribute('type');
  }
  
  set type(value) {
    if (value) {
      this.setAttribute('type', value);
    } else {
      this.removeAttribute('type');
    }
  }
  
  get size() {
    return this.getAttribute('size');
  }
  
  set size(value) {
    if (value) {
      this.setAttribute('size', value);
    } else {
      this.removeAttribute('size');
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
  }
  
  get value() {
    return this.getAttribute('value');
  }
  
  set value(value) {
    if (value) {
      this.setAttribute('value', value);
    } else {
      this.removeAttribute('value');
    }
  }
  
  get name() {
    return this.getAttribute('name');
  }
  
  set name(value) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }
  
  get horizontal() {
    return this.hasAttribute('horizontal');
  }
  
  set horizontal(value) {
    if (value) {
      this.setAttribute('horizontal', '');
    } else {
      this.removeAttribute('horizontal');
    }
  }
}

// 注册组件
customElements.define('uds-radio-group', UdsRadioGroup);

export default UdsRadioGroup;