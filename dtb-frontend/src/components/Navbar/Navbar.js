import './Navbar.scss';
import logo from '../../logo.png';
import profilePhoto from './profilePhoto.png';
import { useState } from 'react';

const dropdownVisibleStyle = {
  opacity: 1,
  visibility: 'visible',
};

const ProfileButton = (props) => {
  const [open, setOpen] = useState(false);

  const handleLogOut = (event) => {
    event.preventDefault();
    const userConfirms = window.confirm(
      'You will log out from this session now'
    );
    if (userConfirms) {
      props.logOut();
    } else {
    }
  };

  return (
    <>
      <a
        className="profileButton"
        onClick={(event) => {
          event.preventDefault();
          setOpen(!open);
        }}
      >
        <img src={profilePhoto} alt="user" />
      </a>
      <div
        className="profileDropdownContainer"
        style={open ? dropdownVisibleStyle : {}}
      >
        <button>Settings</button>
        <hr></hr>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </>
  );
};

const Navbar = (props) => {
  return (
    <>
      <header>
        <a href="">
          <img src={logo} alt="DTB" />
        </a>
        <ul>
          <li className="homeButton">
            <button>Home</button>
          </li>
          <li className="StatisticsButton">
            <button>Statistics</button>
          </li>
        </ul>
        <ProfileButton logOut={props.logOut} />
      </header>
    </>
  );
};

export default Navbar;
