class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <nav>Catatan</nav>
        `;
  }
}

customElements.define("app-bar", AppBar);
