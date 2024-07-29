function apps() {
  const baseUrl = " https://notes-api.dicoding.dev/v2";

  const getNotes = () => {
    //membuat instance dari XMLhttpRequest

    fetch(`${basUrl}/notes`);

    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);

      if (responseJSON.error) {
        showResponseMessanger(responseJSON.message);
      } else {
        renderAllNotes(responseJSON.books);
      }
    };

    //membuat GET request dan menetapkan target URL
    xhr.open("GET", `${baseUrl}/list`);

    // mengirimkan request

    xhr.send();
  };

  const insertNotes = (note) => {
    //membuat instance dari XMLhttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessanger(responseJSON.message);

      getNotes();
    };

    xhr.onerror = function () {
      showResponseMessanger();
    };

    //membuat POST request dan menetapkan target URL
    xhr.open("POST", `${baseUrl}/add`);

    //Mementapkan property Content-Type dan X-Auth-Token pada header Request
    //xhr.setRequestHeader('Content-Type','application/json');
    //xhr.setRequestHeader('X-Auth-Token','12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(books) pada body
    xhr.send(JSON.stringify(note));
  };

  const updateNotes = (note) => {
    //membuat instance dari XMLhttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessanger(responseJSON.message);

      getNotes();
    };

    xhr.onerror = function () {
      showResponseMessanger();
    };

    //membuat PUT request dan menetapkan target URL
    xhr.open("PUT", `${baseUrl}/edit/${note.id}`);

    //Mementapkan property Content-Type dan X-Auth-Token pada header Request
    // xhr.setRequestHeader('Content-Type','application/json');
    //xhr.setRequestHeader('X-Auth-Token','12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(books) pada body
    xhr.send(JSON.stringify(note));
  };

  const removeNotes = (noteID) => {
    //membuat instance dari XMLhttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessanger(responseJSON.message);

      getNotes();
    };

    xhr.onerror = function () {
      showResponseMessanger();
    };

    //membuat DELETE request dan menetapkan target URL
    xhr.open("DELETE", `${baseUrl}/delete/${noteID}`);

    //Mementapkan property Content-Type dan X-Auth-Token pada header Request
    xhr.setRequestHeader("X-Auth-Token", "12345");

    // mengirimkan request

    xhr.send();
  };

  const renderAllNotes = (notes) => {
    const listNoteElement = document.querySelector("#noteList");
    listNoteElement.innerHTML = '';

    notes.forEach((note) => {
      listNoteElement.innerHTML += `

        <article class =note-data>
      <h2 class = title-card>(${note.id}) ${note.title}</h2>
      <p class = body-card>${note.body}</p>
      <p class = body-card>${note.createdAt}</p>
      <button type ="button" class ="btn-del"><i class="fa-solid fa-trash"></i>
    </article>
        `;
    });

    const deleteButtonElements = document.querySelectorAll(".btn-del");
    deleteButtonElements.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteID = event.target.dataset.id;

        removeNotes(noteID);
      });
    });
  };

  const showResponseMessanger = (
    message = "check your internet connection"
  ) => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.querySelector("form");

    const inputNoteTitle = noteForm.elements.inputnoteTitle;
    const inputNoteBody = noteForm.elements.inputNoteBody;

    noteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const note = {
        title: inputNoteTitle.value,
        body: inputNoteBody.value,
      };

      switch (event.submitter.textContent){
        case 'Tambah Catatan':
            insertNotes(note);
            break;
      }
    });
    getNotes();
  });
}

export default apps;
