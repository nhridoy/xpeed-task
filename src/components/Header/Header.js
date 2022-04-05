import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav>
      <Link to="/">List</Link>
      <Link to="/get_form">Get Form</Link>
    </nav>
  );
};

export default Header;
