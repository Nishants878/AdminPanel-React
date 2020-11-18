
let initialState = {
    projectData : {}
}

export const mainReducer = (state = initialState, action)=>{

    switch(action.type){
        case "new-pro-data" :
            return {...state, projectData: action.newData}
        default:
            return {...state}
    }
}