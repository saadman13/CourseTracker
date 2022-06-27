import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';


export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isSignup: true
        }
        this.signupToggleHandler = this.signupToggleHandler.bind(this);
        this.signinToggleHandler = this.signinToggleHandler.bind(this);
    }

    signupToggleHandler(){
        this.setState((state) => {
            return {...state, isSignup: true}
        })
    }

    signinToggleHandler(){
        this.setState((state) => {
            return {...state, isSignup: false}
        })
    }

    render(){
        return (
        <div class='main-main-container'>
            <h1> Lets manage your courses!</h1>
            <div class='main-container'>
                <div class="btn-container">
                    <Link onClick={this.signupToggleHandler} to='/signup' className='button sign-up'>Sign up</Link>
                    <Link onClick={this.signinToggleHandler} to='/signin' className='button sign-in'>Sign in</Link>
                </div>
            </div>
            { this.state.isSignup && <Signup /> }
            { !this.state.isSignup && <Signin />}
        </div>
    )}
}