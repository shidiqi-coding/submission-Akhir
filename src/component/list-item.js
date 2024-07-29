import notesData from "../script/data/local/notesData.js";

//import notesData from "../script/data/local/notesData";
class noteComponent extends HTMLElement {
    constructor() {
        super();

        //this._shadowRoot = this.attachShadow({ mode: 'open' });

        this._note = {
            id: "NEED_ID",
            title: "NEED_TITLE",
            body: "NEED_BODY",
            createdAt: "NEED_CREATED_AT"
        };

        this._style = document.createElement("style");
    }


    setnoteData() {

       /*this._note["id"] = value.id;
        this._note["title"] = value.title;
        this._note["body"] = value.body;
        this._note["createdAT"] = value.createdAT;*/
        console.log(notesData.length)
        for(let i = 0; i < notesData.length; i++){
            const element = notesData[i];

            this._note["id"] = element.id;
            this._note["title"] = element.title;
            this._note["body"] = element.body;
            this._note["createdAt"] = element.createdAt;

            
        this.render();

        }



    }

    connectedCallback() {
        this.setnoteData();
    }

    updateStyle() {
        this._style.textContent = `
        note-data {
        border: 1px solid #fff;
    border-radius: 8px;
    padding: 0 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    margin: 10px;   
    display:grid; 

      gap: 50px 100px;
   
 
        }

        .title-card,.body-card,.create-card{
    color: #fff;
  
}


    `;
    }


    render() {
        this.updateStyle();

        this.setAttribute("noteList", this._note.id);

        this.innerHTML += `
        ${this._style.outerHTML}
        
        <article class =note-data id ="${this._note.id}">
      <h2 class = title-card>${this._note.title}</h2>
      <p class = body-card>${this._note.body}</p>
      <p class = create-card >${this._note.createdAt}</p>
    </article>
  `;

    }
    /*set note(note) {
        this._note = note;
        this.render();
    }

    render() {
        this.innerHTML = `
        <article class = note-data id="${this._note.id}">
      <h2 class = title-card>${this._note.title}</h2>
      <p class = body-card>${this._note.body}</p>
      <p class = create-card >${this._note.createdAt}</p>
    </article>
        `;
    }*/

}




customElements.define("note-list", noteComponent);

export default noteComponent;
