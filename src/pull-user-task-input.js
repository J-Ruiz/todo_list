function pullTaskUserInput(){
    let title = document.getElementById("task-title").value; 
    let date = document.getElementById("task-date").value;
    let status = "not done";
    let project = document.getElementById("task-project").value;
    return {title, date, status, project};
};

export {pullTaskUserInput};