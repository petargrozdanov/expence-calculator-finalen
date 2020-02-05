import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './redux/store'
import Register from './components/Register'
import Login from './components/Login'
import NewProduct from './components/NewProduct'
import Header from './components/Header'
import Expenses from './components/Expenses'
import Products from './components/Products'
import UpdateProduct from './components/UpdateProduct'
import Table from './components/Table'
import Home from './components/Home'



const app = document.getElementById('root')
const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/' component={Login} />
                <Route exact path='/Register' component={Register} />
                {/* <Route exact path='/updateproduct/:id' component={UpdateProduct}/> */}
                <Route exact path="/updateproduct/:id" render={() =>
                    <>
                        <Header />
                        <UpdateProduct />
                    </>
                } />

                <Route exact path="/newproduct" render={() =>
                    <>
                        <Header />
                        <NewProduct />
                    </>
                } />
                <Route exact path="/expenses" render={() => <Expenses header={Header} products={Table} />} />
                <Route exact path="/products" render={() =>
                    <>
                        <Header />
                        <Products />
                    </>
                } />
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, app
)