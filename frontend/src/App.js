import './styles/App.scss';
import { useState, useEffect, useCallback, createContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import LoginPage from './components/LoginPage/LoginPage';
import Statistics from './components/Statistics/Statistics';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

/*
this is the root component that is first mounted

this component conditionally renders either the login page
or logs the user into the homepage of the actual application
*/

export const UserContext = createContext();

const App = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	// clear local storage + component cleanup
	const logOut = useCallback(() => {
		window.localStorage.removeItem('LoggedInUserUsername');
		window.localStorage.removeItem('LoggedInUserName');
		window.localStorage.removeItem('LoggedInUserToken');
		window.localStorage.removeItem('LoggedInUserExpiryDate');
		setUser(null);
		navigate('/login');
	}, []);

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
			if (location.pathname === '/') {
				navigate('/board');
			}
		} else if (new Date() > LoggedInUser.expiryDate) {
			logOut(); // log out expired user
		} else navigate('/login');
	}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			<div
				className="app"
				onContextMenu={(e) => {
					e.preventDefault();
				}}
			>
				{user ? <Navbar logOut={logOut} /> : <></>}
				<Routes>
					{user ? (
						<>
							<Route path="/board" element={<Board />} />
							<Route path="/statistics" element={<Statistics />} />
						</>
					) : (
						<Route path="/login" element={<LoginPage setUser={setUser} />} />
					)}
				</Routes>
			</div>
		</UserContext.Provider>
	);
};

export default App;
