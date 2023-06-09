import 'styles/Navbar.scss';
import { useState, useEffect, useCallback, useRef } from 'react';
import Logo from 'components/miscellaneous/Logo/Logo';
import { useContext } from 'react';
import { UserContext } from 'utils/useUser';
import SettingsModal from 'components/miscellaneous/Settings/Settings';

const ModalPortal = ({ settingsOpen, setSettingsOpen }) => {
	const [transitionProperties, setTransitionProperties] = useState({});

	/* 
	a small timeout between the creation of the form and then the adding the style of the form
	for the transition to take effect.
	if this dosent exist then the values visibility and opacity dont change thus no transition
	effect occurs.
	*/
	useEffect(() => {
		if (!settingsOpen) {
			setTransitionProperties({});
		} else {
			setTimeout(() => {
				setTransitionProperties({ visibility: 'visible', opacity: 1 });
			}, 1);
		}
	}, [settingsOpen]);

	const handleBlur = (event) => {
		event.preventDefault();
		setSettingsOpen(false);
	};

	// tabIndex makes it so the div has focus and blur events and the -1 makes it not accessible by keyboard
	if (settingsOpen) {
		return (
			<div
				className="baseModal"
				style={transitionProperties}
				onClick={handleBlur}
			>
				<SettingsModal setSettingsOpen={setSettingsOpen} />
			</div>
		);
	} else {
		return <></>;
	}
};

const ProfileButton = ({ setSettingsOpen, user, logOut }) => {
	const [open, setOpen] = useState(false);

	const handleDropdownBlur = (event) => {
		event.preventDefault();
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setOpen(false);
		}
	};

	// tabIndex makes it so the div has focus and blur events and the -1 makes it not accessible by keyboard
	return (
		<div
			className="profileButtonContainer"
			onBlur={(event) => handleDropdownBlur(event)}
			tabIndex="-1"
		>
			<button
				className={open ? 'profileButton profileButtonActive' : 'profileButton'}
				onClick={(event) => {
					event.preventDefault();
					setOpen(!open);
				}}
			>
				<img src={`/api/avatar/${user.id}.jpeg`} alt="user" />
			</button>
			<DropdownContainer
				open={open}
				setOpen={setOpen}
				setSettingsOpen={setSettingsOpen}
				logOut={logOut}
			/>
		</div>
	);
};

const DropdownContainer = ({ open, setOpen, setSettingsOpen, logOut }) => {
	const [transitionProperties, setTransitionProperties] = useState({});

	const handleLogOut = (event) => {
		event.preventDefault();
		const userConfirms = window.confirm(
			'You will log out from this session now'
		);
		if (userConfirms) logOut();
	};

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				setTransitionProperties({ opacity: 1, visibility: 'visible' });
			}, 1);
		} else {
			setTransitionProperties({});
		}
	}, [open]);

	if (open) {
		return (
			<div className="profileDropdown" style={transitionProperties}>
				<button
					onClick={() => {
						setSettingsOpen(true);
						setOpen(false);
					}}
				>
					Settings
				</button>
				<hr></hr>
				<button onClick={handleLogOut}>Log out</button>
			</div>
		);
	} else {
		return <></>;
	}
};

