import { displayTabs } from "./display-tabs";

function displayAddProjectPopup(){
    document.getElementById("trigger-add-project-popup").addEventListener("click", (event)=>{
        displayTabs(event.target.id);
    })
};
export {displayAddProjectPopup};