import { useState, useEffect, useCallback, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const UserContext = createContext();

export const useUser = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const logOut = useCallback(() => {
		window.localStorage.removeItem('LoggedInUserUsername');
		window.localStorage.removeItem('LoggedInUserName');
		window.localStorage.removeItem('LoggedInUserToken');
		window.localStorage.removeItem('LoggedInUserExpiryDate');
		setUser(null);
		navigate('/login');
	}, []);

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
			if (location.pathname === '/') {
				navigate('/board');
			}
		} else if (new Date() > LoggedInUser.expiryDate) {
			logOut(); // log out expired user
		}
	}, [logOut]);

	return { user, setUser, logOut };
};
