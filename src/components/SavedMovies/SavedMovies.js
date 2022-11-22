import "./SavedMovies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {

  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <SearchForm onSearch={props.searchMovies} filterShortMovies={props.filterShortMovies} isActiveCheckbox={props.isActiveCheckbox} searchWord={props.searchWord} />
    <main className="movies">
      <div className="movies__container">
        {props.notFoundMovie ? <p className="movies__not-found">Ничего не найдено</p> : <MoviesCardList moviesCardList={props.isSearched ? props.searchSaveMovies : props.moviesSavedCards} onSaved={props.handleSavedMovies} path={props.path} preloader={props.preloader} addCard={props.addCard} />}
      </div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;