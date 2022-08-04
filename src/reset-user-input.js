function resetUserInput(window){
    if(window == "popup-add-task"){
        document.getElementById("task-title").value = "";
        document.getElementById("task-date").value = "";
        return;
    }
    else if(window == "popup-add-project"){
        document.getElementById("project-title").value = "";    
        return;
    }
    else{
        return;
    }
}

export {resetUserInput};