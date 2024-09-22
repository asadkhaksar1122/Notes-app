let notesbtn = document.getElementById("btnnotes");
let textarea = document.getElementById("notesarea");
let notesadd = document.getElementsByClassName("notesadd")[0];
let alert = document.getElementsByClassName("alert")[0];
let notes = JSON.parse(localStorage.getItem("notes")) || []; // Load notes from localStorage

show();

function show() {
  notesadd.innerHTML = "";
  notes.forEach(function (element, index) {
    notesadd.innerHTML += `
      <div class="card ${index}" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Notes ${index + 1}</h5>
          <div class="edit"></div>
          <p class="card-text" id="${index}">${element}</p>
          <button type="button" class="btn  btn-secondary"  id="${index}">Edit</button>
          <button type="button" class="btn btn-danger"  class="${index}" onclick="deletenote(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

// Function to save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

notesbtn.addEventListener("click", function () {
  if (textarea.value.length > 3) {
    notes.unshift(textarea.value);
    saveNotes(); // Save notes to localStorage
    show();
    textarea.value = "";
    alert.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Added</strong> The note has been added
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    setTimeout(() => {
      alert.innerHTML = "";
    }, 3000);
  }
});

notesadd.addEventListener("click", function (event) {
  if (event.target.innerHTML == "Edit") {
    let parent = event.target.parentElement;
    let p = parent.querySelector("p");
    p.innerHTML = `<textarea cols="8" class="form-control" rows="7">${p.innerText}</textarea>`;
    let button = parent.querySelectorAll("button");
    let edit = parent.getElementsByClassName("edit")[0];
    edit.innerText = "Click the text to edit";
    let okbtn = document.createElement("button");
    okbtn.innerText = "Ok";
    okbtn.className = "btn btn-outline-success";
    okbtn.id = "okbtn";
    for (let btn of button) {
      btn.replaceWith(okbtn);
    }
  }
  if (event.target.innerText == "Ok") {
    let parent = event.target.parentElement;
    let p = parent.querySelector("p");
    let textarea = parent.querySelector("textarea");
    notes.splice(p.id, 1, textarea.value);
    saveNotes(); // Save notes to localStorage
    show();
  }
});

function deletenote(id) {
  notes.splice(id, 1);
  saveNotes();
  show();
  alert.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Deleted</strong> The note has been deleted
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  setTimeout(() => {
    alert.innerHTML = "";
  }, 3000);
}

let removebtn = document.getElementById("removebtn");
removebtn.addEventListener("click", function () {
  let newtextarea = textarea.value.replace(/\s+/g, " ").trim();
  textarea.value = newtextarea;
});

let capitalbtn = document.getElementById("capitalbtn");
capitalbtn.addEventListener("click", function () {
  let newtextarea = textarea.value.toUpperCase();
  textarea.value = newtextarea;
});

let smallbtn = document.getElementById("smallbtn");
smallbtn.addEventListener("click", function () {
  let newtextarea = textarea.value.toLowerCase();
  textarea.value = newtextarea;
});

let firstletter = document.getElementById("firstletter");

firstletter.addEventListener("click", function () {
  let valuearr = textarea.value.split(" ");
  let updatedarr = valuearr.map((element) => {
    let firstLetter = element.charAt(0).toUpperCase();
    element = firstLetter + element.slice(1).toLowerCase();
    return element;
  });
  textarea.value = updatedarr.join(" ");
});

let mainheading = document.getElementsByClassName("mainheading")[0];
let textareadiv = document.getElementsByClassName("textareadiv")[0];
let search = document.getElementById("search");
search.addEventListener("focus", function () {
  mainheading.style.display = "none";
  textareadiv.style.display = "none";
});
search.addEventListener("blur", function () {
  mainheading.style.display = "block";
  textareadiv.style.display = "block";
});

let cardTexts = document.getElementsByClassName("card-text");
let cardbody = document.getElementsByClassName("card-body");
search.addEventListener("input", () => {
  const searchTerm = search.value.toLowerCase();
  Array.from(cardTexts).forEach((cardText, index) => {
    const cardTextContent = cardText.innerText.toLowerCase();
    if (cardTextContent.includes(searchTerm)) {
      let newText = cardTextContent.replace(
        new RegExp(searchTerm, "g"),
        `<span class="searchchange">${searchTerm}</span>`
      );
      cardText.innerHTML = newText;
      cardText.style.display = "block";
      cardbody[index].style.display = "block";
    } else {
      cardText.style.display = "none";
      cardbody[index].style.display = "none";
    }
  });
});

let clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  textarea.value = "";
});
