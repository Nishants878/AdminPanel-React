import React from 'react'
import Topbar from './Component/Topbar/topbar'
import Footer from './Component/Footer/footer'
import './App.css'
import Account from './Containers/Accounts/account'
import Product from './Containers/Product/product';
import AddProduct from './Containers/AddProduct/addproduct'
import Login from './Containers/Login/login'
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import axios from 'axios';
import DashBoard from './Containers/Dashboard/dashboard';
import {connect} from 'react-redux';
import Hoc from './HOC/hoc';

class App extends React.Component{
  state={
    loginStatus: this.checkLogin(),
    active: 1,
    AllData: {}
  }

  shouldComponentUpdate(){
    return true
  }

  checkLogin(){
    if(window.localStorage.getItem('loginStatusDash') === null){
        window.localStorage.setItem("loginStatusDash", 'false')
        return "false"
    }
    else return window.localStorage.getItem('loginStatusDash')
  }

  loginYes(){
    window.localStorage.setItem('loginStatusDash', 'true')
    this.setState({loginStatus: 'true'})
  }

  onLogoutClick(his){
    window.localStorage.setItem('loginStatusDash', 'false')
    this.setState({loginStatus: 'false'})
    his.push("/")
  }
///////////////////////////////
  componentDidMount(){
    let axiosFunc = async ()=>{
        await axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
        .then(response=>{
                this.setState({AllData: {...response.data}})
                this.props.updatedProData(response.data)
                let uPObj = {
                    categories: [...response.data.productsPage.categories],
                    products: []
                }
                let arr = response.data.productsPage.products.map((item,pos)=>{
                    item.id = pos+1;
                    item.isChecked = false;
                    return item
                })
                uPObj.products = arr
                this.props.onlyProductPageData(uPObj)
                this.props.accountPageData(response.data.accountsPage)

        })
        .catch(err=>{
            console.log(err)
        })
    }
    axiosFunc();
  }


  render(){
        return (
        <Hoc hoc={this.props.projectData}>
            <div className="App">
                <BrowserRouter>
                    <Route path="/" render={(renderProps)=> <Topbar loginStatus={this.state.loginStatus} onlogClick={this.onLogoutClick.bind(this)} active={this.state.active} history={renderProps.history}/> }/>
                    <Switch>
                    <Route exact path="/" render={(renProps)=>{
                        return(
                        this.state.loginStatus=="true"?<DashBoard />:<Login forLogin={this.loginYes.bind(this)} history={renProps.history}/>
                        )
                    }} />
                    <Route exact path="/account" component={this.state.loginStatus=="true"?Account:null}/>
                    <Route exact path="/products" component={this.state.loginStatus=="true"?Product:null}/>
                    <Route exact path="/addProduct/:id" component={AddProduct}/>
                    </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        </Hoc>
        );
  }
}

const makeDispatches = (dispatch)=>{
    return{
        updatedProData : (e)=> {
           return dispatch({type: "new-pro-data", newData: e})
        },
        onlyProductPageData : (e)=>{
            return dispatch({type: "PRODUCT-PAGE-UPDATE", productData: e})
        },
        accountPageData: (e)=>{
            return dispatch({type: "ACCOUNT-DATA-UPDATE", accountData: e})
        }
    }
}

const getProjectData = (globalStore)=>{
    return{
        projectData: globalStore.wholeData.projectData
    }
}



export default connect(getProjectData,makeDispatches)(App);
