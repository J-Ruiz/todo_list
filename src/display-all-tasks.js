import { displayTasks } from "./display-tasks";
import { displayTitles } from './index'

function displayAllTasks(){
    document.getElementById("window-title").innerHTML = displayTitles["all"];
    document.getElementById("content-tasks").style.visibility = "visible";
    displayTasks("all")
    return;
}

export {displayAllTasks};