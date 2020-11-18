import React from 'react';
import classes from './product.module.css';
import OrangeButton from '../../Component/OrangeButton/orangeBut';
import ProRowCard from '../../Component/productCard/prodetailCard';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Category from '../../Component/Categories/category'

class product extends React.Component{

    handleAddCategory(data){
        let ans = prompt("ADD CATEGORY")
        if(ans !== ""){
            if(data!=undefined){
                let obj ={
                    categories: [...data.categories, ans],
                    products: data.products
                }
                this.props.addCategory(obj)
            }
        }
    }

    handleDeleteSelected(data){
        let deleted = {...data}
        let products = deleted.products.filter(item=>{
            return !item.isChecked
        })
        deleted.products= products;
        this.props.addCategory(deleted)
    }

    render(){
        let renderProjectCards = <tr></tr>
        let renderCategoriesCards = <div></div>
        if(this.props.onlyProductData.products!=undefined){
            renderProjectCards = this.props.onlyProductData.products.map(item=>{
                return <ProRowCard key={item.id} id={item.id} name={item.name} unit={item.unitSold} stock={item.stock} date={item.expireDate} toCheck={`${item.isChecked}`}/>
            }) 

            renderCategoriesCards = this.props.onlyProductData.categories.map((item,pos)=>{
                return <Category title={item} key={pos+1} />
            }) 
        }
        

        return(
            <div className={classes.productDiv}>
                <div className={classes.pDetailsDiv}>
                    <div className={classes.pDetails}>
                        <table className={classes.prodTable} cellSpacing="0">
                            <tr className={classes.headingRow}>
                                <th className={classes.gap}></th>
                                <th className={classes.rowTitle}>PRODUCT NAME</th>
                                <th className={classes.rowUnit}>UNIT SOLD</th>
                                <th className={classes.rowStock}>IN STOCK</th>
                                <th className={classes.rowDate}>EXPIRE DATE</th>
                                <th className={classes.deleteGap}/>
                            </tr>
                            <tbody className={classes.tBody}>
                                {
                                    renderProjectCards
                                }
                            </tbody>
                        </table>
                    </div>
                    <Link to="/addProduct/0"><OrangeButton text="ADD NEW PRODUCT"/></Link>
                    <div onClick={()=>this.handleDeleteSelected(this.props.onlyProductData)}>
                        <OrangeButton text="DELETE SELECTED PRODUCTS"/>
                    </div>
                </div>
                <div className={classes.pCategDiv}>
                    <p className={classes.categoriesTitle}>Product Categories</p>
                    <div className={classes.categoryDiv}>
                        {
                          renderCategoriesCards
                        }
                    </div>
                    <div onClick={()=>this.handleAddCategory(this.props.onlyProductData)} className={classes.addCategories}>
                        <OrangeButton text="add new category"/>
                    </div>
                </div>
            </div>
        )
    }
}

const connectCallBack = (globalStore)=>{
    return{
        onlyProductData: globalStore.productPageData.productPage,
    }
}

const ChangeProductsId = (dispatch)=>{
    return{
        addCategory: (cat)=>{
            return dispatch({type:"ADD-CATEGORY", newCateg: cat})
        }
    }
}

export default connect(connectCallBack,ChangeProductsId)(product)