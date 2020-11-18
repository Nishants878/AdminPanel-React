import React from 'react';
import classes from './topbar.module.css';
import MenuItem from '../MenuItem/menuitem';
import {Link} from 'react-router-dom'

class topbar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            active: "1"
        }
    }
    

    setActiveState(value){
        this.setState({active: value})
    }

    handleHamberger(){

        if(document.getElementById("dropDownRefId").style.display === "none"){
            // document.getElementById("dropDownRefId").style.height = "220px" 
            document.getElementById("dropDownRefId").style.display = "block" 
        }
        else {
            // document.getElementById("dropDownRefId").style.height = "0px"
            document.getElementById("dropDownRefId").style.display = "none" 
        }
        
        // if(document.getElementById("dropDownRefId").style.height === "0px"){
        //     document.getElementById("dropDownRefId").style.height = "fit-content"
        //     document.getElementById("dropDownRefId2").style.display = "block"
        // }
        // else{
        //     document.getElementById("dropDownRefId").style.height = "0px";
        //     document.getElementById("dropDownRefId2").style.display = "none"
        // }
    }

    componentDidMount(){
    }

    render(){
        return(
            <div className={classes.header}>
                <h2 className={classes.title}>product admin</h2>
                <div className={classes.menuItems}>
                    <Link to="/" className={classes.links}><MenuItem key="1" id="1" iClass="fas fa-tachometer-alt" title="Dashboard" active={this.state.active} activeClick={this.setActiveState.bind(this)}/></Link>
                    <MenuItem key="2" id="2" iClass="far fa-file-alt" title="Reports" isDropDown="true"/> 
                    <Link to={this.props.loginStatus=="true"?"/products":"/"} className={classes.links}><MenuItem key="3" id="3" iClass="fas fa-shopping-cart" title="Products" active={this.state.active} activeClick={this.setActiveState.bind(this)}/></Link>      
                    <Link to={this.props.loginStatus=="true"?"/account":"/"} className={classes.links}><MenuItem key="4" id="4" iClass="far fa-user" title="Accounts" active={this.state.active} activeClick={this.setActiveState.bind(this)}/></Link>
                    <MenuItem key="5" id="5" iClass="fas fa-cog" title="Settings" isDropDown="true"/> 
                </div>
                <h4 onClick={()=>{
                    this.setState({active: "1"})
                    return this.props.onlogClick(this.props.history)
                }} className={classes.login}>{this.props.loginStatus=="true"?"Admin, Logout": null}</h4>
                <div className={classes.hambergerDiv}>
                    <i onClick={this.handleHamberger} className={`fas fa-bars tm-nav-icon ${classes.hamIcon}`}></i>
                    <div ref={this.dropDownRef} id="dropDownRefId" className={classes.dropDown}>
                        <div className={classes.dropdownMenu} id="dropDownRefId2">
                            <Link to="/" className={classes.links}><MenuItem key="1" id="1" iClass="fas fa-tachometer-alt" title="Dashboard" active={this.state.active} activeClick={this.setActiveState.bind(this)} isMobo="true"/></Link>
                            <Link to={this.props.loginStatus=="true"?"/products":"/"} className={classes.links}><MenuItem key="3" id="3" iClass="fas fa-shopping-cart" title="Products" active={this.state.active} activeClick={this.setActiveState.bind(this)} isMobo="true"/></Link>      
                            <Link to={this.props.loginStatus=="true"?"/account":"/"} className={classes.links}><MenuItem key="4" id="4" iClass="far fa-user" title="Accounts" active={this.state.active} activeClick={this.setActiveState.bind(this)} isMobo="true"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default topbar;