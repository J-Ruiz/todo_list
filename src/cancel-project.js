import { clearTasks } from "./clear-tasks"
import { resetUserInput } from "./reset-user-input"
import { hideAllWindows } from "./hide-all-windows"
import { displayAllTasks } from "./display-all-tasks"

function cancelProject(){
    document.getElementById("cancel-project").addEventListener("click", ()=>{
        clearTasks();
        hideAllWindows();
        resetUserInput("popup-add-project")
        displayAllTasks();
    })
}

export {cancelProject};

