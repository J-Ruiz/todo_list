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

export {addSidetabLabelToTask};