import { activeWindowsAndTaskStorage } from './index'

function deleteCurrentTask(index){
    let beforeTask = activeWindowsAndTaskStorage.tasks.slice(0, index);
    let afterTask = activeWindowsAndTaskStorage.tasks.slice(index+1, activeWindowsAndTaskStorage.tasks.length);
    let newArray = beforeTask.concat(afterTask);
    activeWindowsAndTaskStorage.tasks = newArray;
    return;
};

export {deleteCurrentTask};