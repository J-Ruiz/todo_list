import {hideAllWindows} from "./hide-all-windows";
import {clearTasks} from "./clear-tasks";
import {displayTasks} from "./display-tasks";
import { controlContentWindows } from "./index";
import { displayTitles } from "./index"

function displayTabs(id){
    if(controlContentWindows[id]){  
        hideAllWindows();
        document.getElementById("window-title").innerHTML = displayTitles[id]
        document.getElementById(controlContentWindows[id]).style.visibility = "visible";  
        return;
    }
        document.getElementById("window-title").innerHTML = displayTitles[id]
        clearTasks();
        displayTasks(id);
        return;
};

export {displayTabs};