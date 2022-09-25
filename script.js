import star from "./images/icon-star.svg";
import thanks from "./images/illustration-thank-you.svg";

const main = document.querySelector(".main");
const tittle = "How did we do?";
const paragraph =
  "Please let us know how we did with your support request. All feedback is apreciated to help us improve our offering!";
const notes = 5;
const subimitedParagraph = 
  "We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!";


class Rating {
  constructor(tittle, star, paragraph, subimitedParagraph, notes, thanks) {
    this.star = star;
    this.thanks = thanks;
    this.tittle = tittle;
    this.paragraph = paragraph;
    this.subimitedParagraph = subimitedParagraph;
    this.noteAmount = notes;
    this.note = 0;
    this.notes = this.__assembleNotes(this.noteAmount);
    this.button = new Button("SUBMIT", this.submitCallback.bind(this));

    this.element = this.assembleRating();
  }

  __assembleNotes(ratingNotes) {
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");
    
    for (let i = 1; i <= ratingNotes; i++) {
      noteContainer.appendChild(new Note(i, this.setNoteCallback.bind(this)).element);
    }
    return noteContainer;
  }

  setNoteCallback(noteCallback) {
    const button = document.querySelector(".submit");
    button.disabled = false;
    this.note = noteCallback;
  }

  submitCallback() {
    const rating = document.querySelector(".rating");
    rating.innerHTML = `
      <img class="thank-you" src="${this.thanks}"/>
      <div class="submited-note">
        <p>You selected ${this.note} out of ${this.noteAmount}</p>
      </div>
      <h1 class="submited-tittle">Thank you!</h1>
      <p class="submited-paragraph">${this.subimitedParagraph}</p>
    `;
  }

  assembleRating() {
    const div = document.createElement("div");

    div.classList.add("rating");

    div.innerHTML = `
        <div class="star-container">
          <img class="star" src="${this.star}" alt="star" />
        </div>
        <h1 class="tittle">${this.tittle}</h1>
        <p class="paragraph">${this.paragraph}</p>
        `;
    
    div.appendChild(this.notes);
    div.appendChild(this.button.element);
    return div;
  }

  render() {
    return this.element;
  }
}

class Button {
  constructor(text, submitCallback) {
    this.text = text;
    this.element = this.render();

    this.setCallback(submitCallback);
  }

  setCallback(callback) {
    this.element.addEventListener("click", () => {
      callback();
    });
  }

  render() {
    const button = document.createElement("button");
    button.classList.add("submit");
    button.disabled = true;
    button.textContent = this.text;
    return button;
  }
}

class Note {
  constructor(value, setNoteCallback) {
    this.value = value;
    this.element = this.render();
    this.__handleClick(setNoteCallback);
  }

  __handleClick(callback) {
    this.element.addEventListener("click", () => {
      const selected = document.querySelector(".note.selected");
      if (selected) selected.classList.remove("selected");
      this.element.classList.add("selected");
      callback(this.value);
    });
  }

  render() {
    const div = document.createElement("div");
    this.element = div;
    div.classList.add("note");
    div.innerHTML = `<p class="note-value">${this.value}</p>`;

    return div;
  }
}

main.append(new Rating(tittle, star, paragraph, subimitedParagraph, notes, thanks).render());

 
