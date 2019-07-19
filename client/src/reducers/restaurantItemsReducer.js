const FETCH_ITEMS = "FETCH_ITEMS";

export default function(state =[] , action){
    switch(action.type){
        case FETCH_ITEMS:
            return action.payload || false;
        default:
            return state;
    }
}