// @ts-nocheck

// UDS Input Component
class UdsInput extends HTMLElement {
  // 定义私有属性
  _input = null;
  _clearButton = null;
  _prefixSlot = null;
  _suffixSlot = null;
  
  static get observedAttributes() {
    return [
      'type', 'placeholder', 'value', 'disabled', 'readonly', 
      'size', 'maxlength', 'minlength', 'required', 'error', 'clear',
      'multiline', 'resizer'
    ];
  }

  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClear = this._onClear.bind(this);
    this._onPrefixSlotChange = this._onPrefixSlotChange.bind(this);
    this._onSuffixSlotChange = this._onSuffixSlotChange.bind(this);
    this.attachShadow({ mode: 'open' });
    this._initialized = false;
    this._init();
  }
  
  async _init() {
    await this._render();
    this._input = this.shadowRoot.querySelector('.input-field');
    this._textarea = this.shadowRoot.querySelector('.textarea');
    this._clearButton = this.shadowRoot.querySelector('.clear-button');
    this._numberControls = this.shadowRoot.querySelector('.number-controls');
    this._prefixSlot = this.shadowRoot.querySelector('slot[name="prefix"]');
    this._suffixSlot = this.shadowRoot.querySelector('slot[name="suffix"]');
    this._errorMessage = this.shadowRoot.querySelector('.error-message');
    this._resizer = this.shadowRoot.querySelector('.resizer');
    
    // 默认隐藏数字控制按钮
    if (this._numberControls) {
      this._numberControls.style.display = 'none';
    }
    
    // 绑定resizer事件处理函数
    this._boundResizerHandler = this._onResizerMouseDown.bind(this);
    
    this._updateType();
    this._updatePlaceholder();
    this._updateValue();
    this._updateState();
    this._updateSize();
    this._updateError();
    this._updateClearButton();
    this._updateMultiline();
    this._updateResizer();
    
    // 初始化时检查并隐藏空的input-prefix元素
    this._checkPrefixContent();
    
    // 初始化时计算并设置输入框padding
    this._updateInputPadding();
    
    this._initialized = true;
    
    // 如果在初始化完成前已经连接到DOM，手动调用connectedCallback
    if (this.isConnected) {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    // 如果尚未初始化完成，则等待初始化
    if (!this._initialized) {
      return;
    }
    
    // 升级属性
    this._upgradeProperty('type');
    this._upgradeProperty('placeholder');
    this._upgradeProperty('value');
    this._upgradeProperty('disabled');
    this._upgradeProperty('readonly');
    this._upgradeProperty('size');
    this._upgradeProperty('maxlength');
    this._upgradeProperty('minlength');
    this._upgradeProperty('required');
    this._upgradeProperty('error');
    this._upgradeProperty('clear');

    // 添加事件监听器
    this._input.addEventListener('input', this._onInput);
    this._input.addEventListener('focus', this._onFocus);
    this._input.addEventListener('blur', this._onBlur);
    
    if (this._clearButton) {
      this._clearButton.addEventListener('click', this._onClear);
    }
    
    if (this._prefixSlot) {
      this._prefixSlot.addEventListener('slotchange', this._onPrefixSlotChange);
      // 立即检查前缀内容
      this._onPrefixSlotChange();
    }
    
    if (this._suffixSlot) {
      this._suffixSlot.addEventListener('slotchange', this._onSuffixSlotChange);
    }
  }

  disconnectedCallback() {
    // 移除事件监听器
    this._input.removeEventListener('input', this._onInput);
    this._input.removeEventListener('focus', this._onFocus);
    this._input.removeEventListener('blur', this._onBlur);
    
    if (this._clearButton) {
      this._clearButton.removeEventListener('click', this._onClear);
    }
    
    if (this._prefixSlot) {
      this._prefixSlot.removeEventListener('slotchange', this._onPrefixSlotChange);
    }
    
    if (this._suffixSlot) {
      this._suffixSlot.removeEventListener('slotchange', this._onSuffixSlotChange);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._initialized) return;
    
    switch (name) {
      case 'type':
        this._updateType();
        break;
      case 'placeholder':
        this._updatePlaceholder();
        break;
      case 'value':
        this._updateValue();
        break;
      case 'disabled':
      case 'readonly':
        this._updateState();
        break;
      case 'size':
        this._updateSize();
        break;
      case 'error':
        this._updateError();
        break;
      case 'clear':
        this._updateClearButton();
        break;
      case 'multiline':
        this._updateMultiline();
        break;
      case 'resizer':
        this._updateResizer();
        break;
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
    linkElem.setAttribute('href', new URL('./uds-input.css', import.meta.url).href);
    this.shadowRoot.appendChild(linkElem);
    
    // 加载HTML模板
    try {
      const response = await fetch(new URL('./uds-input.html', import.meta.url).href);
      const templateText = await response.text();
      const template = document.createElement('template');
      template.innerHTML = templateText;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    } catch (error) {
      console.error('Failed to load input template:', error);
    }
  }

  _updateType() {
    if (!this._input) return;
    
    const type = this.getAttribute('type') || 'text';
    this._input.type = type;
    
    // 获取数字控制按钮容器
    const numberControls = this.shadowRoot.querySelector('.number-controls');
    console.log('type', type, numberControls);
    // 如果是数字类型，显示加减按钮
    if (type === 'number') {
      if (numberControls) {
        numberControls.style.display = 'flex';
        
        // 绑定加减按钮事件
        const upButton = numberControls.querySelector('.number-up-button');
        const downButton = numberControls.querySelector('.number-down-button');
        
        if (upButton) {
          upButton.onclick = () => this._incrementValue();
        }
        
        if (downButton) {
          downButton.onclick = () => this._decrementValue();
        }
      }
    } else {
      // 非数字类型，隐藏加减按钮
      if (numberControls) {
        numberControls.style.display = 'none';
      }
    }
    
    // 如果是密码类型，添加显示密码按钮
    if (type === 'password') {
      // 密码显示逻辑可以在这里实现
    }
  }

  _updatePlaceholder() {
    if (this._input) {
      this._input.placeholder = this.placeholder || '';
    }
  }

  _updateValue() {
    if (this._input) {
      this._input.value = this.value || '';
      this._updateClearButtonVisibility();
    }
  }

  _updateState() {
    if (this._input) {
      this._input.disabled = this.disabled;
      this._input.readOnly = this.readonly;
    }
  }

  _updateSize() {
    // 尺寸更新通过 CSS 处理
  }

  _updateError() {
    if (this._errorMessage) {
      if (this.error) {
        this._errorMessage.textContent = this.error;
        this._errorMessage.hidden = false;
      } else {
        this._errorMessage.hidden = true;
      }
    }
  }
  
  _updateClearButton() {
    if (!this._clearButton) return;
    
    const showClearButton = this.hasAttribute('clear');
    if (showClearButton) {
      this._clearButton.style.display = '';
      // 确保clear属性存在时，不会被hidden属性覆盖
      this._clearButton.hidden = false;
    } else {
      this._clearButton.style.display = 'none';
    }
  }

  _updateClearButtonVisibility() {
    if (this._clearButton && !this.hasAttribute('clear')) {
      // 只有在没有clear属性时才根据值来控制可见性
      const hasValue = this._input && this._input.value && this._input.value.length > 0;
      this._clearButton.hidden = !hasValue || this.disabled || this.readonly;
    }
  }

  _onInput(event) {
    this.value = event.target.value;
    this._updateClearButtonVisibility();
    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }

  _onFocus(event) {
    this.dispatchEvent(new CustomEvent('focus', {
      bubbles: true,
      composed: true
    }));
  }

  _onBlur(event) {
    this.dispatchEvent(new CustomEvent('blur', {
      bubbles: true,
      composed: true
    }));
  }

  _onClear(event) {
    this.value = '';
    this._input.value = '';
    this._updateClearButtonVisibility();
    if (this.hasAttribute('multiline')) {
      this._textarea.value = '';
      this._textarea.focus();
    } else {
      this._input.focus();
    }
    this.dispatchEvent(new CustomEvent('clear', {
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }
  
  _onResizerMouseDown(event) {
    event.preventDefault();
    
    const startY = event.clientY;
    const startHeight = this._textarea.offsetHeight;
    
    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      this._textarea.style.height = `${startHeight + deltaY}px`;
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  _updateMultiline() {
    if (!this._input || !this._textarea) return;
    
    if (this.hasAttribute('multiline')) {
      this._input.style.display = 'none';
      this._textarea.style.display = 'block';
      this._textarea.value = this.value;
    } else {
      this._input.style.display = 'block';
      this._textarea.style.display = 'none';
    }
  }
  
  _updateResizer() {
    // 使用浏览器原生resize功能，不需要显示自定义resizer元素
    if (!this._resizer) return;
    this._resizer.style.display = 'none';
  }

  _checkPrefixContent() {
    // 检查前缀插槽是否有内容
    if (!this._prefixSlot) return;
    
    const prefixContainer = this.shadowRoot.querySelector('.input-prefix');
    if (!prefixContainer) return;
    
    const assignedNodes = this._prefixSlot.assignedNodes({flatten: true});
    
    // 如果没有分配节点或者只有空白节点，则隐藏前缀容器
    const hasContent = assignedNodes.some(node => 
      node.nodeType === Node.ELEMENT_NODE || 
      (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    );
    
    prefixContainer.style.display = hasContent ? 'flex' : 'none';
  }

  _onPrefixSlotChange() {
    // 处理前缀插槽变化
    const prefixContainer = this.shadowRoot.querySelector('.input-prefix');
    if (!prefixContainer) return;
    
    // 检查是否有任何元素被分配到前缀插槽
    const hasAssignedElements = this._prefixSlot.assignedNodes().some(node => {
      return node.nodeType === Node.ELEMENT_NODE || 
             (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
    });
    
    // 根据是否有内容设置显示状态
    prefixContainer.style.display = hasAssignedElements ? 'flex' : 'none';
  }

  _onSuffixSlotChange() {
    // 处理后缀插槽变化
    this._updateInputPadding();
  }
  
  _updateInputPadding() {
    // 获取suffix元素
    const suffix = this.shadowRoot.querySelector('.input-suffix');
    if (!suffix) return;
    
    // 计算suffix的实际宽度
    const suffixWidth = suffix.getBoundingClientRect().width;
    
    // 设置输入框和文本区域的padding-right
    const paddingValue = suffixWidth > 0 ? `${suffixWidth}px` : '0';
    
    if (this._input) {
      this._input.style.paddingRight = paddingValue;
    }
    
    if (this._textarea) {
      this._textarea.style.paddingRight = paddingValue;
    }
  }

  // 属性 getter 和 setter
  get type() {
    return this.getAttribute('type') || 'text';
  }
  
  set type(value) {
    this.setAttribute('type', value);
  }
  
  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }
  
  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }
  
  get value() {
    return this.getAttribute('value') || '';
  }
  
  set value(value) {
    if (value) {
      this.setAttribute('value', value);
    } else {
      this.removeAttribute('value');
    }
  }
  
  // 增加数值
  _incrementValue() {
    if (!this._input) return;
    
    let currentValue = parseFloat(this._input.value) || 0;
    const step = parseFloat(this._input.step) || 1;
    const max = this._input.hasAttribute('max') ? parseFloat(this._input.max) : Infinity;
    
    // 确保不超过最大值
    currentValue = Math.min(currentValue + step, max);
    
    // 更新输入框值
    this._input.value = currentValue;
    this.value = currentValue;
    
    // 触发input和change事件
    this._input.dispatchEvent(new Event('input', { bubbles: true }));
    this._input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  // 减少数值
  _decrementValue() {
    if (!this._input) return;
    
    let currentValue = parseFloat(this._input.value) || 0;
    const step = parseFloat(this._input.step) || 1;
    const min = this._input.hasAttribute('min') ? parseFloat(this._input.min) : -Infinity;
    
    // 确保不低于最小值
    currentValue = Math.max(currentValue - step, min);
    
    // 更新输入框值
    this._input.value = currentValue;
    this.value = currentValue;
    
    // 触发input和change事件
    this._input.dispatchEvent(new Event('input', { bubbles: true }));
    this._input.dispatchEvent(new Event('change', { bubbles: true }));
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
  
  get readonly() {
    return this.hasAttribute('readonly');
  }
  
  set readonly(value) {
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }
  
  get size() {
    return this.getAttribute('size') || 'md';
  }
  
  set size(value) {
    this.setAttribute('size', value);
  }
  
  get maxlength() {
    return this.getAttribute('maxlength');
  }
  
  set maxlength(value) {
    if (value) {
      this.setAttribute('maxlength', value);
    } else {
      this.removeAttribute('maxlength');
    }
  }
  
  get minlength() {
    return this.getAttribute('minlength');
  }
  
  set minlength(value) {
    if (value) {
      this.setAttribute('minlength', value);
    } else {
      this.removeAttribute('minlength');
    }
  }
  
  get required() {
    return this.hasAttribute('required');
  }
  
  set required(value) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }
  
  get error() {
    return this.getAttribute('error');
  }
  
  set error(value) {
    if (value) {
      this.setAttribute('error', value);
    } else {
      this.removeAttribute('error');
    }
  }
}

// 注册自定义元素
customElements.define('uds-input', UdsInput);

export default UdsInput;