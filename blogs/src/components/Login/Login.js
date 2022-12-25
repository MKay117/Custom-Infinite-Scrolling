import './Login.css';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import UserContext from '../UserContext';

const Login = () => {

    const userCreds = [
        {
            uname: 'Aditya',
            pword: 'aditya'
        },
        {
            uname: 'Ashok',
            pword: 'aditya'
        },
        {
            uname: 'Pavan',
            pword: 'aditya'
        },
        {
            uname: 'Kiran',
            pword: 'aditya'
        }
    ]

    const history = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [unameValidator, setUnameValidator] = useState(false);
    const [pwordValidator, setPwordValidator] = useState(false);
    const [wrongCreds, setWrongCreds] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const { username, setUsername, password, setPassword, setIsLogged } = useContext(UserContext);

    const validateCredentials = () => {
        if (username === '') setUnameValidator(true);
        if (password === '') setPwordValidator(true); 
        if (username !== '' && password !== '') {
            userCreds.forEach((cred) => {
                if (cred.uname !== username && cred.pword !== password) {
                    setWrongCreds(true);
                } else {
                    history('/');
                    setIsLogged(true);
                    setPassword('');
                    setUsername('');
                }
            })
        }
    };

    return (
        <div className="login-container">
          <div className='form-card'>
            <div className="header-container">
                <h1 className="header">Login</h1>
            </div>
            <div className="form-container">
              <div className='input-container'>  
                <TextField 
                    id="username"
                    size='small'
                    type='text'
                    label="Username"
                    variant="outlined"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <AccountCircle />
                        </InputAdornment>
                        ),
                    }}
                />
              </div>
              { unameValidator && <p className='error-message'>Enter Username</p> }
              <div className='input-container'>  
                <TextField 
                    id="password"
                    size='small'
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={password}
                    label="Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
              </div>
              { pwordValidator && <p className='error-message'>Enter Password</p> }  
            </div>
            <br />
            <h5>Forgot Password ?</h5>
            { wrongCreds && <p className='error-message'>Enter Valid Credentials</p> }
            <div className='input-container'>
              <Button variant="outlined" endIcon={<SendIcon />} size='small' onClick={validateCredentials}>
                Login
              </Button>
            </div>
          </div>
        </div>
    )
};

export default Login;