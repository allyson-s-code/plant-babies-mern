import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="app-header">
    <Link to="/home">
      <h1 className="app-header__title">Plant Babies</h1>
    </Link>
  </header>
);

export default Header;
