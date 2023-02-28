import 'styles/App.scss';
import { createContext } from 'react';
import Navbar from 'components/miscellaneous/Navbar/Navbar';
import Board from 'components/Board/Board';
import LoginPage from 'components/LoginPage/LoginPage';
import Statistics from 'components/Statistics/Statistics';
import { Route, Routes } from 'react-router-dom';
import { UserContext, useUser } from 'utils/useUser';

/*
this is the root component that is first mounted

this component conditionally renders either the login page
or logs the user into the homepage of the actual application
*/

const App = () => {
	const { user, setUser, logOut } = useUser();

	return (
		<UserContext.Provider value={{ user, setUser, logOut }}>
			<div
				className="app"
				onContextMenu={(e) => {
					e.preventDefault();
				}}
			>
				{user ? <Navbar /> : <></>}
				<Routes>
					{user ? (
						<>
							<Route path="/board" element={<Board />} />
							<Route path="/statistics" element={<Statistics />} />
						</>
					) : (
						<Route path="/login" element={<LoginPage />} />
					)}
				</Routes>
			</div>
		</UserContext.Provider>
	);
};

export default App;
