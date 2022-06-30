import React, {useState} from 'react';
import './Signup.css';
import {useHistory} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { axiosInstance } from '../axiosApi';
import jwt_decode from "jwt-decode";

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('token/obtain/', {
                email: email,
                password: password
            });
            console.log(response);
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            let decoded = jwt_decode(response.data.access);
            setIsLoading(false);
            console.log(decoded);
            history.push('/home', {user_id: decoded.user_id});
            return response;
        } catch (error) {
            console.log(error);
            const res = error.response.data;

            let message='';
            Object.keys(res).map((keyName) => {
              console.log(keyName);// eslint-disable-line no-console
              console.log(res[keyName]);// eslint-disable-line no-console
              
              if(keyName.toUpperCase() === 'DETAIL')
                message += `Error: ${res[keyName]}\n`
              else 
                message += `${keyName.toUpperCase()}: ${res[keyName]}\n`
              props.renderErrorHandler(message);
              return res[keyName];
            })
            setIsLoading(false);    
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
                    <a onClick={handleSignin} className='small-signup-btn'>Sign in</a>
                </div>
            </form>
            { isLoading && <Box mt={2} sx={{display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
            </Box>}
        </div>
    )
}

export default Signin;