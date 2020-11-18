import React from 'react';
import classes from './addpro.module.css';
import OrangeButton from '../../Component/OrangeButton/orangeBut';
import {connect} from 'react-redux';

class addProduct extends React.Component{

    state={
        uploadedPhoto: "",
        selectedCategory: "",
        data: {
            id: 0,
			category: "",
			description: "",
			expireDate: "",
			name: "",
			stock: "",
			unitSold: ""
		}
    }

    fileOnChange = (e)=>{
        let file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e)=>{
            this.setState({uploadedPhoto: e.target.result})
        }
    }

    formSubmit=(e)=>{
        e.preventDefault();
        if(this.state.selectedCategory === "" || this.state.uploadedPhoto === ""){
            alert("Please Enter a Category and Product Image");
        }
        else {
            let productObj = {
                category: this.state.selectedCategory,
                description: e.target.desc.value,
                expireDate: e.target.date.value,
                name: e.target.name.value,
                stock: e.target.stocks.value,
                unitSold: (e.target.stocks.value/5).toFixed(2),
                productPic: this.state.uploadedPhoto,
                id: (new Date()).getMinutes() + (new Date()).getMilliseconds() + (new Date()).getMilliseconds(),
                isChecked: false
            }
            let b = {
                categories: [...this.props.categories],
                products: [...this.props.productAllDetails.products,productObj]
            }
            this.setState({uploadedPhoto: ""})
            this.props.addProduct(b)
            e.target.reset();
            alert("Added Successfully")
            this.props.history.push("/products")
        }
    }

    onSelectChange = (e)=>{
        let value = e.target.value;
        if(value === "Select Category"){
            this.setState({selectedCategory: ""})
        }
        else {
            this.setState({selectedCategory: e.target.value})
        }     
    }


    handleDefaultValue(id, attr){
        return this.state.data[attr]
    }

    render(){
        if(this.props.productAllDetails.products!=undefined){
            if(this.state.data.id != this.props.match.params.id){
                this.props.productAllDetails.products.map(item=>{
                    if(item.id == this.props.match.params.id){
                        if(item.productPic!=undefined){
                            this.setState({data: {...item}, uploadedPhoto: item.productPic})
                        }
                        else this.setState({data: {...item}})
                    }
                })
            }
        }
      
        return(
            <div className={classes.addProDiv}> 
                <h3>Edit Product</h3>
                <form onSubmit={(e)=>{this.formSubmit(e)}}>
                    <div className={classes.wrapperDiv}>
                        <div className={classes.addingDetailsDiv}>


                            <p className={classes.inputText}>Product Name</p>
                            <input className={classes.input} type="text" name="name" required
                                defaultValue={this.handleDefaultValue(this.props.match.params.id,"name")}
                            />


                            <p className={classes.inputText}>Description</p>
                            <textarea className={classes.textarea} name="desc" required
                                defaultValue={this.handleDefaultValue(this.props.match.params.id,"description")}
                            ></textarea>


                            <p className={classes.inputText}>Category</p>
                            <select onChange={(e)=>{this.onSelectChange(e)}} className={classes.selects} required
                                defaultValue={this.handleDefaultValue(this.props.match.params.id,"category")}
                            >
                                <option className={classes.options}>Select Category</option>
                                {
                                    this.props.categories!=undefined?
                                        this.props.categories.map((item,pos)=>{
                                            return <option key={pos+1} className={classes.options}>{item}</option>
                                        }):null
                                }
                            </select>


                            <div className={classes.stockANDdates} >
                                <div className={classes.subInput}>


                                    <p className={classes.inputText}>Expire Date</p>
                                    <input className={classes.input} type="text" name="date" required
                                        defaultValue={this.handleDefaultValue(this.props.match.params.id,"expireDate")}
                                    />


                                </div>
                                <div className={classes.subInput}>


                                    <p className={classes.inputText}>Units In Stock</p>
                                    <input className={classes.input} type="number" name="stocks" required
                                        defaultValue={this.handleDefaultValue(this.props.match.params.id,"stock")}
                                    />


                                </div>
                            </div>
                        </div>
                        <div className={classes.uploadImageDiv}> 
                            <div className={classes.uploadDiv}>
                                <i className={`fas fa-cloud-upload-alt ${classes.cloudIcon}`}></i>  
                                <input onChange={(e)=>this.fileOnChange(e)} type="file" accept="image/*" className={classes.inputFile}/>
                                <img className={classes.renderImage} src={this.state.uploadedPhoto} alt=""/>
                            </div>
                            <div className={classes.orangeInputFilediv}>
                                <OrangeButton text="Upload product image" className={classes.uploadPhotoButton}/>
                                <input onChange={(e)=>this.fileOnChange(e)} type="file" accept="image/*" className={classes.orangeInput}/>
                            </div>
                        
                        </div>
                    </div>
                    <OrangeButton text="add product now"/>
                </form>
            </div>
        )
    }
}

const getDataFromGlobalStore = (globalStore)=>{
    return({
        categories: globalStore.productPageData.productPage.categories,
        productAllDetails: globalStore.productPageData.productPage
    })
}

const storeDatatoGlobalStore = (dispatch)=>{
    return({
        addProduct : (data)=>{
            return dispatch({type: "PRODUCT-PAGE-UPDATE", productData: data })
        }
    })
}

export default connect(getDataFromGlobalStore,storeDatatoGlobalStore)(addProduct)