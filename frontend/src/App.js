import 'styles/App.scss';
import Navbar from 'components/miscellaneous/Navbar/Navbar';
import Board from 'components/Board/Board';
import LoginPage from 'components/LoginPage/LoginPage';
import Statistics from 'components/Statistics/Statistics';
import SignupPage from 'components/SignupPage/SignupPage';
import { Route, Routes } from 'react-router-dom';
import { UserContext, useUser } from 'utils/useUser';
import { useState } from 'react';
import { isDebouncingContext, useIsDebouncing } from 'utils/useDebounce';

/*
this is the root component that is first mounted

this component conditionally renders either the login page
or logs the user into the homepage of the actual application
*/

const App = () => {
	const { user, setUser, logOut } = useUser();
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [isDebouncing, setIsDebouncing] = useIsDebouncing();

	return (
		<isDebouncingContext.Provider value={{ isDebouncing, setIsDebouncing }}>
			<UserContext.Provider value={{ user, setUser, logOut }}>
				<div
					className="app"
					onContextMenu={(e) => {
						e.preventDefault();
					}}
				>
					{user ? (
						<Navbar
							settingsOpen={settingsOpen}
							setSettingsOpen={setSettingsOpen}
						/>
					) : (
						<></>
					)}
					<Routes>
						{user ? (
							<>
								<Route
									path="/board"
									element={<Board setSettingsOpen={setSettingsOpen} />}
								/>
								<Route path="/statistics" element={<Statistics />} />
							</>
						) : (
							<>
								<Route path="/login" element={<LoginPage />} />
								<Route path="/signup" element={<SignupPage />} />
							</>
						)}
					</Routes>
				</div>
			</UserContext.Provider>
		</isDebouncingContext.Provider>
	);
};

export default App;
