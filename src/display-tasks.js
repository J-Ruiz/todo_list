import { compareDates } from "./compare-dates";
import { addSidetabLabelToTask } from "./add-sidetab-label-to-task";
import { makeTaskDomElement } from "./make-task-dom-element";
import { activeWindowsAndTaskStorage } from './index'

function displayTasks(id){

    for(let i = 0; i<activeWindowsAndTaskStorage.tasks.length; i++){
        let designation = compareDates(activeWindowsAndTaskStorage.tasks[i].date);
        let label = addSidetabLabelToTask(designation);
        activeWindowsAndTaskStorage.tasks[i].label = label;   
    }
        
    let regularTabs = id == "all" || id == "past" || id == "today" || id == "upcoming";

    if(regularTabs){
        for(let i = 0; i<activeWindowsAndTaskStorage.tasks.length; i++){
            if(id == activeWindowsAndTaskStorage.tasks[i].label || id=="all"){ 
                let element = makeTaskDomElement(activeWindowsAndTaskStorage.tasks[i], i, id);
                document.getElementById("content-tasks").append(element);
             }
        }
        return;
     }

    else {
        for(let i = 0; i<activeWindowsAndTaskStorage.tasks.length; i++){
            if(id == activeWindowsAndTaskStorage.tasks[i].project){
                let element = makeTaskDomElement(activeWindowsAndTaskStorage.tasks[i], i, id);
                document.getElementById("content-tasks").append(element);
            }
        }
        return;
        
    }
};

export {displayTasks};