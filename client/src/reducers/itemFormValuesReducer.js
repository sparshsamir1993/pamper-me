export default function(state = {}, action){
    switch(action.type){
        case LOAD:
            return{
                data: ation.data
            }
        default:
            return state
    }
}