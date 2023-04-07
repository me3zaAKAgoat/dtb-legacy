import { useState, useEffect, useCallback, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const UserContext = createContext();

export const useUser = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const logOut = useCallback(() => {
		try {
			window.localStorage.removeItem('LoggedInUserUsername');
			window.localStorage.removeItem('LoggedInUserName');
			window.localStorage.removeItem('LoggedInUserToken');
			window.localStorage.removeItem('LoggedInUserExpiryDate');
			setUser(null);
			navigate('/login');
		} catch (error) {
			console.error('Error while logging out:', error);
		}
	}, []);

	useEffect(() => {
		const LoggedInUser = {
			username: window.localStorage.getItem('LoggedInUserUsername'),
			name: window.localStorage.getItem('LoggedInUserName'),
			token: window.localStorage.getItem('LoggedInUserToken'),
			expiryDate: window.localStorage.getItem('LoggedInUserExpiryDate'),
		};
		try {
			if (
				LoggedInUser.username &&
				LoggedInUser.expiryDate &&
				new Date() < LoggedInUser.expiryDate
			) {
				setUser(LoggedInUser); // log in existing user
				if (location.pathname === '/') {
					navigate('/board');
				}
			} else {
				logOut(); // log out expired user
			}
		} catch (error) {
			console.error('Error while checking logged in user:', error);
			logOut();
		}
	}, []);

	return { user, setUser, logOut };
};
