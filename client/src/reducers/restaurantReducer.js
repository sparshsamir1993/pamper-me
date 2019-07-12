const FETCH_RESTAURANTS = "FETCH_RESTAURANTS";

export default function(state ={} , action){
    switch(action.type){
        case FETCH_RESTAURANTS:
            return action.payload || false;
        default:
            return state;
    }
}