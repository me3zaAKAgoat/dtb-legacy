import { useState } from 'react';
import './LoginPage.scss';
import logo from '../../logo.png';
import loginService from '../../services/login.js';

const LoginProcessIndicator = ({ errorMessage }) => {
  if (errorMessage !== null) {
    return <div className="badLoginMessage">{errorMessage}</div>;
  } else {
    return (
      <div
        style={{
          height: '30px',
          width: '100%',
        }}
      ></div>
    );
  }
};

const LoginPage = ({ setUser }) => {
  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordFiedl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginPost({
        username: usernameField,
        password: passwordField,
      });
      const t = new Date();
      window.localStorage.setItem('LoggedInUserUsername', user.username);
      window.localStorage.setItem('LoggedInUserName', user.name);
      window.localStorage.setItem('LoggedInUserToken', user.token);
      window.localStorage.setItem(
        'LoggedInUserExpiryDate',
        t.setSeconds(t.getSeconds() + user.expiresIn)
      );
      console.log(user);
      setUser(user);
    } catch (err) {
      setErrorMessage(err.response.data.error);
      console.log('loginHandler', errorMessage);
    }
  };

  return (
    <div className="loginFormContainer">
      <span>
        <img src={logo} className="" />
      </span>
      <form onSubmit={loginHandler}>
        <button className="signUpRedirectionButton">Sign up?</button>
        <input
          type="text"
          value={usernameField}
          onChange={(event) => {
            setUsernameField(event.target.value);
          }}
          placeholder="Username"
        ></input>

        <input
          type="password"
          value={passwordField}
          onChange={(event) => {
            setPasswordFiedl(event.target.value);
          }}
          placeholder="Password"
        ></input>
        <button type="submit">login</button>
        <LoginProcessIndicator errorMessage={errorMessage} />
      </form>
    </div>
  );
};

export default LoginPage;
