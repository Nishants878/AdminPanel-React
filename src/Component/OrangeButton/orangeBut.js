import React from 'react'
import classes from './orangeBut.module.css'

function orangeButton(props){
    return( 
        <div className={classes.buttonDiv}>
            <button className={classes.button}>{props.text}</button>
        </div>  
    )
}

export default orangeButton;