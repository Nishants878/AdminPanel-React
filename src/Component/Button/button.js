import React from 'react';
import classes from './button.module.css'

function button(props){
    return(
        <div className={classes.buttonDiv}>
            <button className={classes.button}>{props.text}</button>
        </div>
    )
}

export default button;