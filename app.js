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

function init() {
    if (localStorage.getItem("init") == null) {
      if (library === null || library.length < 1) {
        localStorage.setItem("library", JSON.stringify(defaultLibrary));
      }
    }
    localStorage.setItem("init", true);
    populateLibrary();
};

const commit = () => localStorage.setItem("library", JSON.stringify(library));

class Book {
  constructor(title, author, status) {
    this.title = document.getElementById("title").value,
    this.author = document.getElementById("author").value,
    this.status = document.getElementById("status").value
  }
};

function addBookToLibrary() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");

  // Validation
  if (!title.value) {
		return (document.getElementById("title").placeholder =
			"Must enter valid title.");
	} else 
  if (!author.value) {
		return (document.getElementById("author").placeholder =
			"Must enter valid author.");
	}

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

window.onload = init();