import React from 'react'
import classes from './proCard.module.css';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class productCard extends React.Component{

    titleClick(id){
        alert(id)
    }

    deleteIconClick(id){
        const obj = {...this.props.productData}
        const products = obj.products.filter(item=>{
            return item.id!=id
        })
        obj.products = products
        this.props.modifyCheckANDdeleteCard(obj) 
    }

    checkBoxDelete(id){
        const obj = {...this.props.productData}
        const products = obj.products.filter(item=>{
            if(item.id === id){
                if(item.isChecked!=undefined && item.isChecked === true) item.isChecked = false
                else item.isChecked = true
            }
            return item
        })
        obj.products = products
        this.props.modifyCheckANDdeleteCard(obj)
    }

    render(){
        return(
            <tr className={classes.cardRow}>
                <td className={classes.gap}><div onClick={()=>{this.checkBoxDelete(this.props.id)}} className={classes.checkBoxdiv}>
                    <i className={`fas fa-check ${this.props.toCheck === "false"?classes.unChecked: classes.checked}`}></i></div></td>
                <td className={classes.rowTitle}><Link to={`/addProduct/${this.props.id}`} className={classes.linkText}>{this.props.name}</Link></td>
                <td className={classes.rowUnit}>{this.props.unit}</td>
                <td className={classes.rowStock}>{this.props.stock}</td>
                <td className={classes.rowDate}>{this.props.date}</td>
                <td className={classes.deleteGap}><div className={classes.deleteIconDiv}>
                <i onClick={()=>this.deleteIconClick(this.props.id)} className={`far fa-trash-alt ${classes.trash}`}></i>    
                </div></td>
            </tr>
        );
    }
}


const getData = (globalStore)=>{
    return {
        productData: globalStore.productPageData.productPage
    }
}

const updateData = (dispatch)=>{
    return{
        modifyCheckANDdeleteCard : (data)=>{
            return dispatch({type: "PRODUCT-PAGE-UPDATE", productData: data})
        }
    }
}
export default connect(getData, updateData)(productCard)