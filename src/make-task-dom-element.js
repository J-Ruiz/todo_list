import { styleParentDivForCheckbox } from "./style-parent-div-for-checkbox";
import { deleteCurrentTask } from "./delete-current-task";
import { clearTasks } from "./clear-tasks";
import { displayTasks } from "./display-tasks";
import { activeWindowsAndTaskStorage } from './index'

function makeTaskDomElement(task, i, currentWindow){

    let newTask = document.createElement("div");
        newTask.setAttribute("class", activeWindowsAndTaskStorage.tasks[i].status=="done"?"completed-tasks":"created-tasks");
        newTask.setAttribute("id", "new-task-" + i)

    let checkStatus = "";
        if(newTask.classList.value == "completed-tasks"){
            checkStatus == "true";
        } else{checkStatus== "false"}

    let checkboxAndTitle = document.createElement("div");
        checkboxAndTitle.setAttribute("class", "checkbox-and-title")
            
    let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")

    if(activeWindowsAndTaskStorage.tasks[i].status == "done"){
        checkbox.setAttribute("checked", true);
    }
        checkbox.addEventListener("click", (event)=>{
            styleParentDivForCheckbox(event.target.checked, i)
        })
            
    let title = document.createElement("div");
        title.innerHTML = task.title;

    let dateAndDelete = document.createElement("div");
        dateAndDelete.setAttribute("class", "date-and-delete");

    let date = document.createElement("div");
        date.innerHTML = task.date;

    let deleteTask = document.createElement("div");
        deleteTask.innerHTML = "Delete";
        deleteTask.setAttribute("class", "delete-task");
        deleteTask.addEventListener("click", ()=>{
                deleteCurrentTask(i);
                clearTasks();
                displayTasks(currentWindow);
                return;
        })
        

    checkboxAndTitle.append(checkbox, title);
    dateAndDelete.append(date, deleteTask);
    newTask.append(checkboxAndTitle, dateAndDelete);

    return newTask;

}

export {makeTaskDomElement};