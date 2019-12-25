export default function(state = {}, action){
    console.log(action);
    switch(action.type){
        case LOAD:
            return{
                data: action.data
            }
        default:
            return state
    }
}