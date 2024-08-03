let notesData = [];

async function createNoteApi(title, body) {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Note created successfully: ", data);
      return data.data;
    } else {
      console.error("failed to create note:", data);
      return null;
    }
  } catch (error) {
    console.error("Error creating note: ", data);
    return null;
  }
}

//membuat event listener untuk tombol "Create Note"
const createButton = document.getElementById("create-button");
createButton.addEventListener('click', async function () {
  const title = prompt("Enter note title:");
  const body = prompt("Enter note body:");

  if (title !== null && body !== null) {
    const newNote = await createNoteApi(title, body);

    if (newNote) {
      notesData.pus(newNote);
      displayNotes(notesData);
    }
  }
});


/fungsi untuk mendapatkan catatan dari API

async function fetchNotes() {
  try {
    //menampilkan indikator loading sebelum memulai permintaan
    showLoadingIndicator();

    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const data = await response.json();
    notesData = data.data;
    renderNoteList();

    //Menyembunyikan Indikator loading setelah permintaan selesai
    hideLoadingIndicator();
  } catch (error) {
    console.error("Error fetching notes:", error);
    hideLoadingIndicator();
  }
}

async function getNotesAPI() {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes`, {
      method: "GET",
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Notes retrieved successfully:", data);
      return data.data;
    } else {
      console.error("Failed to reterieved notes :", data);
      return [];
    }
  } catch (error) {
    console.error("Error retrieving notes :", error);
    return [];
  }
}

async function archiveNoteAPI(noteID) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteID}/archive`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Notes retrieved successfully:", data);
      return true;
    } else {
      console.error("Failed to reterieved notes :", data);
      return false;
    }
  } catch (error) {
    console.error("Error retrieving notes :", error);
    return false;
  }
}

//Mendapatkan elemen tombol "Archive Note" berdasarkan class atu id
const archiveButton = document.getElementById("archive-button");

//Mendapatkan event listener untuk tombol "Archive note"
archiveButton.addEventListener("click", async function () {
  //Mendapatkan ID catatan yang diarsipkan dari atribut data di elemen catatan
  const noteID = this.closest(".note").dataset.id;

  //meminta konfirmasi dari pengguna sebelum melakukan arsip catatan
  const archiveConfirmed = confirm(
    "Apakah Anda yakin untuk mengarsip catatan ini?"
  );

  //Jika pengguna mengonfirmasi untuk mengarsipkan catatan
  if (archiveConfirmed) {
    //Memanggil fungsi archiveNoteAPI untuk mengarsipkan catatan dengan ID yang sesuai
    const isArchived = await archiveNoteAPI(noteID);

    // jika catatan berhasil diarsipkan, hapus elemen catatan dari tampilan
    if (isArchived) {
      this.closest(".note").remove();
    }
  }
});

async function unArchiveNoteAPI(noteID) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteID}/unarchive`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Notes unarchived successfully:", data);
      return true;
    } else {
      console.error("Failed to unarchived notes :", data);
      return false;
    }
  } catch (error) {
    console.error("Error unarchiving notes :", error);
    return false;
  }
}

// Mendapatkan elemen tombo "Unarchived Note" berdasarkan class atau id
const unarchiveButton = document.getElementById("unarchive-button"); // Gantikan 'unarchive-button' dengan id tombol yang sesuai

// Menambahkan event listener untuk tombol "Unarchve Note"
unarchiveButton.addEventListener("click", async function () {
  // //Mendapatkan ID catatan yang di-unarchive dari atribut data di elemen catatan
  const noteID = this.closest(".note").dataset.id;

  //meminta konfirmasi dari pengguna sebelum melakukan arsip catatan
  const archiveConfirmed = confirm(
    "Apakah Anda yakin untuk membatalkan pengarsipan catatan ini?"
  );

  //Jika pengguna mengonfirmasi untuk mengunarchive-kan catatan
  if (UnarchiveConfirmed) {
    //Memanggil fungsi archiveNoteAPI untuk mengarsipkan catatan dengan ID yang sesuai
    const isUnArchived = await archiveNoteAPI(noteID);

    // jika catatan berhasil diarsipkan, hapus elemen catatan dari tampilan
    if (isUnArchived) {
      this.closest(".note").remove();
    }
  }
});

function renderNotes(notes) {
  const noteList = document.getElementById("note-list");
  noteList.innerHTML = "";

  notes.forEach((note) => {
    const listNoteElement = document.createElement("div");
    listNoteElement.classList.add("note");
    listNoteElement.dataset.id = note.id;

    const titleElement = document.createElement("h2");
    titleElement.textContent = note.title;

    const bodyElement = document.createElement("p");
    bodyElement.textContent = note.body;

    listNoteElement.appendChild(titleElement);
    listNoteElement.appendChild(bodyElement);
    listNoteElement.appendChild(deleteButton.cloneNode(true));

    noteList.appendChild(listNoteElement);
  });
}

// Panggil fungsi renderNotes dengan data catatan yang telah Anda dapatkan
renderNotes(notesData);

async function deleteNoteAPI(noteID) {
  try {
    const response = await fetch(
      "https://notes-api.dicoding.dev/v2/notes/${noteId}",
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Catatan berhasil dihapus:", data);
      return true;
    } else {
      console.error("Catatan gagal dihapus :", data);
      return false;
    }
  } catch (error) {
    console.error("Terjadi Kesalahan saat menghapus catatan :", error);
    return false;
  }
}

// Mengubah event listener untuk tombol hapus
const deleteButton = document.createElement("Button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", async function () {
  const listNoteElement = this.closest(".note");
  if (listNoteElement) {
    const noteID = listNoteElement.dataset.id;
    const deleteNote = confirm(
      "Apakah Anda Yakin ingin menghapus catatan ini?"
    );
    if (deleteNote) {
      const deleteResponse = await deleteNoteAPI(noteID);
      if (deleteResponse) {
        listNoteElement.remove();
      }
    }
  }
});

export default apps;
