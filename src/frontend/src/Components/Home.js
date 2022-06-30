import React, {useState, useEffect} from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Signup from './Signup';
import Signin from './Signin';

const Home = (props) => {
    const [isSignup, setIsSignup] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState('');

    useEffect(() => {
        setIsSignup(props.isSignup);
    }, [])
        
    const renderError = (message)=> {
        setErrorAlert(message);
    }

    const signupToggleHandler = () => {
        setShowAlert(false);
        setIsSignup(true);
    }

    const signinToggleHandler2 = () => {
        setShowAlert(true);
        setIsSignup(false);
    }

    const signinToggleHandler = () => {
        setShowAlert(false);
        setIsSignup(false);
    }

    const closeErrorHandler = () => {
        setErrorAlert('');
    }

    const closeSuccessHandler = () => {
        setShowAlert(false);
    }



    let signUpStyle = `button sign-up ${isSignup ? 'active' : ''}`;
    let signInStyle = `button sign-in ${isSignup ? '' : 'active'}`;
    return (
        <div className='main-main-container'>
            {errorAlert && <Alert style={{ width:'40%', margin: '0 auto'}} severity="error" onClose={closeErrorHandler}>{errorAlert}</Alert>}
            {showAlert && <Alert style={{ width:'40%', margin: '0 auto'}} onClose={closeSuccessHandler}>Signup Successful! Please sign in</Alert>}
            <h1> Lets manage your courses!</h1>
            <div className='main-container'>
                <div className="btn-container">
                    <Link onClick={signupToggleHandler} to='/signup' className={signUpStyle}>Sign up</Link>
                    <Link onClick={signinToggleHandler} to='/signin' className={signInStyle}>Sign in</Link>
                </div>
            </div>
            {isSignup && <Signup signinToggleHandler={signinToggleHandler2} renderErrorHandler={renderError} /> }
            { !isSignup && <Signin renderErrorHandler={renderError} />}
        </div>
    )   
}

export default Home;