import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { setErrors } from '../../store/errors';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const demoPassword = 'password';
  const demoCredential = 'demo@user.io';

  const demoUserLogin = () => {
    dispatch(sessionActions.login({credential: demoCredential, password: demoPassword}))
      .then(res => {
        console.log('successfully logged in as Demo user')
      }).catch(e => {
        setErrors(['there was an issue logging in as Demo'])
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form id='login_form' className={`quickcast_form`} onSubmit={handleSubmit}>
      <label>
       {'Username or Email'}
      </label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      <label>
        {'Password'}
      </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <button className={`quickcast_submit_btn`} type="submit">Log In</button>
      <NavLink className={`text_links`} style={{textDecoration: 'none'}} to='/welcome-to-quickcast/signup'>
        {'Sign Up'}
      </NavLink>
      <p className={`text_links`} onClick={demoUserLogin}>{'Login as Demo User'}</p>
    </form>
  );
}

export default LoginForm;
