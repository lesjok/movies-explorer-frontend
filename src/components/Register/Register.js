import "./Register.css";
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Register(props) {

  const {register, formState: { errors, isValid }, handleSubmit } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    props.onRegister(data);
  };

  return (
    <div className="auth register">
      <Link to="/" className="auth__logo">
        <img alt="logo" src={logo} />
      </Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__form form" onSubmit={handleSubmit(onSubmit)} name="auth">
        <label htmlFor="name" className="form__label">Имя</label>
        <input type="text" className="input form__name" id="name" name="name" {...register('name', {
          required: "Поле обязательно к заполнению",
          minLength: 2,
          maxLength: 30,
        })} />
        <span className="input__error">
          {errors?.name?.type === "required" && <p>{errors?.name?.message || "Ошибка"}</p>}
          {errors?.name?.type === "minLength" && <p>{errors?.name?.message || "Введите минимум 2 символа"}</p>}
          {errors?.name?.type === "maxLength" && <p>{errors?.name?.message || "Можно ввести максимум 30 символов"}</p>}
        </span>
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
        <button disabled={!isValid} className={isValid ? "form__btn register__btn" : "form__btn register__btn auth__btn_disabled"} type="submit">Зарегистрироваться</button>
        <span className={`input__error ${props.isErrorMessage && 'input__error_show'}`}>
          {props.errorMessage}</span>
        <p className="auth__note">Уже зарегистрированы?<Link to="/signin" className="auth__link">Войти</Link></p>
      </form>
    </div>
  );
}

export default Register;