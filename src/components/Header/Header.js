import logo from "../../images/logo.svg";
import "./Header.css";
import React from 'react'; 

function Header(props) {
  return (
    <header className={props.isLogged ? 'header header_theme_light' : 'header header_theme_dark'}>
      <a href="/">
        <img src={logo} alt="лого" className="header__logo" />
      </a>
      {props.children}
    </header>
  );
}

export default Header;