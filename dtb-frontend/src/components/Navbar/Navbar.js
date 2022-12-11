import './Navbar.scss';
import logo from '../../logo.png';
import profilePhoto from './profilePhoto.png';
import { useState, useEffect } from 'react';

const ProfileButton = (props) => {
	const [open, setOpen] = useState(false);

	const handleDropdownBlur = (event) => {
		event.preventDefault();
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setOpen(false);
		}
	};

	//tabIndex makes it so the div has focus and blur events and the -1 makes it not accessible by keyboard
	return (
		<div onBlur={(event) => handleDropdownBlur(event)} tabIndex="-1">
			<a
				className={open ? 'profileButtonActive' : 'profileButton'}
				onClick={(event) => {
					event.preventDefault();
					setOpen(!open);
				}}
			>
				<img src={profilePhoto} alt="user" />
			</a>
			<DropdownContainer open={open} logOut={props.logOut} />
		</div>
	);
};

const DropdownContainer = ({ open, logOut }) => {
	const [transitionProperties, setTransitionProperties] = useState({});

	const handleLogOut = (event) => {
		event.preventDefault();
		const userConfirms = window.confirm(
			'You will log out from this session now'
		);
		if (userConfirms) {
			logOut();
		} else {
		}
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
			<div className="profileDropdownContainer" style={transitionProperties}>
				<button>Settings</button>
				<hr></hr>
				<button onClick={handleLogOut}>Log out</button>
			</div>
		);
	} else {
		return <></>;
	}
};

const Navbar = (props) => {
	return (
		<>
			<header>
				<a href="">
					<img src={logo} alt="DTB" />
				</a>
				<div className="seperatingHorizontalLine"></div>
				<ul>
					<li>
						<button className="homeButton"></button>
					</li>
					<li>
						<button className="StatisticsButton"></button>
					</li>
				</ul>
				<ProfileButton logOut={props.logOut} />
			</header>
		</>
	);
};

export default Navbar;
