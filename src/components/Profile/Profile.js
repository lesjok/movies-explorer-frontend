import "./Profile.css";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Profile(props) {
  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <main>
      <div className="auth profile">
        <h1 className="auth__title profile__title">Привет, {props.userName}</h1>
        <div className="profile__row profile__row_top">
          <p className="profile__key">Имя</p>
          <p className="profile__value">{props.userName}</p>
        </div>
        <div className="profile__row profile__row_bottom">
          <p className="profile__key">E-mail</p>
          <p className="profile__value">{props.userEmail}</p>
        </div>
        <Link to="/profile-update" className="profile__edit">Редактировать</Link>
        <Link to="/" className="profile__signout" onClick={props.onSignOut}>Выйти из аккаунта</Link>
      </div>
    </main>
    </>
  );
}

export default Profile;