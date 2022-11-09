import "./MoviesCard.css";
import React from "react";

function MoviesCard(props) {

const [state, setState] = React.useState('movies-card__btn_status_not-checked');

function onClick(e) {
  e.preventDefault();
  setState("movies-card__btn_status_checked");
}
  return (
      <li className="movies-card">
        <img src={props.img} alt={props.name} className="movie-card__img" />
        <button className={state} type="button" onClick={onClick}>Сохранить</button>
        <div className="movie-card__info">
          <h6 className="movie-card__title">{props.name}</h6>
          <p className="movie-card__duration">{props.duration}</p>
        </div>      
      </li>
  );
}

export default MoviesCard;