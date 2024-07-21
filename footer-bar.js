class FooterBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>Catatan &copy; 2024</footer>
        `;
  }
}

customElements.define("footer-bar", FooterBar);
