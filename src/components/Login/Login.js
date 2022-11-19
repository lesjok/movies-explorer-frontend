import React from "react";
import "./Login.css";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login(props) {

  const {register, formState: { errors, isValid }, handleSubmit} = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    props.onLogin({
      email: data.email,
      password: data.password,
    })
  };

  return (
    <div className="auth">
      <Link to="/" className="auth__logo">
        <img alt="logo" src={logo} />
      </Link>
      <h1 className="auth__title">Рады видеть!</h1>
      <form className="auth__form form" onSubmit={handleSubmit(onSubmit)} name="auth">
        <label htmlFor="email" className="form__label">E-mail</label>
        <input type="email" className="input form__email" id="email" name="email" {...register('email', {
          required: "Поле обязательно к заполнению",
          pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/g,
        })} />
        <span className="input__error">
          {errors?.email?.type === "required" && <p>{errors?.email?.message || "Ошибка"}</p>}
          {errors?.email?.type === "pattern" && <p>{errors?.email?.message || "Введите корректный Email"}</p>}
        </span>
        <label htmlFor="password" className="form__label">Пароль</label>
        <input type="text" className="input form__password" id="password" name="password" {...register('password', {
          required: "Поле обязательно к заполнению",
        })} />
        <span className="input__error">
          {errors?.password?.type === "required"  && <p>{errors?.password?.message || "Ошибка"}</p>}
        </span>
        <button  disabled={!isValid} className={isValid ? 'form__btn auth__btn auth__btn_login' : 'form__btn auth__btn auth__btn_login auth__btn_disabled'} type="submit">Войти</button>
        <span className={`input__error ${props.isErrorMessage && 'input__error_show'}`}>{props.errorMessage}</span>
        <p className="auth__note">Ещё не зарегистрированы?<Link to="/signup" className="auth__link">Регистрация</Link></p>
      </form>
    </div>
  );
}

export default Login;