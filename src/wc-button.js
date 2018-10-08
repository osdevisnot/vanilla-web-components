class Component extends HTMLElement {
  constructor(name, template) {
    super()
    const _template = document.createElement('template')
    _template.innerHTML = template

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(_template.content.cloneNode(true))
    }

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(_template, name)
      window.ShadyCSS.styleElement(this)
    }
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    this[attr] = newValue
  }
}
class WcButton extends Component {
  constructor() {
    const template = `
      <style>
      :host button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        min-width: 64px;
        border-radius: 2px;
        line-height: 40px;
        padding: 0 16px;
        font-size: 13px;
        font-weight: normal;
        color: #333333;
        box-sizing: border-box;
        cursor: pointer;
        outline: none;
      }
      :host button[kind="primary"] {
        background-color: #464F5C;
      }
      </style>
      <button>Hello Button</button>
    `
    super('wc-button', template)
  }
  get kind() {
    return this.shadowRoot.querySelector('button').getAttribute('kind')
  }
  set kind(value) {
    this.shadowRoot.querySelector('button').setAttribute('kind', value)
  }
  static get observedAttributes() {
    return ['kind']
  }
}

window.customElements.define('wc-button', WcButton)
