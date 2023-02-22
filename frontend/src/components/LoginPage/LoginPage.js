import { useState } from 'react';
import 'styles/LoginPage.scss';
import Logo from 'components/Logo/Logo';
import loginService from 'services/login.js';
import { useNavigate } from 'react-router-dom';
/*
this component is a rectangle div that shows the reason the login
process may have failed 
*/
const ApiCallsIndicator = ({ errorMessage }) => {
	if (errorMessage) {
		return (
			<div className="badLoginMessage">
				{errorMessage === undefined
					? 'failed to connect to server'
					: errorMessage}
			</div>
		);
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
as its core, this component parents login page as a whole
and handles all the user login business logic
*/
const LoginPage = ({ setUser }) => {
	const [usernameField, setUsernameField] = useState('');
	const [passwordField, setPasswordField] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const loginHandler = async (event) => {
		event.preventDefault();
		if (usernameField.length === 0 || passwordField.length === 0) {
			setErrorMessage('Fields cannot be empty');
		} else {
			try {
				const user = await loginService.loginPost({
					username: usernameField,
					password: passwordField,
				});
				const currentTime = new Date();
				window.localStorage.setItem('LoggedInUserUsername', user.username);
				window.localStorage.setItem('LoggedInUserName', user.name);
				window.localStorage.setItem('LoggedInUserToken', user.token);
				window.localStorage.setItem(
					'LoggedInUserExpiryDate',
					currentTime.setSeconds(currentTime.getSeconds() + user.expiresIn)
				);
				setUser(user);
				navigate('/board');
			} catch (err) {
				console.log(err);
				setErrorMessage(err?.response?.data?.error);
			}
		}
	};

	return (
		<div className="loginPage">
			<div className="logoContainer">
				<Logo />
			</div>
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
							setPasswordField(event.target.value);
						}}
						placeholder="Password"
					></input>
					<button className="baseButton" type="submit">
						Login
					</button>
				</form>
				<ApiCallsIndicator errorMessage={errorMessage} />
			</div>
		</div>
	);
};

export default LoginPage;
