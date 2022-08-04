import { displayTabs } from "./display-tabs";

function displayAddTaskPopup(){
    document.getElementById("trigger-add-task-popup").addEventListener("click", (event)=>{
        displayTabs(event.target.id);
    })
};

export {displayAddTaskPopup};