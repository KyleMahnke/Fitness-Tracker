import React from "react";
import {  Link, useHistory } from "react-router-dom";

const NavBar = ({isLoggedIn, setIsLoggedIn}) => {
  const history = useHistory()
  const handleClick = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    history.push("/")
  }
  return (
    <nav className="navbar">
      <h1 className="title">Riz, Kyle and Mark's Fitness Tracker!</h1>
      <div className="links">
        <Link to="/" className="navLinks">
          Home
        </Link>
        <Link>All Routines</Link>
        <Link>Activities</Link>
        {isLoggedIn ? (
          <>
            <Link>My Routines</Link>
            <Link to = "/" onClick={handleClick} >Logout</Link>
          </>
        ) : (
          <>
        <Link to="/login">Login</Link>
        <Link to="/register" className="navLinks">
          Register
        </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
