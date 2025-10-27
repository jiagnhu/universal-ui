const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { all: initial; }
    :host, button { font-family: var(--uui-font, ui-sans-serif, system-ui); }
    button {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      padding: 0;
      margin: 0;
      font: inherit;
    }
    .uui-btn { display: contents; }
  </style>
  <button class="uui-btn" part="button"><slot></slot></button>
`;

export class F7Button extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this._btn = shadow.querySelector('button');
  }

  connectedCallback() {
    this._upgradeProperty('variant');
    this._upgradeProperty('size');
    this._upgradeProperty('disabled');
    this._upgradeProperty('loading');

    this.tabIndex = this.disabled ? -1 : 0;
    this.setAttribute('role', 'button');
    this._syncState();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback() {
    this._syncState();
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _syncState() {
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');
    this._btn.disabled = disabled || loading;
    // Reflect aria
    this._btn.setAttribute('aria-disabled', String(disabled));
    if (loading) {
      this._btn.setAttribute('aria-busy', 'true');
    } else {
      this._btn.removeAttribute('aria-busy');
    }
  }

  _onClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    // Re-dispatch a composed event for outer listeners
    this.dispatchEvent(new CustomEvent('f7-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  // Properties
  get variant() { return this.getAttribute('variant'); }
  set variant(v) { v == null ? this.removeAttribute('variant') : this.setAttribute('variant', v); }

  get size() { return this.getAttribute('size'); }
  set size(v) { v == null ? this.removeAttribute('size') : this.setAttribute('size', v); }

  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(v) { v ? this.setAttribute('disabled', '') : this.removeAttribute('disabled'); }

  get loading() { return this.hasAttribute('loading'); }
  set loading(v) { v ? this.setAttribute('loading', '') : this.removeAttribute('loading'); }
}

if (!customElements.get('f7-button')) {
  customElements.define('f7-button', F7Button);
}