const Navbar = ({ settingsOpen, setSettingsOpen }) => {
	const { user, logOut } = useContext(UserContext);

	return (
		<nav className="navigationBar">
			<a href="." className="logoImageHolder">
				<Logo />
			</a>
			<div className="separatingHorizontalLine"></div>
			<ul>
				<li>
					<a className="homeButton" href="./board">
						<svg
							width="260"
							height="248"
							viewBox="0 0 260 248"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M121.34 3.28744C123.725 1.16966 126.804 0 129.993 0C133.183 0 136.262 1.16966 138.646 3.28744L255.93 107.54C258.382 109.869 259.832 113.06 259.975 116.438C260.118 119.817 258.942 123.118 256.695 125.646C254.449 128.173 251.308 129.728 247.936 129.983C244.564 130.237 241.225 129.171 238.625 127.009L234.246 123.139V221.527C234.246 228.439 231.5 235.069 226.612 239.957C221.724 244.844 215.095 247.59 208.183 247.59H51.804C44.8916 247.59 38.2623 244.844 33.3746 239.957C28.4868 235.069 25.7408 228.439 25.7408 221.527V123.139L21.3622 127.009C18.7619 129.171 15.4231 130.237 12.0512 129.983C8.67924 129.728 5.53822 128.173 3.29166 125.646C1.04511 123.118 -0.131066 119.817 0.0116169 116.438C0.1543 113.06 1.60466 109.869 4.05632 107.54L121.34 3.28744ZM51.804 99.9426V221.527H90.8987V156.369C90.8987 152.913 92.2717 149.598 94.7155 147.155C97.1594 144.711 100.474 143.338 103.93 143.338H156.057C159.513 143.338 162.827 144.711 165.271 147.155C167.715 149.598 169.088 152.913 169.088 156.369V221.527H208.183V99.9556L129.993 30.4583L51.804 99.9556V99.9426ZM143.025 221.527V169.401H116.962V221.527H143.025Z" />
						</svg>
					</a>
				</li>
				<li>
					<a className="statisticsButton" href="./statistics">
						<svg
							width="260"
							height="260"
							viewBox="0 0 260 260"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M0 28.8874C0 21.226 3.04349 13.8784 8.46093 8.46093C13.8784 3.04349 21.226 0 28.8874 0H231.099C238.761 0 246.108 3.04349 251.526 8.46093C256.943 13.8784 259.987 21.226 259.987 28.8874V231.099C259.987 238.761 256.943 246.108 251.526 251.526C246.108 256.943 238.761 259.987 231.099 259.987H28.8874C21.226 259.987 13.8784 256.943 8.46093 251.526C3.04349 246.108 0 238.761 0 231.099V28.8874ZM231.099 28.8874H28.8874V231.099H231.099V28.8874ZM129.993 57.7748C133.824 57.7748 137.498 59.2966 140.207 62.0053C142.915 64.714 144.437 68.3878 144.437 72.2186V187.768C144.437 191.599 142.915 195.273 140.207 197.981C137.498 200.69 133.824 202.212 129.993 202.212C126.163 202.212 122.489 200.69 119.78 197.981C117.071 195.273 115.55 191.599 115.55 187.768V72.2186C115.55 68.3878 117.071 64.714 119.78 62.0053C122.489 59.2966 126.163 57.7748 129.993 57.7748V57.7748ZM187.768 86.6623C191.599 86.6623 195.273 88.184 197.981 90.8927C200.69 93.6015 202.212 97.2753 202.212 101.106V187.768C202.212 191.599 200.69 195.273 197.981 197.981C195.273 200.69 191.599 202.212 187.768 202.212C183.938 202.212 180.264 200.69 177.555 197.981C174.846 195.273 173.325 191.599 173.325 187.768V101.106C173.325 97.2753 174.846 93.6015 177.555 90.8927C180.264 88.184 183.938 86.6623 187.768 86.6623V86.6623ZM72.2186 115.55C76.0493 115.55 79.7231 117.071 82.4318 119.78C85.1405 122.489 86.6623 126.163 86.6623 129.993V187.768C86.6623 191.599 85.1405 195.273 82.4318 197.981C79.7231 200.69 76.0493 202.212 72.2186 202.212C68.3878 202.212 64.714 200.69 62.0053 197.981C59.2966 195.273 57.7748 191.599 57.7748 187.768V129.993C57.7748 126.163 59.2966 122.489 62.0053 119.78C64.714 117.071 68.3878 115.55 72.2186 115.55Z" />
						</svg>
					</a>
				</li>
			</ul>
			<ProfileButton
				setSettingsOpen={setSettingsOpen}
				user={user}
				logOut={logOut}
			/>
			<ModalPortal
				settingsOpen={settingsOpen}
				setSettingsOpen={setSettingsOpen}
				user={user}
			/>
		</nav>
	);
};

export default Navbar;

/*

You could make the code more readable by splitting it into smaller, more concise components.

You could add a prop-types library to add type checking to your components' props.

The useEffect hook in the DropdownContainer component could use a more specific dependency array to avoid unnecessary re-renders.

Instead of using an inline style object to set the transition properties, you could create a CSS class and toggle it based on the state of the dropdown.

You could add accessibility features to the code, such as adding a label to the profile button and making sure the dropdown is keyboard-accessible.

*/
