import React from 'react';
import './Signup.css';
class Signup extends React.Component{
   render(){
       return (
        <form className="sign-up-form-container">
            <div className="form-internal">
                <label For="email">Email</label>
                <input id="email" placeholder='example@gmail.com'></input>
                <label For="password">Password</label>
                <input id="password" placeholder='password'></input>
                <label For="confirm_pass">Confirm Password</label>
                <input id="confirm_pass" placeholder='Confirm Password'></input>
                <a className='small-signup-btn'>Sign up</a>
            </div>
            
        </form>
   )}   
}

export default Signup;