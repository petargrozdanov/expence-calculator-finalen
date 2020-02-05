import React from 'react'
import { Link } from 'react-router-dom'
import HomePicture from './assets/images/Cost-Calculator.jpg'
import './Home.css'

const Home = () => {
    return (
       
        <React.Fragment>
        
        <p className='expenseCalculator'>EXPENSE CALCULATOR</p>
        
        <div className="paragraph">
        <h4 className='paragraph1'>See where your money goes</h4>
        <h4 className='paragraph2'>Simple App to start Saving More</h4>
        </div>

        <img src={HomePicture} alt="Logo" />

        <div className="buttons">
        <p className='btn'> If you don't have account please 
        
        <Link to='/register'>
        <button className="main-buttons" id="products-btn">REGISTER</button></Link>
        </p>
         <p className='btn'> Or 
        
         <Link to='/'>
         <button className="main-buttons" id="expenses-btn">LOG IN</button> </Link></p>
         </div>
        </React.Fragment>


    )
}

export default Home