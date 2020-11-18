import React from 'react';
import classes from './category.module.css';
import {connect} from 'react-redux'

const category = (props)=>{
    const handleCategoryDeleteIcon = (title)=>{
        const obj = {...props.productData}
        const category = obj.categories.filter(item=>{
            return item!=title
        })
        obj.categories = category
        props.removeCategory(obj) 
    }

    return(
        <div className={classes.mainDiv}>
            <p className={classes.title}>{props.title}</p>
            <div className={classes.iconWrapper}>
                <i onClick={()=>{handleCategoryDeleteIcon(props.title)}} className={`fas fa-trash-alt ${classes.deleteIcon}`}></i>
            </div>
        </div>
    )
}

const getData = (globalStore)=>{
    return{
        productData: globalStore.productPageData.productPage,
    }
}

const dispatchData = (dispatch)=>{
    return{
        removeCategory: (cat)=>{
            return dispatch({type:"DELETE-CATEGORY", delCateg: cat})
        }
    }
}

export default connect(getData, dispatchData)(category);