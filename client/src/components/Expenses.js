import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import store from '../redux/store'
import { getItems } from '../redux/actions/itemsActions'
import Table from './Table'
import Header from './Header'
import './Expenses.css'



class Expenses extends React.Component {
    constructor() {
        super()
        this.state = {
            monthFilter: false,
            yearFilter: true,
            // toggle: true,
            refilter: null,
            Update: false
        }
    }

    yearFilter = () => {
        this.setState({
            yearFilter: true,
            monthFilter: false,
            // toggle: true
        })
    }

    monthFilter = () => {
        this.setState({
            yearFilter: false,
            monthFilter: true,
            // toggle: false
        })
    }

    Allrefilter = (event) => {
        this.setState({
            refilter: event.target.value,
            Update: true
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8084/api/v1/items?sort=purchase_date:desc",
            { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
            .then(res => {
                store.dispatch(getItems(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidUpdate() {
        if (this.state.Update) {
            let date = this.state.refilter
            if (date === 'all') {
                axios.get(`http://localhost:8084/api/v1/items?sort=purchase_date:desc`,
                    { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
                    .then(res => {
                        store.dispatch(getItems(res.data))

                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else if (date.length === 4) {
                let fromDate = new Date(`${date}-01-01 00:00:00.000`).getTime();
                let toDate = new Date(`${date}-12-31 23:59:59.000`).getTime();
                axios.get(`http://localhost:8084/api/v1/items?date_from=${fromDate}&date_to=${toDate}&sort=purchase_date:desc`,
                    { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
                    .then(res => {
                        store.dispatch(getItems(res.data))

                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {  ///date.length ===7
                let fromDate = new Date(`${date}-01 00:00:00.000`).getTime();
                let toDate = new Date(`${date}-31 23:59:59.000`).getTime();
                axios.get(`http://localhost:8084/api/v1/items?date_from=${fromDate}&date_to=${toDate}&sort=purchase_date:desc`,
                    { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
                    .then(res => {
                        store.dispatch(getItems(res.data))

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            this.setState({ Update: false })
        }
    }

    render() {
        // Total spent
        let totalAmount = 0
        for (let i = 0; i < this.props.items.length; i++) {
            totalAmount += this.props.items[i].product_price
        }
        // Za options na selectbox od Year
        //  let today = new Date();
        //  let year = today.getFullYear();
        // let selectOptions= []
        // for (let i = 2000; i <= year; i++) {

        // selectOptions.push(<option key={i} value={i}>{i}</option>)
        //  }
        //  selectOptions.reverse();

        // let selectOptions=['2000', '2001, '2002', '2003', '2004', '2005', '2006', '2007',
        //  '2008', '2009', '2010', '2001']
        // let today= new Date()
        // let selectOptions=today.getFullYear()


        return (
            <React.Fragment>
                <Header />
                <h3>Expenses</h3>
                <div className="expense4">
                    <button className="yearly-btn4" onClick={this.yearFilter}>Yearly</button>
                    {/* {this.state.toggle ? "yearly-btn4" : "yearly-btn4"}  */}
                    <button className="monthly-btn4" onClick={this.monthFilter}>MONTHLY</button>
                    {/* {!this.state.toggle ? "monthly-btn4" : "monthly-btn4"} */}
                    {this.state.monthFilter ?
                        <p id="box-container">
                            <label htmlFor="filter4">Choose Month </label>

                            <input type='month' className="box" id="month-box" onChange={this.Allrefilter}></input>
                        </p>
                        : null}

                    {this.state.yearFilter ?
                        <p id="box-container">
                            <label htmlFor="filter4">Choose Year </label>
                            <select  className="box" id="cost" onChange={this.Allrefilter}>
                                <option>----</option>
                                <option value={'all'}>Total</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                                <option value="2012">2012</option>
                                <option value="2011">2011</option>
                            </select>
                        </p>
                        : null}

                    <Table />
                </div>
                <div className="total-spent4">
                    <p>Total Spent: {totalAmount} denars </p>
                </div>
            </React.Fragment >

        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.itemsReducer.items
    }
}

export default connect(mapStateToProps)(Expenses)


