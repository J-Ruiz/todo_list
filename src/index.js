import './style.css';
import { compareAsc } from 'date-fns'

let tasks = [];
let currentWindow = document.getElementById("all-content");
let todaysDate = new Date().toISOString().slice(0,10);



/* Clear tasks 
        - Get current window from the currentWindow variable
        - Clear all tasks from popup content window
*/

function clearTasks(currentWindow){
    let window = document.getElementById(`${currentWindow}`)
        window.innerHTML = "";
    return;
}


/* Hide Windows
        -take current window and change the visiblity : "Hidden";
        -take the clicked window and change visibility : "visible"
*/

let sideBarTabs = document.getElementsByClassName(side-bar-tabs);

sideBarTabs.forEach(tab => tab.addEventListener("click", (event)=>{
    windowFocus(event.target.id);
}))
function windowFocus(event){
    clearTasks(currentWindow);
    document.getElementById(currentWindow).style.visibility = "hidden";
    currentWindow = event.target.id + "-content";
    document.getElementById(currentWindow).style.visibility = "visible";
    return;
}


// make pop up window visible
let addTaskPopup = document.getElementById("popup-add-task");
    addTaskPopup.addEventListener("click",()=>{
        currentWindow.style.visibility = "hidden";
        currentWindow = "popup-add-task";
        addTaskPopup.style.visibility = "visible";
        return;
    })

/* New Task Object 
        - Create factory function or class to make a new Task object 
            title: get value from task-title input
            date: get date from task-date input 
            status: "not done"

        - push task into the tasks variable
        
*/

function addTask(){
    let addTaskButton = document.getElementById("add-task");
        addTaskButton.addEventListener("click", ()=>{
            let title = document.getElementById("task-title").value;
            let date = document.getElementById("task-date").value;
            let status = "not done";
            let newTask = newTaskObject(title, date, status);
            tasks.push(newTask);
        })
}  

function newTaskObject(title,date,status){
    const taskFactory = (title, date, status) => {
        return {title, date, status}
    }
    let newTask= taskFactory(title,date,status);

    return newTask
}

function filterTasks(array){
    let filteredTasks = tasks.filter(task=>{
        
    })
}

function makeTaskDomElement(tasks){

    let newTask = document.createElement("div");

        let checkBox = document.createElement("input")
            checkBox.setAttribute("type", "checkbox")
            checkBox.addEventListener("click", finishTask)

        let title = document.createElement("div");
            title.innerHTML = task.title;

        let date = document.createElement("div");
            date.innerHTML = task.date;

        newTask.append(checkBox, title, date)

    return newTask;

}

  


/* 2. New Project Tab (takes one argument, the name of the project)
        - Create dom element project tab 
        - append new project tab to task-side-menu-2
*/

function newProject(projectName){
    let newProjectTab = document.createElement("div")
        newProjectTab.setAttribute("id", `${projectName}`)
    
    let projectMenu = document.getElementById("task-side-menu-2");
        projectMenu.appendChild(newProjectTab)

    return; 
}













/* 5. Finishing a task
            : update status to "done"
            : re-style the task and have a line put through it
            : make the lettering gray 
        
*/

function finishTask(task){
        /*find index of the passed in task in the task global variable 
          target index in array and ...
            : update status to "done"
            : Target dom element and re-style the task and have a line put through it
            : make the lettering gray*/
         
}


/* 6. Tab event listeners 
        - add event listeners on click for every tab 
        - if clicked, **RUN THE CLEAR TASKS FUNCTION** on current content box 
        - **RUN THE APPEND TASKS TO DOM FUNCTION** passing an argument that identifies the tab clicked 

*/

function tabListeners(){
    let tabs = document.getElementsByClassName("side-bar-tabs");

    for(let i = 0; i<tabs.length; i++){
        tabs[i].addEventListener("click", ()=>{
            clearTasks();
            //append tasks for the appropriately clicked window 
        })
    }
}


/* 7. Make Task DOM Element 
        - for loop iterating over current loop 
        - create a new dom element with title and date of task
        - add a completion check box to dom element (**EVENT LISTENER FINISH A TASK FUNC**)
*/ 




/* 8. COMPARE DATES

        - **CREATED GLOBAL VARIABLE CALLED TODAYSDATE
            let today = new Date().toISOString().slice(0, 10) 
            above grabs the date and slices the first 10 characters off which is in the same format
            that the date input will store the "value" of the date 

        - compare dates using date-fns recommended in odin project
            import { compareAsc } from 'date-fns'
            compareAsc(dateLeft, dateRight) returns 1 if first is after, 0 if equal -1 if before 
            dateright should be todays date
            dateleft is whatever is the value inputted by the user 
        

*/

function compareDates(userDate){

    let userYear = userDate.slice(0,4);
    let userMonth = userDate.slice(5,7);
    let userDay = userDate.slice(8);
    let userDateCopy = newDate(userYear, userMonth, userDay);

    let todaysYear = todaysDate.slice(0,4);
    let todaysMonth = todaysDate.slice(5,7);
    let todaysDay = todaysDate.slice(8);
    let todaysDateCopy = newDate(todaysYear, todaysMonth, todaysDay)

    let designation = compareAsc(userDateCopy, todaysDateCopy);

    if(designation == -1){
        return "past"
    }

    else if (designation == 0){
        return "today"
    }

    else {
        return "upcoming"
    }

    return; 
}

