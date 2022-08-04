import './style.css';
import { compareAsc } from 'date-fns'
import { displaySideBarTabs } from "./display-sidebar-tabs";
import { clearTasks } from './clear-tasks';
import { hideAllWindows } from './hide-all-windows';
import { displayTabs } from './display-tabs';
import { displayTasks } from './display-tasks';
import { compareDates } from "./compare-dates";
import { addSidetabLabelToTask } from './add-sidetab-label-to-task';
import { deleteCurrentTask } from './delete-current-task';
import { makeTaskDomElement } from './make-task-dom-element';
import { displayAddTaskPopup } from "./display-add-task-popup";
import { displayAddProjectPopup } from './display-add-project-popup';
import { resetUserInput } from './reset-user-input';
import { cancelAddTask } from './cancel-add-task';
import { submitAddTaskPopup } from "./submit-add-task-popup"
import { submitAddProjectPopup } from './submit-add-project-popup'
import { cancelProject } from './cancel-project';
import { displayAllTasks } from './display-all-tasks';
import { createNewProjectTab } from './create-new-project-tab';
import { newTaskObject } from './new-task-object';
import { pullTaskUserInput } from './pull-user-task-input';
import { styleParentDivForCheckbox } from './style-parent-div-for-checkbox';
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

export { activeWindowsAndTaskStorage };

const controlContentWindows = {
    "add-task-to-dom": "popup-add-task",
    "cancel-task":"popup-add-task",
    "add-project-to-dom":"popup-add-project",
    "cancel-project":"popup-add-project",
    "trigger-add-task-popup": "popup-add-task",
    "trigger-add-project-popup": "popup-add-project"
};

export {controlContentWindows};

const displayTitles = {
    "all" : "All Tasks",
    "past": "Past Tasks",
    "today": "Today's Tasks",
    "upcoming": "Upcoming Tasks",
    "trigger-add-task-popup": "Create A New Task",
    "trigger-add-project-popup": "Create a New Project",
};
export {displayTitles};



displaySideBarTabs();
displayAddTaskPopup();
submitAddTaskPopup();
displayAddProjectPopup();
submitAddProjectPopup();
cancelAddTask();
cancelProject();