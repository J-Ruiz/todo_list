import './style.css';
import { compareAsc } from 'date-fns'


/* 
    1. delete extra content windows 
    2. keep one content window
    3. when you click a new side tab 
        - change the window-title 
        - create dom elements based off of passed side tab
*/

const activeWindowsAndTaskStorage ={
    currentWindow: "all-content-tasks",
    previousWindow: "",
    tasks: [],
    projectTabs: []
};

const controlContentWindows = {
    "add-task-to-dom": "popup-add-task",
    "cancel-task":"popup-add-task",
    "add-project-to-dom":"popup-add-project",
    "cancel-project":"popup-add-project",
    "trigger-add-task-popup": "popup-add-task",
    "trigger-add-project-popup": "popup-add-project"
};

const displayTitles = {
    "all" : "All Tasks",
    "past": "Past Tasks",
    "today": "Today's Tasks",
    "upcoming": "Upcoming Tasks",
    "trigger-add-task-popup": "Create A New Task",
    "trigger-add-project-popup": "Create a New Project",
};


function displaySideBarTabs(){
    let sideBarTabs = Array.from(document.getElementsByClassName("side-bar-tabs"));
    sideBarTabs.forEach(tab => tab.addEventListener("click", (event)=>{
        displayTabs(event.target.id);

    }));
}

function clearTasks(){
    document.getElementById("content-tasks").innerHTML = "";
    return;
}

function hideAllWindows(){
    document.getElementById("content-tasks").style.visibility = "hidden";
    document.getElementById("popup-add-task").style.visibility = "hidden";
    document.getElementById("popup-add-project").style.visibility = "hidden";
    return;
}

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
        



function compareDates(userDate){
        let userYear = userDate.slice(0,4);
        let userMonth = userDate.slice(5,7);
        let userDay = userDate.slice(8);

    let userDateCopy = new Date(userYear, userMonth, userDay);

        let todaysDate = new Date().toISOString().slice(0,10);
        let todaysYear = todaysDate.slice(0,4);
        let todaysMonth = todaysDate.slice(5,7);
        let todaysDay = todaysDate.slice(8);

    let todaysDateCopy = new Date(todaysYear, todaysMonth, todaysDay)

    let designation = compareAsc(userDateCopy, todaysDateCopy);

    return designation;
};


function addSidetabLabelToTask(designation){
    if(designation == -1){
        return "past";
    }
    else if(designation == 0){
        return "today";
    }
    else if(designation == 1){
        return "upcoming";
    }
    else {
        return "all";
    }
};
function deleteCurrentTask(index){
    let beforeTask = activeWindowsAndTaskStorage.tasks.slice(0, index);
    let afterTask = activeWindowsAndTaskStorage.tasks.slice(index+1, activeWindowsAndTaskStorage.tasks.length);
    let newArray = beforeTask.concat(afterTask);
    activeWindowsAndTaskStorage.tasks = newArray;
    return;
};

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
            //if deleteTask is clicked
                //delete this tasks from the tasks in activeWindowsAndStorage
                deleteCurrentTask(i);
                clearTasks();
                displayTasks(currentWindow);
        })
        

    checkboxAndTitle.append(checkbox, title);
    dateAndDelete.append(date, deleteTask);
    newTask.append(checkboxAndTitle, dateAndDelete);

    return newTask;

}


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

function cancelAddTask(){
    document.getElementById("cancel-task").addEventListener("click", () => {
        clearTasks();
        resetUserInput("popup-add-task");
        hideAllWindows();
        displayAllTasks();
    })
}


function submitAddTaskPopup(){
    document.getElementById("add-task-to-dom").addEventListener("click", ()=>{
        let createTaskObject = newTaskObject();
        activeWindowsAndTaskStorage.tasks= activeWindowsAndTaskStorage.tasks.concat(createTaskObject);

        clearTasks()
        resetUserInput("popup-add-task");
        hideAllWindows();
        displayAllTasks();
    })
};

function submitAddProjectPopup(){
    document.getElementById("add-project-to-dom").addEventListener("click", ()=>{
        createNewProjectTab(document.getElementById("project-title").value);
        clearTasks();
        hideAllWindows();
        resetUserInput("popup-add-project")
        displayAllTasks();
    })
};

function cancelProject(){
    document.getElementById("cancel-project").addEventListener("click", ()=>{
        clearTasks();
        hideAllWindows();
        resetUserInput("popup-add-project")
        displayAllTasks();
    })
}

function displayAllTasks(){
    document.getElementById("window-title").innerHTML = displayTitles["all"];
    document.getElementById("content-tasks").style.visibility = "visible";
    displayTasks("all")
    return;
}

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


displaySideBarTabs();
displayAddTaskPopup();
submitAddTaskPopup();
displayAddProjectPopup();
submitAddProjectPopup();
cancelAddTask();
cancelProject();

function newTaskObject(){
    const taskFactory = (title, date, status, project) => {
        return {title, date, status, project}
    }

    let userInput = pullTaskUserInput();
    let newTask = taskFactory(userInput.title,userInput.date,userInput.status, userInput.project);
    
    return newTask

};

function pullTaskUserInput(){
    let title = document.getElementById("task-title").value; 
    let date = document.getElementById("task-date").value;
    let status = "not done";
    let project = document.getElementById("task-project").value;
    return {title, date, status, project};
};

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





