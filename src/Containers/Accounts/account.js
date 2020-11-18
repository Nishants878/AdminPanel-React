import React from 'react';
import classes from './accounts.module.css';
import OrangeButton from '../../Component/OrangeButton/orangeBut'
import { Switch } from 'react-router';
import { connect } from 'react-redux'

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Admin: this.props.accountData.Admin,
            Editor: this.props.accountData.Editor,
            Merchant: this.props.accountData.Merchant,
            Customer: this.props.accountData.Customer,
            keys: ["Select Account", ...Object.keys(this.props.accountData)],
            current: "",
            uploadedPhoto: ""
        }
        this.FormRef = React.createRef();
    }


    changeCurrent(value) {
        if (value === "Select Account") this.setState({ current: "" })
        else this.setState({ current: value })
    }

    valueReturn(attr) {
        if (this.state.current === "") return ""
        else if (this.state[this.state.current] === "") {
            return ""
        }
        else if (this.state[this.state.current].attr === "") {
            return ""
        }
        else {
            return this.state[this.state.current][attr]
        }
    }

    deleteAccount(acc) {
        if (acc != "") {
            this.setState({ [acc]: "" })

            let afterDelete = {
                Admin: acc == "Admin" ? "" : this.state.Admin,
                Merchant: acc == "Merchant" ? "" : this.state.Merchant,
                Editor: acc == "Editor" ? "" : this.state.Editor,
                Customer: acc == "Customer" ? "" : this.state.Customer
            }

            this.props.deleteData(afterDelete)
        }
        else alert("Please Select Account")
    }

    formOnSubmit(e, curr) {
        e.preventDefault();
        if (this.state.current === "") { alert("Please Select Account") }
        else {
            let obj = {
                "email": e.target.email.value,
                "name": e.target.name.value,
                "password": e.target.password.value,
                "phone": e.target.phoneNumber.value,
                "profilePic": this.state[curr].profilePic
            }
            this.setState({
                [curr]: obj,
                current: curr
            })
            let newData = {
                Admin: this.state.Admin,
                Editor: this.state.Editor,
                Merchant: this.state.Merchant,
                Customer: this.state.Customer,
            }
            this.props.changeData(newData)
            e.target.reset();
            alert("Account Updated Succesfully")
        }
    }

    fileOnChange = (e, curr) => {
        if (this.state.current === "") {
            alert("please select a account")
        }
        else {
            let file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                let obj = { ...this.state[curr] }
                obj.profilePic = e.target.result;
                this.setState({
                    uploadedPhoto: e.target.result,
                    [curr]: obj
                })
            }
        }
    }

    handleDeleteIconPhoto = (curr) => {
        if (curr === "") alert("Please Select Account First")
        else if (this.state[curr] === "") {
            alert("Nothing to delete")
        }
        else {
            let obj = { ...this.state[curr] }
            obj.profilePic = "";
            this.setState({
                uploadedPhoto: "",
                [curr]: obj
            })
        }
    }

    render() {
        if (this.props.accountData.Admin != undefined && this.state.Admin == undefined) {
            this.setState({
                Admin: this.props.accountData.Admin,
                Editor: this.props.accountData.Editor,
                Merchant: this.props.accountData.Merchant,
                Customer: this.props.accountData.Customer,
                keys: ["Select Account", ...Object.keys(this.props.accountData)],
            })

        }
        return (
            <div className={classes.accountDiv}>
                <div className={classes.listAccountDiv}>
                    <p className={classes.heading}>List Of Accounts</p>
                    <div className={classes.selectAccDiv}>
                        <p className={classes.subHeading}>Accounts</p>
                        <select className={classes.selects} onChange={(e) => { this.changeCurrent(e.target.value) }} defaultValue={this.state.current}>
                            {
                                this.state.keys.map(item => {
                                    return <option onSelect={() => this.changeCurrent(item)} className={classes.options}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className={classes.profileDiv}>
                    <div className={classes.avatarDiv}>
                        <p className={classes.heading}>Change Avatar</p>
                        <div className={classes.imageInputPhoto}>
                            <i onClick={() => this.handleDeleteIconPhoto(this.state.current)} className={`fas fa-trash-alt ${classes.deletePhoto}`}></i>
                            <input onChange={(e) => this.fileOnChange(e, this.state.current)} type="file" accept="image/*" className={classes.inputFile} />
                            <img className={classes.avatarImage} src={this.valueReturn("profilePic")} alt="" />
                        </div>
                        <div className={classes.imageInputButton}>
                            <input onChange={(e) => this.fileOnChange(e, this.state.current)} type="file" accept="image/*" className={classes.inputFile} />
                            {<OrangeButton text="UPLOAD NEW PHOTO" />}
                        </div>
                    </div>
                    <div className={classes.profileFormDiv}>
                        <p className={classes.heading}>Account Settings</p>
                        {/* Form */}
                        <form onSubmit={(e) => this.formOnSubmit(e, this.state.current)}>
                            <div className={classes.formDiv}>
                                <div className={classes.leftForm}>
                                    <p className={classes.inputText}>Account Name</p>
                                    <input className={classes.input} type="text" name="name" required
                                        defaultValue={`${this.valueReturn("name")}`}//Value from current
                                    />
                                    <p className={classes.inputText}>Password</p>
                                    <input className={classes.input} type="password" name="password" required
                                        defaultValue={`${this.valueReturn("password")}`}//Value from current
                                    />
                                    <p className={classes.inputText}>Phone</p>
                                    <input className={classes.input} type="number" name="phoneNumber" min="1111111111" max="9999999999" required
                                        defaultValue={`${this.valueReturn("phone")}`}//Value from current
                                    />
                                </div>
                                <div className={classes.rightForm}>
                                    <p className={classes.inputText}>Account Email</p>
                                    <input className={classes.input} type="email" name="email" required
                                        defaultValue={`${this.valueReturn("email")}`}//Value from current
                                    />
                                    <p className={classes.inputText}>Re-enter Password</p>
                                    <input className={`${classes.input} ${classes.buttonMargin}`} type="password" name="repassword" required
                                        defaultValue={`${this.valueReturn("password")}`}//Value from current
                                    />
                                    <input ref={this.FormRef} type="reset" className={classes.resetButton} />
                                    {<OrangeButton text="UPDATE YOUR PROFILE" />}
                                </div>
                            </div>
                        </form>
                        <div onClick={() => { this.deleteAccount(this.state.current) }}>
                            {<OrangeButton text="DELETE YOUR ACCOUNT" />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const getAccountsData = (globalStore) => {
    return {
        accountData: globalStore.accountPageData.accountData
    }
}

const changeAccountData = (dispatch) => {
    return {
        changeData: (d) => {
            return dispatch({ type: "CHANGE-DATA", data: d })
        },
        deleteData: (account) => {
            return dispatch({ type: "DELETE-ACCOUNT", acc: account })
        }
    }
}

export default connect(getAccountsData, changeAccountData)(Account);