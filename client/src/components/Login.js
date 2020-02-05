
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './Login.css'
 import './Shared.css'


class Login extends React.Component {
    constructor () {
        super()
        this.state = {
            email: null,
            password: null,
             redirect:false
           
        }
    }
   

    saveValue = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }
    sendToProducts = () => {
        if (this.state.redirect) {
            return <Redirect to="/products" />
        }
    }
 

    login = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8085/api/v1/auth/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res=>{
            localStorage.setItem('jwt', res.data.jwt);
            localStorage.setItem('name', res.data.first_name);
            localStorage.setItem('lastName', res.data.last_name);
            this.setState({redirect: true});
          
        })
       
        .catch(err=>{
            console.log(err)
        });
    }

    render () {
     
        return (
            <React.Fragment>
               {this.sendToProducts()}
                <div id="login">
            <div className="box-container">
             <form>
                 <p className="input-container">
                     <label className="text-field-input">E-mail</label>
                     <input type="text" className="text-field" id='email' onChange={this.saveValue} />
                 </p>
                 <p className="input-container">
                     <label className="text-field-input">Password</label>
                     <input type="password" className="text-field"  id='password' onChange={this.saveValue}/>
                 </p>
                 <button className="primary-button" onClick={this.login}>Sign in</button>
             </form>
       

          <div className="additional-info" >
                        <p className="additional-info1">Or if you don't have an account, 
                            <Link to='/register'>
                            <span >Register</span>
                            </Link>
                        </p>
                    </div>
                </div>
                </div>
            </React.Fragment>
            )
    }
    
}
export default Login






