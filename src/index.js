import './style.css';
import { compareAsc } from 'date-fns'


const activeWindowsAndTaskStorage ={
    currentWindow: "all-content-tasks",
    previousWindow: "",
    tasks: []
};

const displayContentWindows = {
    "all" : "all-content-tasks",
    "past": "past-content-tasks",
    "today": "today-content-tasks",
    "upcoming": "upcoming-content-tasks",
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
    "all-content-tasks": "All Tasks",
    "past-content-tasks": "Past Tasks",
    "today-content-tasks": "Today's Tasks",
    "upcoming-content-tasks": "Upcoming Tasks"
};


function displaySideBarTabs(){
    let sideBarTabs = Array.from(document.getElementsByClassName("side-bar-tabs"));
    sideBarTabs.forEach(tab => tab.addEventListener("click", (event)=>{
        displayTabs(event.target.id);

    }));
}


function displayTabs(id){
        document.getElementById("window-title").innerHTML = displayTitles[id]
        document.getElementById(activeWindowsAndTaskStorage.currentWindow).style.visibility = "hidden";
        activeWindowsAndTaskStorage.currentWindow = displayContentWindows[id];
        document.getElementById(activeWindowsAndTaskStorage.currentWindow).style.visibility = "visible";
        
        if(activeWindowsAndTaskStorage.currentWindow == "popup-add-task" || 
           activeWindowsAndTaskStorage.currentWindow == "popup-add-project"){     
            return;
        }

        else{
            clearTasks(activeWindowsAndTaskStorage.currentWindow);
            displayTasks(filterTasks(activeWindowsAndTaskStorage.tasks), id);
            return;
        }
    
};


function displayAddTaskPopup(){
    document.getElementById("trigger-add-task-popup").addEventListener("click", (event)=>{
        displayTabs(event.target.id);
    })
}

function displayAddProjectPopup(){
    document.getElementById("trigger-add-project-popup").addEventListener("click", (event)=>{
        displayTabs(event.target.id);
    })
};

function submitAddTaskPopup(){
    document.getElementById("add-task-to-dom").addEventListener("click", ()=>{
        let storeUserInput = pullTaskUserInput();
        let createTaskObject = newTaskObject(storeUserInput.title, storeUserInput.date, storeUserInput.status);
        let filteredTasks = filterTasks(activeWindowsAndTaskStorage.tasks);
        clearTasks("all-content-tasks")
        displayTasks(filteredTasks, "all")
        hideProjectsAndTasks();
    })
};

function submitAddProjectPopup(){
    document.getElementById("add-project-to-dom").addEventListener("click", ()=>{
        hideProjectsAndTasks();
        //might want to make a separate function HIDE PROJECTS that immediately opens the new project
        //allowing user to add new tasks
    })
};


function hideProjectsAndTasks(){
        document.getElementById(activeWindowsAndTaskStorage.currentWindow).style.visibility = "hidden";
        activeWindowsAndTaskStorage.currentWindow = "all-content-tasks";
        document.getElementById("window-title").innerHTML = displayTitles["all"];
        document.getElementById(activeWindowsAndTaskStorage.currentWindow).style.visibility = "visible";
};





displaySideBarTabs();
displayAddTaskPopup();
submitAddTaskPopup();
displayAddProjectPopup();
submitAddProjectPopup();

function newTaskObject(title,date,status){
    const taskFactory = (title, date, status) => {
        return {title, date, status}
    }
    let newTask= taskFactory(title,date,status);

    activeWindowsAndTaskStorage.tasks= activeWindowsAndTaskStorage.tasks.concat(newTask);
    
    return newTask

};

function pullTaskUserInput(){
    let title = document.getElementById("task-title").value; 
    let date = document.getElementById("task-date").value;
    let status = "not done";

    return {title, date, status};
};

/*
    1. hit add task
    2. take me back to all tasks window
    3. add tasks to all tasks
    4. if all tasks contains tasks, then we will create filter as we go
        recreating the dom objects to ensure they are up to date 

*/

function displayTasks(filteredTasks, id){
    if(id == "all"){

        for(let i = 0; i<filteredTasks.allTasks.length; i++){
            let domTask = makeTaskDomElement(filteredTasks.allTasks[i]);
            document.getElementById("all-content-tasks").append(domTask);
        }
        return;
    }

    else if (id == "past"){
        for(let i = 0; i<filteredTasks.pastTasks.length; i++){
            let domTask = makeTaskDomElement(filteredTasks.pastTasks[i]);
            document.getElementById("past-content-tasks").append(domTask);
        }
        return;
    }

    else if(id == "today"){
        for(let i = 0; i<filteredTasks.todaysTasks.length; i++){
            let domTask = makeTaskDomElement(filteredTasks.todaysTasks[i]);
            document.getElementById("today-content-tasks").append(domTask);
        }
        return;
     }

    else if(id == "upcoming"){
        for(let i = 0; i<filteredTasks.upcomingTasks.length; i++){
            let domTask = makeTaskDomElement(filteredTasks.upcomingTasks[i]);
            document.getElementById("upcoming-content-tasks").append(domTask);
        }
        return;
    }
    else{
        return;
    }
}

function makeTaskDomElement(task){
    

    let newTask = document.createElement("div");
        newTask.setAttribute("class", "created-tasks");

        let checkboxAndTitle = document.createElement("div");
            checkboxAndTitle.setAttribute("class", "checkbox-and-title")
            
        let checkbox = document.createElement("input")
            checkbox.setAttribute("type", "checkbox")
            //checkBox.addEventListener("click", finishTask)

        let title = document.createElement("div");
            title.innerHTML = task.title;

        checkboxAndTitle.append(checkbox, title)

        let date = document.createElement("div");
            date.innerHTML = task.date;

        let status = document.createElement("div");
            status.innerHTML = task.status;

        newTask.append(checkboxAndTitle, date)

    return newTask;

}

function filterTasks(tasks){
    let allTasks = tasks;
    let pastTasks =  tasks.filter(task => compareDates(task.date) == -1); 
    let todaysTasks = tasks.filter(task => compareDates(task.date) == 0); 
    let upcomingTasks = tasks.filter(task => compareDates(task.date) == 1); 

    return {allTasks, pastTasks, todaysTasks, upcomingTasks}
}


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


function clearTasks(id){
    document.getElementById(id).innerHTML = "";
    return;
}





