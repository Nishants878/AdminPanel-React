
let initialState = {
    accountData : {}
}

export const accountReducer = (state = initialState, action)=>{

    switch(action.type){
        case "ACCOUNT-DATA-UPDATE" :
            return {...state, accountData: action.accountData}
        case "CHANGE-DATA": 
            return {...state }
        case "DELETE-ACCOUNT":
            return {...state, accountData: action.acc}
        default:
            return {...state}
    }
}