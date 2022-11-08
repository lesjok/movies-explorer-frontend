import "./MoviesCardList.css";
import moviesData from '../../utils/moviesData';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

  return (
    <>
    <ul className="movies-list">
        {moviesData.map((movie) => (
          <MoviesCard
            key={movie._id}
            img={movie.img}
            name={movie.name}
            duration={movie.duration}
          />
        ))}
    </ul>
    <button className="btn-show-more">Ещё</button>
    </>
  );
}

export default MoviesCardList;