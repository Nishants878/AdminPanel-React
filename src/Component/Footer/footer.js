import React from 'react';
import classes from './footer.module.css';

function footer(){
    return(
        <div className={classes.footer}>
            <p className={classes.copyright}>Copyright © 2018 All rights reserved. Design: Template Mo</p>
        </div>  
    )
}

export default footer;