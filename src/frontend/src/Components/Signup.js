import React, {useState} from 'react';
import './Signup.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {axiosInstance} from '../axiosApi';


const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('user/create/', {
                email: email,
                password: password
            });
            setIsLoading(false);
            props.signinToggleHandler();
            return response;
        } catch (error) {
            alert(`Error! ${error.message}`)
            console.log(error);
            setIsLoading(false);
            throw error;
            
        }
    }

    return (
        <div>
            <form className="sign-up-form-container">
                <div className="form-internal">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleEmailChange} id="email" placeholder='example@gmail.com'></input>
                    <label htmlFor="password">Password</label>
                    <input onChange={handlePasswordChange} type="password" id="password" placeholder='password'></input>
                    <label htmlFor="confirm_pass">Confirm Password</label>
                    <input onChange={handleConfirmPasswordChange} type="password" id="confirm_pass" placeholder='Confirm Password'></input>
                    <a onClick={handleSignup} className='small-signup-btn'>Sign up</a>
                </div>
            </form>
            { isLoading && <Box mt={2} sx={{display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
            </Box>}
        </div>
    )
}

export default Signup;