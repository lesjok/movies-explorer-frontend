import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <form className="search-form" name="search" required>
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Фильм" type="text" name="search" />
        <button className="search-form__btn form__btn" type="submit">Поиск</button>
        <FilterCheckbox />
        <hr className="search-form__hr"></hr>
      </div>         
    </form>
  );
}

export default SearchForm;