import { clearTasks } from "./clear-tasks"
import { displayTasks } from "./display-tasks"
import { activeWindowsAndTaskStorage } from './index'

function createNewProjectTab(title){
    activeWindowsAndTaskStorage.projectTabs = activeWindowsAndTaskStorage.projectTabs.concat(title)
    
    let newProject = document.createElement("div");
        newProject.innerHTML = title;
        newProject.setAttribute("class", "project-option");
        newProject.addEventListener("click", ()=>{
            document.getElementById("window-title").innerHTML = title;
            clearTasks();
            displayTasks(title);
        })
        document.getElementById("projects").append(newProject);

    let newOption = document.createElement("option");
        newOption.value = title;
        newOption.innerHTML = title;
    
        document.getElementById("task-project").append(newOption);

    return;
};

export {createNewProjectTab};