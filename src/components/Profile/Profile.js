import "./Profile.css";
import React from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  
  React.useEffect(() => {
    props.setCurrentUser(currentUser);
  }, []);

  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <main>
      <div className="auth profile">
        <h1 className="auth__title profile__title">Привет, {currentUser.name}</h1>
        <div className="profile__row profile__row_top">
          <p className="profile__key">Имя</p>
          <p className="profile__value">{currentUser.name}</p>
        </div>
        <div className="profile__row profile__row_bottom">
          <p className="profile__key">E-mail</p>
          <p className="profile__value">{currentUser.email}</p>
        </div>
        <Link to="/profile-update" className="profile__edit">Редактировать</Link>
        <Link to="/" className="profile__signout" onClick={props.onSignOut}>Выйти из аккаунта</Link>
      </div>
    </main>
    </>
  );
}

export default Profile;