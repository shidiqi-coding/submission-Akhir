 import noteComponent from "../src/component/list-item.js";
import "../src/script/view/my-footer.js";
import "./script/view/input-form.js"
import "./script/form-title.js";
import apps from './styles/apps.js';

document.addEventListener('DOMContentLoaded', () =>{
  customElements.define("note-list",noteComponent);

});

apps();
//document.querySelector('.btn').className = 'fa fa-star';

//document.addEventListener('DOMContentLoaded', () =>{
//  customElements.define("my-footer",myFooter);

//});
