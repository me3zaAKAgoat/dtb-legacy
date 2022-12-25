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
		<nav className="navigationBar">
			<a href="">
				<img src={logo} alt="DTB" />
			</a>
			<div className="seperatingHorizontalLine"></div>
			<ul>
				<li>
					<button className="homeButton">
						<svg
							width="39"
							height="41"
							viewBox="0 0 39 41"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M37.702 16.6538L21.0154 0.602531C20.8142 0.41161 20.5748 0.260071 20.3111 0.156657C20.0473 0.0532427 19.7645 0 19.4787 0C19.193 0 18.9102 0.0532427 18.6464 0.156657C18.3827 0.260071 18.1433 0.41161 17.9421 0.602531L1.25553 16.6742C0.851756 17.0573 0.532867 17.5121 0.317377 18.0121C0.101887 18.5121 -0.005908 19.0475 0.00024968 19.5871V36.6568C-0.00142725 37.6996 0.421793 38.7033 1.18276 39.4611C1.94372 40.219 2.98449 40.6734 4.09073 40.7308H34.8668C35.973 40.6734 37.0138 40.219 37.7747 39.4611C38.5357 38.7033 38.9589 37.6996 38.9572 36.6568V19.5871C38.959 18.4931 38.5088 17.4413 37.702 16.6538ZM15.1502 36.6568V24.435H23.8073V36.6568H15.1502ZM34.6287 36.6568H28.1359V22.3981C28.1359 21.8578 27.9078 21.3397 27.502 20.9577C27.0961 20.5757 26.5456 20.3611 25.9716 20.3611H12.9859C12.4119 20.3611 11.8614 20.5757 11.4555 20.9577C11.0497 21.3397 10.8216 21.8578 10.8216 22.3981V36.6568H4.3288V19.5056L19.4787 4.94127L34.6287 19.5871V36.6568Z"
								fill="#D9D9D9"
							/>
						</svg>
					</button>
				</li>
				<li>
					<button className="StatisticsButton">
						<svg
							width="39"
							height="37"
							viewBox="0 0 39 37"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M21.2369 18.7218H37.1537C37.4034 18.7209 37.6505 18.769 37.8794 18.863C38.1082 18.957 38.3137 19.0949 38.4828 19.2679C38.6518 19.4408 38.7807 19.645 38.8613 19.8675C38.9418 20.0899 38.9722 20.3258 38.9504 20.5599C38.5611 24.0104 37.142 27.2868 34.8572 30.0101C32.5724 32.7334 29.5152 34.7924 26.0392 35.949C22.5631 37.1055 18.8103 37.3124 15.2145 36.5457C11.6188 35.779 8.32714 34.07 5.72015 31.6163C3.11316 29.1627 1.29735 26.0646 0.482714 22.6804C-0.331923 19.2962 -0.112113 15.7641 1.11673 12.4926C2.34556 9.221 4.53323 6.34364 7.42675 4.19322C10.3203 2.0428 13.8014 0.707168 17.4677 0.340772C17.7195 0.314852 17.9743 0.339345 18.2153 0.412643C18.4564 0.485941 18.6783 0.606387 18.8664 0.766077C19.0545 0.925768 19.2046 1.12109 19.3069 1.33923C19.4091 1.55738 19.4612 1.7934 19.4597 2.03182V17.0491C19.4597 17.2688 19.5057 17.4863 19.595 17.6892C19.6843 17.8921 19.8152 18.0765 19.9802 18.2319C20.1453 18.3872 20.3412 18.5104 20.5568 18.5944C20.7724 18.6785 21.0035 18.7218 21.2369 18.7218ZM37.3295 15.6521H24.3031C23.8732 15.6521 23.4609 15.4914 23.1569 15.2053C22.8529 14.9192 22.6821 14.5311 22.6821 14.1265V1.86638C22.6821 1.46176 22.8529 1.07371 23.1569 0.787604C23.4609 0.501494 23.8732 0.340759 24.3031 0.340759C28.1878 0.340759 31.9134 1.79318 34.6603 4.37851C37.4072 6.96384 38.9504 10.4703 38.9504 14.1265C38.9504 14.5311 38.7796 14.9192 38.4757 15.2053C38.1717 15.4914 37.7594 15.6521 37.3295 15.6521Z"
								fill="#D9D9D9"
							/>
						</svg>
					</button>
				</li>
			</ul>
			<ProfileButton logOut={props.logOut} />
		</nav>
	);
};

export default Navbar;
