import "./FilterCheckbox.css";


function FilterCheckbox() {
  return (
    <>
    <form className="filter-checkbox" name="filter" method="get">
      <label class="filter-checkbox__label">
	      <input type="checkbox" className="filter-checkbox__input" name="filter" />
	      <span class="filter-checkbox__span"></span>
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </form>
    </>
  );
}

export default FilterCheckbox;