import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin, requestUserInfo, setLoggedIn, setLoginErrorMessage } from '../redux/actions';
import { selectLoggedIn, selectLoginErrorMessage } from '../redux/selectors';

interface Token {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loggedIn = useSelector(selectLoggedIn);
  const loginErrorMessage = useSelector(selectLoginErrorMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwt_decode<Token>(token);
      if (Date.now() <= tokenDecoded.exp * 1000) {
        dispatch(requestUserInfo());
        dispatch(setLoggedIn(true));
      } else {
        dispatch(setLoggedIn(false));
      }
    }
  }, []);

  const login = () => {
    if (username === '' || password === '') {
      dispatch(setLoginErrorMessage('Please fill out above fields.'));
      return;
    }
    dispatch(requestLogin(username, password));
  };

  return loggedIn ? <div/> : (<div className="login-page d-flex justify-content-center align-items-center">
    <div className="login-wrapper">
      <div className="login-header pt-5 pb-4 px-4">
        <h3 className="text-center">SIGNIN</h3>
      </div>
      <div className="login-body pt-4 px-4">
        <div className="mb-2">Login with your email Address.</div>
        <Input placeholder="Username or Email" className="mb-3" value={username}
               onChange={evt => setUsername(evt.target.value)}/>
        <Input type="password" placeholder="Password" className="mb-4" value={password}
               onChange={evt => setPassword(evt.target.value)} onKeyDown={event => {
          if (event.key === 'Enter') {
            login();
          }
        }}/>
      </div>
      <div className="login-error px-4">{loginErrorMessage}</div>
      <div className="login-footer p-4">
        <Button
          onClick={login}
          className="w-100 btn-login">SIGN IN</Button>
      </div>
    </div>
  </div>);
}
