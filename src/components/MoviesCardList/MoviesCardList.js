import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  return (
    <>
    {props.preloader ? <Preloader /> : 
      <ul className="movies-list">
        {props.moviesCardList.map((movie) => (
          <MoviesCard
            onSaved={props.onSaved}
            movie={movie}
            key={movie.id || movie._id}
            nameRU={movie.nameRU}
            country={movie.country}
            director={movie.director}
            duration={movie.duration}
            year={movie.year}
            description={movie.description}
            trailerLink={movie.trailerLink}
            owner={movie.owner}
            nameEN={movie.nameEN}
            movieId={movie._id}
            path={props.path}
            thumbnail={props.thumbnail}
            moviesSavedCards={props.moviesSavedCards}
          />
        ))}
    </ul>}
    {props.btnElse && <button className="btn-show-more" type="button" onClick={props.addCard}>Ещё</button>}
    </>
  );
}

export default MoviesCardList;