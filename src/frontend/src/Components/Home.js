import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Signup from './Signup';


export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isSignup: true
        }
        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton(){
        console.log("hello");
        this.setState((state) => {
            return {...state, isSignup: !state.isSignup}
        })
    }
    render(){
        return (
        <div class='main-main-container'>
            <h1> Lets manage your courses!</h1>
            <div class='main-container'>
                <div class="btn-container">
                    <Link onClick={this.toggleButton} to='/signup' className='button sign-up'>Sign up</Link>
                    <Link to='/signin' className='button sign-in'>Sign in</Link>
                </div>
            </div>
            { this.state.isSignup && <Signup /> }
            { !this.state.isSignup && <Signin />}
        </div>
    )}
}