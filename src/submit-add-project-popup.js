import { createNewProjectTab } from "./create-new-project-tab"
import { clearTasks } from "./clear-tasks"
import { resetUserInput } from "./reset-user-input"
import { hideAllWindows } from "./hide-all-windows"
import { displayAllTasks } from "./display-all-tasks"

function submitAddProjectPopup(){
    document.getElementById("add-project-to-dom").addEventListener("click", ()=>{
        createNewProjectTab(document.getElementById("project-title").value);
        clearTasks();
        hideAllWindows();
        resetUserInput("popup-add-project");
        displayAllTasks();
    })
};

export {submitAddProjectPopup};