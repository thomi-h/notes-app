import "./note-item.js";

import "./app-bar.js";
import "./footer-bar.js";

import "./input-bar.js";
import { notesData, findNoteIndex } from "./notesData.js";

const RENDER_EVENT = "render-note";
const notesContainer = document.getElementsByClassName("notes__container")[0];

document.addEventListener(RENDER_EVENT, function () {
  notesContainer.innerHTML = ``;

  const noteItem = notesData.map(
    (note) =>
      `<note-item title="${note.title}" body="${note.body}" data-id="${note.id}"></note-item>`
  );

  notesContainer.innerHTML = noteItem.join("");
});

document.dispatchEvent(new Event(RENDER_EVENT));

// listener to delete button
document.addEventListener("delete-note", (event) => {
  const noteElement = event.target.closest("note-item");

  const noteIndex = findNoteIndex(noteElement.getAttribute("data-id"));

  if (noteIndex === -1) return;

  notesData.splice(noteIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// listener to form
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("submit-event", function () {
    addNote();
    // document.body.scrollIntoView({ behavior: "smooth", block: "end" });

    // setTimeout(function () {
    //   document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    // }, 1500);
  });
});

const titleInput = document.getElementById("note-title");

const customValidationTitleHandler = (event) => {
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
    event.target.setCustomValidity("Pastikan hanya berisikan huruf dan angka");
    return;
  }
};

function generateId() {
  const prefix = "notes";
  const suffix = +new Date();
  return prefix + "-" + suffix;
}

function generateNote(id, title, body) {
  return {
    id,
    title,
    body,
  };
}

function addNote() {
  const noteTitle = document.getElementById("note-title").value;
  const noteBody = document.getElementById("note-body").value;
  const noteId = generateId();
  const noteObject = generateNote(noteId, noteTitle, noteBody);

  notesData.push(noteObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}
