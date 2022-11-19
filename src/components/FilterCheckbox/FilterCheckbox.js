import "./FilterCheckbox.css";
import React from "react";

function FilterCheckbox(props) {

  return (
    <>
    <div className="filter-checkbox" name="filter" method="get">
      <label className="filter-checkbox__label">
	      <input type="checkbox" className="filter-checkbox__input" name="filter" onChange={props.filterShortMovies} checked={props.isActiveCheckbox}/>
	      <span className="filter-checkbox__span"></span>
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
    </>
  );
}

export default FilterCheckbox;