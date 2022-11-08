import "./Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <SearchForm />
    <div className="movies">
      <div className="movies__container">    
        <MoviesCardList />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Movies;