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
  const [isValidInput, setIsValidInput] = React.useState(false);
  const {register, formState: { errors, isValid }, handleSubmit, getValues} = useForm({
    mode: "onChange"
  });

function handleChange() {
  if (getValues("name") !== currentUser.name || getValues("email") !== currentUser.email) {
    setIsValidInput(true);
    return isValid;
  } else {
    setIsValidInput(false);
    return !isValid;
  }
}
React.useEffect(() => {
  handleChange();
}, [])


const onSubmit = (data) => {
  if (data.name !== currentUser.name || data.email !== currentUser.email) {
    props.onUpdateUserData({
      name: data.name,
      email: data.email,
    });
    setIsValidInput(false);
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
          <input type="text" className="input form__name" id="name"  name="name" {...register('name', {
          required: "Поле обязательно к заполнению",
          onChange: (e) => {handleChange(e)},
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
          <input type="email" className="input form__email" id="email" onChange={handleChange} name="email" {...register('email', {
          required: "Поле обязательно к заполнению",
          onChange: (e) => {handleChange(e)},
          value: currentUser.email,
          pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/g,
          })} />
          <span className="input__error">
          {errors?.email?.type === "required" && <p>{errors?.email?.message || "Ошибка"}</p>}
          {errors?.email?.type === "pattern" && <p>{errors?.email?.message || "Введите корректный Email"}</p>}
          </span>
          <span className={`input__error ${props.isErrorMessage && 'input__error_show'}`}>{props.errorMessage}</span>
          <button type="submit" className={`${!isValidInput ? 'profile__edit profile__edit_disabled' : 'profile__edit'}`} disabled={!isValid}>Сохранить</button>
          <Link to="/" className="profile__signout">Выйти из аккаунта</Link>
        </form>
      </div>
    </main>
    </>
  );
}

export default ProfileUpdate;