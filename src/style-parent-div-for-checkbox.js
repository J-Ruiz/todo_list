import { activeWindowsAndTaskStorage } from './index'

function styleParentDivForCheckbox(event, i){
    if(event){
        let task = document.getElementById("new-task-"+i);
        task.classList.remove("created-tasks");
        task.classList.add("completed-tasks");
        activeWindowsAndTaskStorage.tasks[i].status = "done";

    }

    else if (!event){
        let task = document.getElementById("new-task-"+i);
        task.classList.remove("completed-tasks");
        task.classList.add("created-tasks");
        activeWindowsAndTaskStorage.tasks[i].status = "not done"
    }
};

export {styleParentDivForCheckbox};