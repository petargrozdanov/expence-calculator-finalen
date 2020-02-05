
import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import store from '../redux/store'
import axios from "axios";
import { getItems, editOneItem, deleteItem, Update, } from "../redux/actions/itemsActions";
import './Products.css'
import './DeleteProduct.css'


class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: null,
      item: [],
      filterOption: null,
      Update: false,
      align: null
    };
  }

  refilter = (event) => {
    this.setState({ Update: true, align: event.target.value })
  }


  componentDidMount() {
    axios.get("http://localhost:8084/api/v1/items?align=purchase_date:desc",
      { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
      .then(res => {
        store.dispatch(getItems(res.data))
        // this.setState({ Update: this.props.Update })

      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidUpdate() {
    if (this.state.Update && this.state.align === null) {
      axios.get("http://localhost:8084/api/v1/items?sort=purchase_date:desc",
        { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
        .then(res => {
          store.dispatch(getItems(res.data))
          //  store.dispatch(Update(false))
          // console.log('Update')
        })
        .catch(err => {
          console.log(err)
        })
      this.setState({ Update: false })
    } else if (this.state.align != null) {
      axios.get(`http://localhost:8084/api/v1/items?sort=${this.state.align}`,
        { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
        .then(res => {
          store.dispatch(getItems(res.data))
          //  store.dispatch(Update(false))
          // console.log('Update')
        })
        .catch(err => {
          console.log(err)
        })
      this.setState({
        Update: false,
        align: null
      })
    } else {
      console.log('Error ')
    }
  }


  //funkcii za delete alert 
  delete = _id => {
    this.setState({
      showModal: (
        <React.Fragment>

          <div id="pop-up" className='delete'>
        <div id="delete-container">
            <div id="delete-text">
                <h1>Delete Product</h1>
            <p>You are about to delete this product.Are you sure you wish to continue?</p>
            </div>
            <div id="delete-buttons">
              <button className="delete-btn" id="cancel-btn" onClick={() => this.setState({ showModal: null })} >Cancel</button>
              
              <button className="delete-btn" id="delete-button"  onClick={() => { this.onDeleteClick(_id) }}>Delete</button>
              
              </div>
        </div>
    </div>
        </React.Fragment>
      )
    })
  }
  onDeleteClick = _id => {
    axios.delete(`http://localhost:8084/api/v1/items/${_id}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => {
        console.log(res)
        store.dispatch(deleteItem(_id))
      })
      .catch(err => {
        console.log(err)
      })


  }
  //funkcii za edit product 

  doneEdit = (_id) => {
    // alert('TEST');
    //  console.log(this.props);
    //  console.log('***************************************');
    // console.log(this.props._id,
    //    this.props.product_name,
    //    this.props.product_type,
    //   this.props.product_description,
    //   this.props.purchase_date,
    //    this.props.product_price);
    // console.log('***************************************');

    var item = this.props.items.filter((v, i) => {
      if (v._id === _id) {
        return v;
      }
      return
    })

    console.log(item[0]);

    //  store.dispatch(

    this.props.editOneItem(item[0]);

    //  store.dispatch(true)

  }
  //    edit(e){
  //      var id=e.target.getAttribute('data-key')
  //     store.dispatch({
  //       type:"UPDATE_ITEM",
  //       id:id
  //      })
  //     this.props.history.push('/edit/'+id)
  //  }


  render() {

    let itemsList = null;
    if (this.props.items) {
      itemsList = this.props.items.map(item => {

        return (

          <tr key={item._id}>
            <td>{item.product_name}</td>
            <td>{item.product_type}</td>
            <td>{item.product_description}</td>
            <td>{item.purchase_date.toString().slice(0, 10)}</td>
            <td>{item.product_price}</td>
            <td>

              <Link to={`/updateproduct/${item._id}`}>
                <span id="edit" className="far fa-edit" onClick={() => { this.doneEdit(item._id) }}></span>


              </Link>
              <span id="delete" className="far fa-trash-alt" onClick={() => this.delete(item._id)}> </span>
            </td>
          </tr >
        );
      });
    }
    return (
      <React.Fragment>
        <div className="main-div5">

          <h3>Products</h3>
          <label>Filter by:
          <select name="purchase-filter" id="filter5" onChange={this.refilter}>
              <option value="purchase_date:desc">Latest Purchase</option>
              <option value="product_price:desc">Highest Price</option>
              <option value="product_price:asc">Lowest Price</option>
              <option value="purchase_date:asc">First Purchase</option>
            </select>
          </label>
        </div>

        <table className="table table-dark">
          {this.state.showModal}
          <thead>
            <tr>
              <th>Product name</th>
              <th>Product type</th>
              <th>Product description</th>
              <th>Purchase date</th>
              <th>Product price </th>
              <th></th>
              <th></th>


            </tr>
          </thead>
          <tbody>{itemsList}</tbody>
        </table>
        <Link to="/newproduct">
          <button className="fixed-button5" onClick={this.toggle}>New Product</button>
        </Link>
      </React.Fragment >
    );
  }
}
Products.propTypes = {
  items: React.PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,

}

function mapStateToProps(state) {
  return {
    items: state.itemsReducer.items,

  };
}
function mapDispatchToProps(dispatch) {
  return {
    getItems: data => dispatch(getItems(data)),
    editOneItem: data => dispatch(editOneItem(data))

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);


















// import React from 'react'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import './Products.css'

// const Products = ()=> {
//     return (
//         <React.Fragment>
//             <div className="main-div5">
//   <h3>Products</h3>
//   <label>Filter by: 
//   <select id="filter5">
//       <option>Year</option>
//       <option>Highest Price</option>
//       <option>Lowest Price</option>
//       <option>Latest Purchases</option>
//   </select>
// </label>
// </div>


//         <table className="data5">
//             <tbody>
//           <tr>
//             <th>Product name</th>
//             <th>Product type</th>
//             <th>Product description</th>
//             <th>Purchase date</th>
//             <th>Product price </th>
//             <th></th>
//             <th></th>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           <tr>
//             <td>Coca-cola</td>
//             <td>Drink</td>
//             <td>Carbonated soft drink</td>
//             <td>19.08.2018</td>
//             <td>75</td>
//             <td>
//                     <a href=""><i className="far fa-edit"></i></a>
//                     <a href=""><i className="far fa-trash-alt"></i></a>
//                 </td>
//           </tr>
//           </tbody>
//         </table>
//         <button className="fixed-button5">New product</button>




//         </React.Fragment>
//     )
// }
// export default Products