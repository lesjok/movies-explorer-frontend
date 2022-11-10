import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import burgerIcon from '../../images/burger.svg';
import closeIcon from '../../images/close.svg';
import React from 'react'

function Navigation() {
  const [nav, setNav] = React.useState(false);

  return (
    <>
    <nav className="navigation">
      <ul className="navigation__list">
        <div className="navigation__list_left">
          <li className="navigation__item">
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
          </li>
        </div>
        <div className="navigation__list_right">
          <li className="navigation__item">
            <Link to="/profile" className="navigation__link navigation__link_accaunt">Аккаунт</Link>
          </li>
        </div>
      </ul>
      <button onClick={() => {
        setNav(!nav)
      }} className="navigation__burger" type="button">
        <img src={burgerIcon} alt="burger" />
      </button>
    </nav>
    <nav className={nav ? 'burger-menu active' : 'burger-menu'}>
      <ul className="burger-menu__container">
        <button onClick={() => {
          setNav(!nav)
        }} className={nav ? 'navigation__burger_close active' : 'navigation__burger_close'}>
          <img src={closeIcon} alt="close" />
        </button>
        <li>
          <NavLink to="/profile" className="burger-menu__link" activeClassName="burger-menu__link_active">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="burger-menu__link" activeClassName="burger-menu__link_active">Фильмы</NavLink>
        </li>
        <li>
          <NavLink to="/saved-movies" className="burger-menu__link" activeClassName="burger-menu__link_active">Сохранённые фильмы</NavLink>
        </li>
        <li className="navigation__item burger-menu__link_accaunt">
          <Link to="/profile" className="navigation__link">Аккаунт</Link>
        </li>
      </ul>
    </nav>
    </>
  );
}

export default Navigation;