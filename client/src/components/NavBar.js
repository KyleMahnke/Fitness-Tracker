import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const NavBar = ({}) => {
  return (
    <nav className="navbar">
      <h1 className="title">Riz, Kyle and Mark's Fitness Tracker!</h1>
      <div className="links">
        <Link to="/" className="navLinks">
          Home
        </Link>
        <Link>All Routines</Link>
        <Link>My Routines</Link>
        <Link>Activities</Link>
        <Link>Login</Link>
        <Link to="/register" className="navLinks">
          Register
        </Link>
        <Link>Logout</Link>
      </div>
    </nav>
  );
};

export default NavBar;
