
import React from 'react'
import store from '../redux/store'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Update } from '../redux/actions/itemsActions'
import './New product.css'





class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newProduct: this.props.newProduct,
            product_name: this.props.product_name === '',
            product_type: this.props.newProduct === '',
            product_description: this.props.newProduct === '',
            purchase_date: this.props.newProduct === '',
            product_price: this.props.newProduct === ''
        }
    }

    save = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    createProduct = (event) => {
        if (this.state.product_name === null ||
            this.state.product_type === null ||
            this.state.product_description === null ||
            this.state.purchase_date === null ||
            this.state.product_price === null) {
            event.preventDefault()
            alert('Please fill all the fields')
        } else if (this.state.product_name != null &&
            this.state.product_type != null &&
            this.state.product_description != null &&
            this.state.purchase_date != null &&
            this.state.product_price != null) {

            axios.post('http://localhost:8084/api/v1/items', {
                product_name: this.state.product_name,
                product_type: this.state.product_type,
                product_description: this.state.product_description,
                purchase_date: this.state.purchase_date,
                product_price: this.state.product_price
            }, { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
            store.dispatch(Update(true))
        }
    }



    render() {
        return (
            <React.Fragment>
                <h3>New Product</h3>
                      <div id="login2">
                    <div className="box-container2">
                        <form action="">
                            <p className="input-container2">
                                <label className="text-field-input2">Product Name</label> <br />
                                <input type="text" className="text-field2"
                                    id='product_name'
                                    onChange={this.save}
                                    defaultValue={this.props.product_name} />
                            </p>
                            <p className="input-container2">
                                <label className="text-field-input2">Product Type</label> <br />
                                <input type="text" className="text-field2"
                                    id='product_type'
                                    onChange={this.save}
                                    defaultValue={this.props.product_type} />
                            </p>
                            <p className="input-container2">
                                <label className="text-field-input2">Product Description</label> <br />
                                <input type="text" className="text-field2"
                                    id='product_description'
                                    onChange={this.save}
                                    defaultValue={this.props.product_description} />
                            </p>
                            <p className="input-container2">
                                <label className="text-field-input2">Purchase Date</label> <br />
                                <input type="date" className="text-field2"
                                    id='purchase_date'
                                    onChange={this.save}
                                    defaultValue={this.props.purchase_date} />
                            </p>
                            <p className="input-container2">
                                <label className="text-field-input2">Product Price</label> <br />
                                <input type="text" className="text-field2"
                                    id='product_price'
                                    onChange={this.save}
                                    defaultValue={this.props.product_price} />
                            </p>
                            <Link to='/products'>
                            {!this.state.newProduct} 
                            <button className="primary-button2"
                                onClick={this.createProduct}>CREATE PRODUCT</button>
                                </Link> 

                        </form>
                    </div>
                    <div className="new2">
                        <Link to='/newproduct'>
                        <p><i className="fas fa-plus-circle"></i></p></Link>
                        <p>You are creating new product</p>
                    </div>
                </div>


            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.itemsReducer.items,
     newProduct: state.itemsReducer.newProduct
    }
}

export default connect(mapStateToProps)(NewProduct)