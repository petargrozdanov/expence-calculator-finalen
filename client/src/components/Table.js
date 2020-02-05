import React from "react";
import { connect } from 'react-redux'
import './Products.css'


class Table extends React.Component {
    constructor(props){
        super(props)
        this.state = {
             showAlert:null
        }
    }


    render(){
        let itemsList = null;
        if(this.props.items){
            itemsList=this.props.items.map(item => {   
            return(
                <tr key = {item._id}>
                        <td>{item.product_name}</td>
                        <td>{item.product_type}</td>
                        <td>{item.product_description}</td>
                        <td>{item.purchase_date.toString().slice(0, 10)}</td>
                        <td>{item.product_price}</td>
                        <td>
                        </td>
                </tr>
            )
        })
    }
    
        return(
            <React.Fragment>
                
        <div className="table table-dark">
        <table>
          <thead>
            <tr>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Description</th>
                <th>Purchase Date</th>
                <th>Product Price</th>
            </tr>
          </thead>
                <tbody>
                {itemsList}
                </tbody>
        </table>
        </div>
            </React.Fragment>
        )
    }

}

function mapStateToProps (state) {
    return {
        items: state.itemsReducer.items,
          }
}

export default connect(mapStateToProps)(Table);