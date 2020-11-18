let initialState = {
    productPage : {
        
    }
}

export const productReducer = (state = initialState, action)=>{

    switch(action.type){
        case "PRODUCT-PAGE-UPDATE":
            return {...state, productPage: action.productData}
        case "ADD-CATEGORY":
            return {...state, productPage: action.newCateg}
        case "DELETE-PRODUCT":
            return {...state, productPage: action.deletedId}
        case "DELETE-CATEGORY":
            return {...state, productPage: action.delCateg}
        default:
            return {...state}
    }
}