import React from 'react';
import classes from './login.module.css';
import OrangeButton from '../../Component/OrangeButton/orangeBut'

class login extends React.Component{

    state={
    }

    formSubmit(e,history,func){
        e.preventDefault();
        e.target.name.value = "";
        e.target.password.value = "";
        history.push("/");
        func();
    }

    render(){
        return(
            <div className={classes.loginDiv}>
                <form onSubmit={(e)=> this.formSubmit(e,this.props.history, this.props.forLogin)}>
                    <p className={classes.inputText}>UserName</p>
                    <input className={classes.input} type="text" name="name" required/>
                    <p className={classes.inputText}>Password</p>
                    <input className={classes.input} type="password" name="password" required/>
                    <input className={classes.submitButton} type="submit" value="LOGIN"/>
                </form>  
                {<OrangeButton text="forgot your password ?"/>}
            </div>
        )
    }
}

export default login;