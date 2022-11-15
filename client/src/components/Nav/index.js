import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import record from "./record-playerz.jpeg";

function Nav() {

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
        <img src={record} alt="Avatar" width={100} className="avatar" />
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav">
          <li className="mx-1">
            <Link to="/gallery">
              Gallery
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/forum">
              Forum
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">
              History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  
}

export default Nav;
