import logo from "../../images/logo.svg";
import "./Header.css";
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className={props.isLogged ? 'header header_theme_light' : 'header header_theme_dark'}>
      <Link to="/">
        <img src={logo} alt="лого" className="header__logo" />
      </Link>
      {props.children}
    </header>
  );
}

export default Header;