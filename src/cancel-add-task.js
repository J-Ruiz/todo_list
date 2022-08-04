import { clearTasks } from "./clear-tasks"
import { resetUserInput } from "./reset-user-input"
import { hideAllWindows } from "./hide-all-windows"
import { displayAllTasks } from "./display-all-tasks"

function cancelAddTask(){
    document.getElementById("cancel-task").addEventListener("click", () => {
        clearTasks();
        resetUserInput("popup-add-task");
        hideAllWindows();
        displayAllTasks();
    })
}

export {cancelAddTask};