import "./SearchForm.css";
import { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import React from "react";
function SearchForm({ onSearch, filterShortMovies, isActiveCheckbox, searchWord }) {
  const {values, handleChange, isValid, setValues } = useFormWithValidation();
  const [clicked, setClicked] = React.useState(false);
  const [textError] = React.useState('Нужно ввести ключевое слово');

  useEffect(() => {
    setValues({
    search: searchWord || '',
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValues]);

  const searchMovies = (e) => {
    e.preventDefault();   
    if (values.search.length === 0) {
      setClicked(true);
      return !isValid;     
    } else {
      onSearch(values.search); 
      return isValid;
    } 
  }

  return (
    <form className="search-form" name="search" onSubmit={searchMovies} noValidate>
      <div className="search-form__container">
        {(!isValid && clicked) && <span className="input__error search__error">{textError}</span>}
        <input className="search-form__input" placeholder="Фильм" type="text" name="search" value={values.search} onChange={handleChange} required />
        <button className="search-form__btn form__btn" type="submit">Поиск</button>
        <FilterCheckbox filterShortMovies={filterShortMovies} isActiveCheckbox={isActiveCheckbox} disabled={!isValid} />
        <hr className="search-form__hr"></hr>
      </div>         
    </form>
  );
}

export default SearchForm;