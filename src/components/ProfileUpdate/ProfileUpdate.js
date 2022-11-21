import "./ProfileUpdate.css";
import React from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ProfileUpdate(props) {

  const currentUser = useContext(CurrentUserContext);

  const {register, formState: { errors, isValid }, handleSubmit} = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    if (data.name !== currentUser.name || data.email !== currentUser.email) {
      props.onUpdateUserData({
        name: data.name,
        email: data.email,
      })
    } else {
      return !isValid;
    }
  }

  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <main>
      <div className="auth profile">
        <form className="auth__form form" name="update" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="form__label">Имя</label>   
          <input type="text" className="input form__name" id="name" name="name" {...register('name', {
          required: "Поле обязательно к заполнению",
          value: currentUser.name,
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
          value: currentUser.email,
          pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/g,
          })} />
          <span className="input__error">
          {errors?.email?.type === "required" && <p>{errors?.email?.message || "Ошибка"}</p>}
          {errors?.email?.type === "pattern" && <p>{errors?.email?.message || "Введите корректный Email"}</p>}
          </span>
          <span className={`input__error ${props.isErrorMessage && 'input__error_show'}`}>{props.errorMessage}</span>
          <button type="submit" className="profile__edit" disabled={!isValid}>Сохранить</button>
          <Link to="/" className="profile__signout">Выйти из аккаунта</Link>
        </form>
      </div>
    </main>
    </>
  );
}

export default ProfileUpdate;