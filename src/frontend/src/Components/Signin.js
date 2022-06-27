import React from 'react';
import './Signup.css';
class Signin extends React.Component{

    render(){
        return (
            <form className="sign-up-form-container">
                <div className="form-internal">
                    <label For="email">Email</label>
                    <input id="email" placeholder='example@gmail.com'></input>
                    <label For="password">Password</label>
                    <input id="password" placeholder='password'></input>
                    <a className='small-signup-btn'>Sign in</a>
                </div>
            </form>
    )}
}

export default Signin;