import {displayTabs} from "./display-tabs";

function displaySideBarTabs(){
    let sideBarTabs = Array.from(document.getElementsByClassName("side-bar-tabs"));
    sideBarTabs.forEach(tab => tab.addEventListener("click", (event)=>{
        displayTabs(event.target.id);

    }));
}

export {displaySideBarTabs};