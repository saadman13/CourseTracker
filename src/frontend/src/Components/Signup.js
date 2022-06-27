import React from 'react';
import './Signup.css';
import {axiosInstance} from '../axiosApi';
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleEmailChange = (event) => {
        this.setState(state => {
         return {...state, email: event.target.value};
    })}

    handlePasswordChange = (event) => {
        this.setState(state => {
            return {...state, password: event.target.value};
       })
    }

    handleConfirmPasswordChange = (event) => {
        this.setState(state => {
            return {...state, confirmPassword: event.target.value};
       })
    }

    handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('user/create/', {
                email: this.state.email,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return response;
        } catch (error) {
            throw error;
        }
    }

   render(){
       return (
        <form className="sign-up-form-container">
            <div className="form-internal">
                <label htmlFor="email">Email</label>
                <input onChange={this.handleEmailChange} id="email" placeholder='example@gmail.com'></input>
                <label htmlFor="password">Password</label>
                <input onChange={this.handlePasswordChange} id="password" placeholder='password'></input>
                <label htmlFor="confirm_pass">Confirm Password</label>
                <input onChange={this.handleConfirmPasswordChange} id="confirm_pass" placeholder='Confirm Password'></input>
                <a onClick={this.handleSignup} className='small-signup-btn'>Sign up</a>
            </div>
        </form>
   )}   
}

export default Signup;