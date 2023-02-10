import './styles/App.scss';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home';
import { useState, useEffect, useCallback, createContext } from 'react';
import LoginPage from './components/LoginPage/LoginPage';

/*
this is the root component that is first mounted

this component conditionally renders either the login page
or logs the user into the homepage of the actual application
*/

export const UserContext = createContext();

const App = () => {
	const [user, setUser] = useState(null);

	// checks if a the user already set in local storage has had their token expire yet
	useEffect(() => {
		const LoggedInUser = {
			username: window.localStorage.getItem('LoggedInUserUsername'),
			name: window.localStorage.getItem('LoggedInUserName'),
			token: window.localStorage.getItem('LoggedInUserToken'),
			expiryDate: window.localStorage.getItem('LoggedInUserExpiryDate'),
		};
		if (
			LoggedInUser.username !== null &&
			new Date() < LoggedInUser.expiryDate
		) {
			setUser(LoggedInUser); // log in existing user
		} else if (new Date() > LoggedInUser.expiryDate) {
			logOut(); // log out expired user
		}
	}, []);

	const logOut = useCallback(() => {
		window.localStorage.removeItem('LoggedInUserUsername');
		window.localStorage.removeItem('LoggedInUserName');
		window.localStorage.removeItem('LoggedInUserToken');
		window.localStorage.removeItem('LoggedInUserExpiryDate');
		setUser(null);
	}, []);

	if (user === null) {
		return (
			<div className="app">
				<LoginPage setUser={setUser} />
			</div>
		);
	} else {
		return (
			<UserContext.Provider value={[user, setUser]}>
				<div
					className="app"
					onContextMenu={(e) => {
						e.preventDefault();
					}}
				>
					<Navbar logOut={logOut} />
					<Home />
				</div>
			</UserContext.Provider>
		);
	}
};

export default App;

/*
Refactor the local storage logic into a separate utility or custom hook to improve code readability and maintainability.

Add error handling in case something goes wrong while accessing the local storage data.

Use a more secure method of storing sensitive information, such as JWT tokens, instead of local storage.

Use a more secure method of logging out users, such as by making a request to the server to invalidate the token.
*/
