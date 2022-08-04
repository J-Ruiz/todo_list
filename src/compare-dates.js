import { compareAsc } from 'date-fns';

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

export {compareDates};