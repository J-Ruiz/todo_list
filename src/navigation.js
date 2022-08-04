function displayAddTaskPopup(){
    document.getElementById("trigger-add-task-popup").addEventListener("click", (event)=>{
        displayTabs(event.target.id);
    })
};

function displayAddProjectPopup(){
    document.getElementById("trigger-add-project-popup").addEventListener("click", (event)=>{
        displayTabs(event.target.id);
    })
};

function displayTabs(id){
    if(controlContentWindows[id]){  
        hideAllWindows();
        document.getElementById("window-title").innerHTML = displayTitles[id]
        document.getElementById(controlContentWindows[id]).style.visibility = "visible";  
        return;
    }
    else {
        document.getElementById("window-title").innerHTML = displayTitles[id]
        clearTasks();
        displayTasks(id);
        return;
    }

};

function hideAllWindows(){
    document.getElementById("content-tasks").style.visibility = "hidden";
    document.getElementById("popup-add-task").style.visibility = "hidden";
    document.getElementById("popup-add-project").style.visibility = "hidden";
    return;
}

function clearTasks(){
    document.getElementById("content-tasks").innerHTML = "";
    return;
}