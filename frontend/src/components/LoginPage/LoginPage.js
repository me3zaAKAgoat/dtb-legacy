import { useState } from 'react';
import '../../styles/LoginPage.scss';
import loginService from '../../services/login.js';

/*
this component is a rectangle div that shows the reason the login
process may have failed 
*/
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

/*
this is a controlled component that has a form
as its  core, this componenet is login page as a whole
and handles all the user business logic
*/
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
		<div className="loginPage">
			<span>
				<img src="/assets/logo.png" className="" />
			</span>
			<div className="formWrapper">
				<button
					className="signUpRedirectionButton"
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					Sign up?
				</button>
				<form onSubmit={loginHandler}>
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
					<button type="submit">Login</button>
				</form>
				<LoginProcessIndicator errorMessage={errorMessage} />
			</div>
		</div>
	);
};

export default LoginPage;