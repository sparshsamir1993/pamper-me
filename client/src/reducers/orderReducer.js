

export default function(state ={} , action){

    switch(action.type){
        case "FETCH_ORDER":
            return action.payload || false;
        default:
            return state;
    }
}