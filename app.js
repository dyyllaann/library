let defaultLibrary = [
  {
    "title": "Catcher in the Rye",
    "author": "JD Salinger",
    "status": "Read",
  },
  {
    "title": "Harry Potter",
    "author": "JK Rowling",
    "status": "Read",
  },
  {
    "title": "The Scarlet Letter",
    "author": "Nathaniel Hawthorne",
    "status": "Not read"
  }
];

let library = JSON.parse(localStorage.getItem("library"));
// console.log(library);

function init() {
    if (library === null || library.length < 1) {
        localStorage.setItem('library', JSON.stringify(defaultLibrary));
    };
    populateLibrary();
};

const commit = () => localStorage.setItem("library", JSON.stringify(library));

function Book(title, author, status) {
    this.title = document.getElementById("title").value,
    this.author = document.getElementById("author").value,
    this.status = document.getElementById("status").value
};

function addBookToLibrary() {
    let x = new Book();
    library.push(x);
    commit();
    populateLibrary();
};

function removeFromLibrary(i) {
    library.splice(i, 1);
    commit();
    populateLibrary();
}

// Removes each .bookItem from the DOM
function clearLibrary() {
    document.querySelectorAll(".bookItem").forEach((e) => e.remove());
};

function populateLibrary() {
    // Clear existing
    clearLibrary();

    for (i in library) {
        // Create Table Row
        let tr = document.createElement("tr");
        tr.setAttribute('class', 'bookItem');

        // Create Title
        let title = document.createElement("td");
        title.innerText = library[i].title;
        tr.appendChild(title);

        // Create Author
        let author = document.createElement("td");
        author.innerText = library[i].author;
        tr.appendChild(author);

        // Create Status
        let status = document.createElement("td");
        status.innerText = library[i].status;
        tr.appendChild(status);

        // Create Delete Button
        let deleteBook = document.createElement("button");
        deleteBook.innerText = "Delete";
        deleteBook.setAttribute("class", "btn deleteBtn");
        deleteBook.setAttribute("onclick", `removeFromLibrary(${i})`);
        tr.appendChild(deleteBook);

        document.getElementById("library").appendChild(tr);
    }
}

window.onload = function() {
  if (localStorage.getItem('init') == null) {
    init();
  }
  // console.log(localStorage.getItem('init'))
  localStorage.setItem('init', true);
}