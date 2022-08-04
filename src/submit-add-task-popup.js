import { clearTasks } from "./clear-tasks"
import { resetUserInput } from "./reset-user-input"
import { hideAllWindows } from "./hide-all-windows"
import { displayAllTasks } from "./display-all-tasks"
import { newTaskObject } from "./new-task-object";
import { activeWindowsAndTaskStorage } from './index'

function submitAddTaskPopup(){
    document.getElementById("add-task-to-dom").addEventListener("click", ()=>{
        let createTaskObject = newTaskObject();
        activeWindowsAndTaskStorage.tasks= activeWindowsAndTaskStorage.tasks.concat(createTaskObject);
        clearTasks()
        resetUserInput("popup-add-task");
        hideAllWindows();
        displayAllTasks();
    })
};

export {submitAddTaskPopup};