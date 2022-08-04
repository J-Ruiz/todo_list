function hideAllWindows(){
    document.getElementById("content-tasks").style.visibility = "hidden";
    document.getElementById("popup-add-task").style.visibility = "hidden";
    document.getElementById("popup-add-project").style.visibility = "hidden";
    return;
}

export {hideAllWindows};