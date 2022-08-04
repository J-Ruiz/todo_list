import { pullTaskUserInput } from "./pull-user-task-input";

function newTaskObject(){
    const taskFactory = (title, date, status, project) => {
        return {title, date, status, project}
    }

    let userInput = pullTaskUserInput();
    let newTask = taskFactory(userInput.title,userInput.date,userInput.status, userInput.project);
    
    return newTask

};

export {newTaskObject};