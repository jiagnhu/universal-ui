// @ts-nocheck

// UDS Checkbox Group Component
class UdsCheckboxGroup extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'disabled', 'horizontal', 'all-checked', 'value'];
  }

  constructor() {
    super();
    this._container = null;
    this._allCheckbox = null;
    this._onChange = this._onChange.bind(this);
    this._onAllCheckboxChange = this._onAllCheckboxChange.bind(this);
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  connectedCallback() {
    this._upgradeProperty('type');
    this._upgradeProperty('size');
    this._upgradeProperty('disabled');
    this._upgradeProperty('horizontal');
    this._upgradeProperty('value');

    this.addEventListener('change', this._onChange);
    this._updateCheckboxes();
    this._updateCheckedStateFromValue();
  }

  disconnectedCallback() {
    this.removeEventListener('change', this._onChange);
  }

  attributeChangedCallback(name) {
    this._updateCheckboxes();
    
    if (name === 'value') {
      this._updateCheckedStateFromValue();
    }
  }
  
  // 根据 value 属性更新复选框选中状态
  _updateCheckedStateFromValue() {
    if (!this.hasAttribute('value')) return;
    
    const valueStr = this.getAttribute('value');
    if (!valueStr) return;
    
    const values = valueStr.split(',').map(v => v.trim());
    const checkboxes = this.querySelectorAll('uds-checkbox');
    
    checkboxes.forEach(checkbox => {
      const checkboxValue = checkbox.getAttribute('value');
      if (checkboxValue && values.includes(checkboxValue)) {
        checkbox.checked = true;
      }
    });
    
    // 如果有全选复选框，更新其状态
    if (this._allCheckbox) {
      this._updateAllCheckboxState();
    }
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
    linkElem.setAttribute('href', new URL('./uds-checkbox-group.css', import.meta.url).href);
    this.shadowRoot.appendChild(linkElem);
    
    // 加载HTML模板
    try {
      const response = await fetch(new URL('./uds-checkbox-group.html', import.meta.url).href);
      const templateText = await response.text();
      const template = document.createElement('template');
      template.innerHTML = templateText;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      // 获取元素引用
      this._container = this.shadowRoot.querySelector('.checkbox-group');
      
      // 如果有全选属性，创建全选复选框
      if (this.hasAttribute('all-checked')) {
        this._createAllCheckbox();
      }
      
      this._updateCheckboxes();
    } catch (error) {
      console.error('Failed to load checkbox group template:', error);
    }
  }
  
  // 创建全选复选框
  _createAllCheckbox() {
    if (!this._container) return;
    
    // 如果已经存在全选复选框，则不重复创建
    if (this._allCheckbox) return;
    
    // 创建全选复选框容器
    const allCheckboxContainer = document.createElement('div');
    allCheckboxContainer.classList.add('all-checkbox-container');
    
    // 创建全选复选框
    this._allCheckbox = document.createElement('uds-checkbox');
    this._allCheckbox.setAttribute('value', 'all');
    this._allCheckbox.textContent = this.getAttribute('all-text') || '全选';
    
    // 应用与组相同的类型和尺寸
    if (this.hasAttribute('type')) {
      this._allCheckbox.setAttribute('type', this.getAttribute('type'));
    }
    
    if (this.hasAttribute('size')) {
      this._allCheckbox.setAttribute('size', this.getAttribute('size'));
    }
    
    // 添加事件监听
    this._allCheckbox.addEventListener('change', this._onAllCheckboxChange);
    
    // 添加到容器
    allCheckboxContainer.appendChild(this._allCheckbox);
    this._container.insertBefore(allCheckboxContainer, this._container.firstChild);
    
    // 更新全选复选框状态
    this._updateAllCheckboxState();
  }

  _updateCheckboxes() {
    if (!this._container) return;
    
    // 处理水平排列
    if (this.hasAttribute('horizontal')) {
      this._container.setAttribute('horizontal', '');
    } else {
      this._container.removeAttribute('horizontal');
    }
    
    // 获取所有子复选框
    const checkboxes = this.querySelectorAll('uds-checkbox');
    
    // 将组属性应用到子复选框
    checkboxes.forEach(checkbox => {
      // 应用类型
      if (this.hasAttribute('type')) {
        checkbox.setAttribute('type', this.getAttribute('type'));
      }
      
      // 应用尺寸
      if (this.hasAttribute('size')) {
        checkbox.setAttribute('size', this.getAttribute('size'));
      }
      
      // 应用禁用状态
      if (this.hasAttribute('disabled')) {
        checkbox.setAttribute('disabled', '');
      }
      
      // 应用name
      if (this.hasAttribute('name')) {
        checkbox.setAttribute('name', this.getAttribute('name'));
      }
    });
  }

  _onChange(event) {
    // 当子复选框状态变化时触发事件
    if (event.target.tagName.toLowerCase() === 'uds-checkbox') {
      // 如果有全选复选框，更新其状态
      if (this._allCheckbox && event.target !== this._allCheckbox) {
        this._updateAllCheckboxState();
      }
      
      const changeEvent = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          values: this.values
        }
      });
      this.dispatchEvent(changeEvent);
    }
  }
  
  // 全选复选框状态变化处理
  _onAllCheckboxChange(event) {
    // 阻止事件冒泡，防止重复触发
    event.stopPropagation();
    
    // 获取当前全选复选框的状态
    const isChecked = event.target.checked;
    
    // 获取所有子复选框（排除全选复选框）
    const checkboxes = Array.from(this.querySelectorAll('uds-checkbox')).filter(checkbox => 
      checkbox !== this._allCheckbox
    );
    
    // 设置所有非禁用子复选框的选中状态
    checkboxes.forEach(checkbox => {
      if (!checkbox.disabled) {
        checkbox.checked = isChecked;
      }
    });
    
    // 手动设置全选复选框的状态，避免自动更新导致的问题
    this._allCheckbox.checked = isChecked;
    this._allCheckbox.indeterminate = false;
    
    // 延迟更新全选复选框状态，考虑禁用选项
    setTimeout(() => {
      this._updateAllCheckboxState();
    }, 10);
    
    // 触发变更事件
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        values: this.values,
        allChecked: isChecked
      }
    });
    this.dispatchEvent(changeEvent);
  }
  
  // 更新全选复选框状态
  _updateAllCheckboxState() {
    if (!this._allCheckbox) return;
    
    // 获取所有子复选框（排除全选复选框）
    const checkboxes = Array.from(this.querySelectorAll('uds-checkbox')).filter(checkbox => 
      checkbox !== this._allCheckbox
    );
    
    // 统计禁用和非禁用复选框的数量及选中状态
    let totalEnabled = 0;
    let totalCheckedEnabled = 0;
    let totalDisabled = 0;
    let totalCheckedDisabled = 0;
    
    checkboxes.forEach(checkbox => {
      if (checkbox.disabled) {
        totalDisabled++;
        if (checkbox.checked) {
          totalCheckedDisabled++;
        }
      } else {
        totalEnabled++;
        if (checkbox.checked) {
          totalCheckedEnabled++;
        }
      }
    });
    
    // 根据统计结果设置全选复选框的状态
    if (totalEnabled === 0) {
      // 如果没有非禁用复选框，则全选复选框状态取决于禁用复选框
      this._allCheckbox.checked = totalCheckedDisabled === totalDisabled;
      this._allCheckbox.indeterminate = totalCheckedDisabled > 0 && totalCheckedDisabled < totalDisabled;
    } else {
      // 如果有非禁用复选框，则全选复选框状态取决于非禁用复选框
      this._allCheckbox.checked = totalCheckedEnabled === totalEnabled;
      
      // 如果有禁用且未选中的复选框，则显示为半选状态
      if (totalCheckedEnabled === totalEnabled && totalDisabled > 0 && totalCheckedDisabled < totalDisabled) {
        this._allCheckbox.indeterminate = true;
        this._allCheckbox.checked = false;
      } else {
        this._allCheckbox.indeterminate = totalCheckedEnabled > 0 && totalCheckedEnabled < totalEnabled;
      }
    }
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
  
  get name() {
    return this.getAttribute('name') || '';
  }
  
  set name(value) {
    this.setAttribute('name', value);
  }
  
  get allChecked() {
    return this.hasAttribute('all-checked');
  }
  
  set allChecked(value) {
    if (value) {
      this.setAttribute('all-checked', '');
      if (!this._allCheckbox) {
        this._createAllCheckbox();
      }
    } else {
      this.removeAttribute('all-checked');
      if (this._allCheckbox) {
        this._allCheckbox.parentNode.remove();
        this._allCheckbox = null;
      }
    }
  }
  
  get allText() {
    return this.getAttribute('all-text') || '全选';
  }
  
  set allText(value) {
    this.setAttribute('all-text', value);
    if (this._allCheckbox) {
      this._allCheckbox.textContent = value;
    }
  }
  
  get values() {
    const values = [];
    const checkboxes = this.querySelectorAll('uds-checkbox');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked && checkbox.value !== 'all') {
        values.push(checkbox.value);
      }
    });
    return values;
  }
}

// 注册自定义元素
customElements.define('uds-checkbox-group', UdsCheckboxGroup);

export { UdsCheckboxGroup };