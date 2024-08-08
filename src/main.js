 import noteComponent from "../src/component/list-item.js";



import "./script/component-web/index.js";

import  './styles/responsive.css';
import  './styles/loader.css';

import "./styles/style.css";
//import 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', () =>{
  customElements.define("note-list",noteComponent);

});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  


  loader.classList.add("loader-hidden");

  loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
  })
})
//document.querySelector('.btn').className = 'fa fa-star';

//document.addEventListener('DOMContentLoaded', () =>{
//  customElements.define("my-footer",myFooter);

//});
