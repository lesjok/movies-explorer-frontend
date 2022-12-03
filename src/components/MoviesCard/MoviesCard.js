import "./MoviesCard.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function MoviesCard(props) {

const [buttonState, setButtonState] = React.useState('movies-card__btn_status_not-checked');
const [cardState, setCardState] = React.useState("movies-card");

const currentUser = useContext(CurrentUserContext);
const isOwn = (props.path === '/movies') ? props.moviesSavedCards.some(i => (i.owner === currentUser._id && i.movieId === props.movie.id)) : props.owner === currentUser._id;

const movie = (props.path === '/movies') ? {
  country: props.country,
  director: props.director,
  duration: props.duration,
  year: props.year,
  description: props.description,
  image: `https://api.nomoreparties.co/${props.movie.image.url}`,
  trailerLink: props.trailerLink,
  nameRU: props.nameRU,
  nameEN: props.nameEN,
  createdAt: props.created_at,
  movieId: props.movie.id,
  thumbnail: `https://api.nomoreparties.co/${props.movie.image.formats.thumbnail.url}`
} : {
  country: props.country,
  director: props.director,
  duration: props.duration,
  year: props.year,
  description: props.description,
  image: props.movie.image,
  trailerLink: props.trailerLink,
  nameRU: props.nameRU,
  nameEN: props.nameEN,
  createdAt: props.created_at,
  movieId: props.id,
  owner: props.owner,
  _id: props.movieId,
  thumbnail: props.thumbnail,
}

function onAddClick() {
  props.onSaved(movie);
  setButtonState("movies-card__btn_status_checked");
}
function onDeleteClick() {
  props.onSaved(movie);
  // setCardState("movies-card__invisible");
}

const buttonMovies = (isOwn ? "movies-card__btn_status_checked" : buttonState);
const buttonSaveMovies = ("movies-card_close");

  return (
    <li className={cardState}>
      <a href={props.trailerLink} target="_blank" rel="noreferrer">
        <img src={props.path === '/movies' ? `https://api.nomoreparties.co/${props.movie.image.url}` : `${props.movie.image}`} alt={props.thumbnail} className="movie-card__img" />
      </a>     
      <button className={(props.path === '/movies') ? buttonMovies : buttonSaveMovies} type="button" onClick={props.path === '/saved-movies' ? onDeleteClick : onAddClick} disabled={isOwn && props.path === '/movies'}>Сохранить</button>
      <div className="movie-card__info">
        <h6 className="movie-card__title">{props.nameRU}</h6>
        <p className="movie-card__duration">{`${Math.floor(props.duration / 60)}ч ${(props.duration % 60)}м`}</p>
      </div>      
    </li>
  );
}

export default MoviesCard;