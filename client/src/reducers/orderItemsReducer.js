

export default function(state ={} , action){
    switch(action.type){
        case "FETCH_ORDERITEM":
            return action.payload || false;
        default:
            return state;
    }
}