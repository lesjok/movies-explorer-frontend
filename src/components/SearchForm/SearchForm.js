import "./SearchForm.css";
import { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import React from "react";
function SearchForm({ onSearch, filterShortMovies, isActiveCheckbox, searchWord  = ''}) {
const {values, handleChange, errors, isValid, setValues } = useFormWithValidation();
  // const [clicked, setClicked] = React.useState(false);
  // const [textError] = React.useState('Нужно ввести ключевое слово');
  const [error, setError] = React.useState('');

  useEffect(() => {
    setValues({
    search: searchWord,
  });
  }, [setValues, searchWord]);

  const changeHandler = () => {
    // setClicked(true);
  if (searchWord.length !== 0) setError('');
  }

  const searchMovies = (e) => {
    e.preventDefault();
    onSearch(values.search);
    if (values.search.length === 0) {
    setError('Нужно ввести ключевое слово');
    return;
  }
  }

  return (
    <form className="search-form" name="search" onSubmit={searchMovies}>
      <div className="search-form__container">
        {values.search.length === 0 && <span className="input__error search__error">{error}</span>}
        <input className="search-form__input" placeholder="Фильм" type="text" name="search" value={values.search} onChange={changeHandler}/>
        <button className="search-form__btn form__btn" type="submit" disabled={values.search.length === 0}>Поиск</button>
        <FilterCheckbox filterShortMovies={filterShortMovies} isActiveCheckbox={isActiveCheckbox} />
        <hr className="search-form__hr"></hr>
      </div>         
    </form>
  );
}

export default SearchForm;