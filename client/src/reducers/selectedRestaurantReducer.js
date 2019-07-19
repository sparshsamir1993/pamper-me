

export default function(state ={} , action){
    switch(action.type){
        case "SELECTED_RESTAURANT":
            return action.payload || false;
        default:
            return state;
    }
}