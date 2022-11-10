import "./Register.css";
import logo from '../../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Register() {

const history = useHistory();

const handleSubmit = (e) => {
  e.preventDefault();
  history.push('/signin');
};

  return (
    <div className="auth register">
      <Link to="/" className="auth__logo">
        <img alt="logo" src={logo} />
      </Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__form form" onSubmit={handleSubmit} name="auth">
        <label for="name" className="form__label">Имя</label>
        <input type="text" className="input form__name" id="name" name="name" required/>
        <label for="email" className="form__label">E-mail</label>
        <input type="email" className="input form__email" id="email" name="email" required />
        <label for="password" className="form__label">Пароль</label>
        <input type="text" className="input form__password" id="password" name="password" required />
        <button className="form__btn register__btn">Зарегистрироваться</button>
        <span class="input__error">Что-то пошло не так...</span>
        <p className="auth__note">Уже зарегистрированы?<Link to="/signin" className="auth__link">Войти</Link></p>
      </form>
    </div>
  );
}

export default Register;