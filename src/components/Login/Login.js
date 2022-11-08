import "./Login.css";
import logo from '../../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Login() {
const history = useHistory();

const handleSubmit = (e) => {
  e.preventDefault();
  history.push('/profile')
};

  return (
    <div className="auth">
      <Link to="/" className="auth__logo">
        <img alt="logo" src={logo} />
      </Link>
      <h1 className="auth__title">Рады видеть!</h1>
      <form className="auth__form form" onSubmit={handleSubmit} name="auth">
        <label for="email" className="form__label">E-mail</label>
        <input type="email" className="input form__email" id="email" name="email" required/>
        <label for="password" className="form__label">Пароль</label>
        <input type="text" className="input form__password" id="password" name="password" required />
        <button className="form__btn auth__btn auth__btn_login">Войти</button>
        <span class="input__error">Что-то пошло не так...</span>
        <p className="auth__note">Ещё не зарегистрированы?<Link to="/signup" className="auth__link">Регистрация</Link></p>
      </form>
    </div>
  );
}

export default Login;