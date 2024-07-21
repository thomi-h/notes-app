class NoteItem extends HTMLElement {
  static observedAttributes = ["title", "body"];
  constructor() {
    super();

    this._note = {
      id: 0,
      title: "NEED_TITLE",
      body: "NEED_TEXT",
    };

    this._note["id"] = this.getAttribute("id") || "0";
    this._note["title"] = this.getAttribute("title") || "NEED_TITLE";
    this._note["body"] = this.getAttribute("body") || "NEED_BODY";

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();

    this.addDeleteListener();
  }

  updateStyle() {
    this._style.textContent = ``;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
    ${this._style.outerHTML}

    <div class="note__content">
    <h3 class="note__title">${this._note.title}</h3>
    <p class="note__body">${this._note.body}</p>
    <button class="delete__button">Delete</button>
    </div>
    `;
  }

  addDeleteListener() {
    const deleteButton = this.querySelector(".delete__button");
    deleteButton.addEventListener("click", function () {
      this.dispatchEvent(
        new CustomEvent("delete-note", {
          bubbles: true,
        })
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._note[name] = newValue;

    this.render();
  }
}

customElements.define("note-item", NoteItem);
