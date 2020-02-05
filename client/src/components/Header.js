import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Profile from './assets/images/profile.png.png'

const Header = () => {
    function logout(){
        localStorage.clear()
     }
    return (
        <React.Fragment>
        <header>
        <nav className="nav3">
            <div className="buttons3">
                <Link to='/products'>
                <button className="main-buttons3" id="products-btn3">Products</button></Link>
                <Link to='/expenses'>
                <button className="main-buttons3" id="expenses-btn3">Expenses</button></Link>
            </div>

            <div className="picture3">
            <img src={Profile} alt="Profile"  id='profile3'/>
            
            </div>
            <Link to='/home' className="logOutButton3"  onClick={logout}>Log out</Link>
           
        </nav>
        </header> 
        </React.Fragment>


    )
}

export default Header