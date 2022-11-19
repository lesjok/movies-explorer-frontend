import "./SearchForm.css";
import { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React from "react";
function SearchForm(props) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [textDirty, setTextDirty] = React.useState(false);
  const [textError] = React.useState('Нужно ввести ключевое слово');

  useEffect(() => {
    setSearchQuery(props.searchWord);
  }, []);

  const clickHandler = () => {
    if(searchQuery.length > 0) {
      setTextDirty(false);
    } else {
      setTextDirty(true);
    }  
  }

  const searchMovies = (e) => {
    e.preventDefault();
    props.onSearch(searchQuery);
  }

  return (
    <form className="search-form" name="search" onSubmit={searchMovies}>
      <div className="search-form__container">
        {(textDirty && textError) && <span className="input__error search__error">{textError}</span>}
        <input className="search-form__input" placeholder="Фильм" type="text" name="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} required />
        <button className="search-form__btn form__btn" type="submit" onClick={clickHandler}>Поиск</button>
        <FilterCheckbox filterShortMovies={props.filterShortMovies} isActiveCheckbox={props.isActiveCheckbox} />
        <hr className="search-form__hr"></hr>
      </div>         
    </form>
  );
}

export default SearchForm;