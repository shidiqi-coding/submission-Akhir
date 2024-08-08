const baseUrl = "https://notes-api.dicoding.dev/v2";

class notesAPI {

  static CreateNote(note){
    return fetch(`${baseUrl}/notes`,{
      method:"POST",
      header :{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(note),
    })

    .then((response) =>{
      if(response.status >= 200 && response.status <= 300){
        return response.json();
      } else{
        return Promise.reject(new Error(`Something went wrong`));
      }
    })

    .then((responseJSON) => {
       if(responseJSON.length > 0){
        return Promise.resolve(responseJSON);
       } else{
        return Promise.reject(new Error(`Note is not found`));
       }
    });
  }


  // Gunakan Fungsi ini untuk mengambil data dari API

  static getNotes(){

    return fetch(`${baseUrl}/notes`)
      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
  
      .then((responseJSON) => {
        const {data :notes } = responseJSON;
        return Promise.resolve(notes);
      });
    
    }
    //Panggil fungsi ini untuk menghapus data dari API
    static deleteNote(id){
      return fetch(`${this.baseUrl}/notes/${id}`,{
        method: "DELETE",

      })

      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
  
      .then((responseJSON) => {
         if(responseJSON.length > 0){
          return Promise.resolve(responseJSON);
         } else{
          return Promise.reject(new Error(`Note is not found`));
         }
      });

      
    }

    //request untuk ambil data note yg diarsipkan
    static getArchived(){
      return fetch(`${baseUrl}/notes/archived`,)
      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Gagal untuk mengArsipkan Catatan ini`));
        }
      })
      .then((responseJSON) => {
        if(responseJSON.length > 0){
           return Promise.resolve(responseJSON);

        } else{
          return Promise.reject(new Error("Catatan yang terArsipkan tidak tersedia"))
        }
      });
    }

    //Request melakukan membatalkan Arsip
    static unArchiveNotes(noteID){
      return fetch(`${baseUrl}/notes/${noteID}/unarchive`, {
        method:"POST",
      })

      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Gagal untuk membatalkan arsip Catatan ini`));
        }
      })
    }
    

  }

  export default notesAPI;
   
