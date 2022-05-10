import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className={'quickcast_form'} onSubmit={handleSubmit}>
      <label>
        Email
      </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <label>
        Username
      </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      <label>
        Password
      </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <label>
        Confirm Password
      </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      <button className={`quickcast_submit_btn`} type="submit">Sign Up</button>
      <p className={`text_links`} onClick={demoUserLogin}>{'Login as Demo User'}</p>
    </form>
  );
}

export default SignupForm;
