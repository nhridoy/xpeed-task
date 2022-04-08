import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        Xpeed Studio
      </Link>
      <div className="links">
        <NavLink to="/">List</NavLink>
        <NavLink to="/get_form">Get Form</NavLink>
      </div>
    </nav>
  );
};

export default Header;
