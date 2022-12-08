import "./Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies(props) {
  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <SearchForm onSearch={props.searchMovies} filterShortMovies={props.filterShortMovies} isActiveCheckbox={props.isActiveCheckbox} searchWord={props.searchWord} />
      <div className="movies">
        <div className="movies__container">  
          {props.notFoundMovie ? <p className="movies__not-found">Ничего не найдено</p> : <MoviesCardList moviesCardList={props.moviesCards} preloader={props.preloader} onSaved={props.handleSavedMovies} path={props.path} btnElse={props.btnElse} addCard={props.addCard} moviesSavedCards={props.moviesSavedCards} notFoundMovie={props.notFoundMovie} />}    
        </div>
      </div>
    <Footer />
    </>
  );
}

export default Movies;