import './App.scss';
import Navbar from './components/Navbar/Navbar.js';
import HomeBody from './components/HomeBody/HomeBody.js';
import { useState, useEffect, useRef } from 'react';
import LoginPage from './components/LoginPage/LoginPage';

const App = () => {
  const [user, setUser] = useState(null);
  // const [logs, setLogs] =useState({
  //   notes:null
  // })

  //Check if the user is logged in
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
      setUser(LoggedInUser); //log in existing user
    } else if (new Date() > LoggedInUser.expiryDate) {
      logOut(); //log out expired user
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('LoggedInUserUsername');
    window.localStorage.removeItem('LoggedInUserName');
    window.localStorage.removeItem('LoggedInUserToken');
    window.localStorage.removeItem('LoggedInUserExpiryDate');
    setUser(null);
  };

  if (user === null) {
    return (
      <div className="app">
        <LoginPage setUser={setUser} />
      </div>
    );
  } else {
    return (
      <div className="app">
        <Navbar logOut={logOut} />
        <HomeBody user={user} />
      </div>
    );
  }
};

export default App;
