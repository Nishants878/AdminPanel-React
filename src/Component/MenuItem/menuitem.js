import React from 'react';
import classes from './menuitem.module.css'

function menuItem(props){
    let isDropDown = props.isDropDown;
    let isMobo = props.isMobo

    return(
        <div onClick={()=>{
            return props.activeClick!=undefined?props.activeClick(props.id):null
        }} className={`${classes.item} ${props.active===props.id?classes.active:null} ${isMobo==="true"?classes.moboItem:null}`} >
            <i className={`${props.iClass} ${classes.menuLogo}`}></i>
            <p className={classes.menuName}>{props.title}
            {
                isDropDown=="true"?<i className={`fas fa-angle-down ${classes.angleDown}`}></i>: null
            }
            </p>
        </div>
    )
}

export default menuItem;