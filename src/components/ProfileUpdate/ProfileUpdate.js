import "./ProfileUpdate.css";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function ProfileUpdate() {
  const handleSubmit = (e) => {
  e.preventDefault();
}
  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <main>
      <div className="auth profile">
        <form className="auth__form form" name="update" onSubmit={handleSubmit} method="post">
          <label for="name" className="form__label">Имя</label>
          <input type="text" className="input form__name" id="name" name="name" required />
          <label for="email" className="form__label">E-mail</label>
          <input type="email" className="input form__email" id="email" name="email" required />
        </form>
        <span class="input__error">Что-то пошло не так...</span>
        <Link to="/profile" className="profile__edit">Сохранить</Link>
        <Link to="/" className="profile__signout">Выйти из аккаунта</Link>
      </div>
    </main>
    </>
  );
}

export default ProfileUpdate;