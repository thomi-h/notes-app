class InputBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    const inputNote = this.querySelector("#inputNote");

    inputNote.addEventListener("change", this.customValidationHandler);
    inputNote.addEventListener("invalid", this.customValidationHandler);

    this.querySelector("#note-title").addEventListener("blur", (event) => {
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;

      const validationId = event.target.getAttribute("aria-describedby");
      const validationEl = validationId
        ? this.querySelector("#titleValidation")
        : null;

      console.log(errorMessage ? true : false);

      if (validationEl && errorMessage && !isValid) {
        validationEl.innerHTML = errorMessage;
      } else {
        validationEl.innerHTML = "";
      }
    });

    this.getElementsByTagName("form")[0].addEventListener("submit", (event) => {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent("submit-event", {
          bubbles: true,
        })
      );
      event.target.reset();
    });
  }

  customValidationHandler = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Wajib diisi.");
      return;
    }
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Minimal panjang tiga karakter.");
      return;
    }
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity(
        "Pastikan hanya berisikan huruf dan angka"
      );
      return;
    }
  };

  disconnectedCallback() {
    this.getElementsByTagName("form")[0].removeEventListener("submit");
  }

  render() {
    this.innerHTML = `
    <form id="inputNote">
        <div class="form-group">
          <input
            type="text"
            id="note-title"
            name="title"
            required
            minlength="3"
            autocomplete="off"
            pattern="^[a-zA-Z0-9 ]+$"
            aria-describedby="titleValidation"
          />
          <label for="title">Judul catatan</label>
          <p
            class="title-validation"
            id="titleValidation"
            aria-live="polite"
          ></p>
        </div>
        <div class="form-group">
          <!-- <label for="note"></label> -->
          <textarea
            name="note"
            id="note-body"
            cols="30"
            rows="10"
            placeholder="Tulis catatan mu disini"
          ></textarea>
        </div>
        <button type="submit" id="submit">Buat catatan</button>
      </form>
    `;
  }
}

customElements.define("input-bar", InputBar);
