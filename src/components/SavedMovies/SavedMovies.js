import "./SavedMovies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";


function SavedMovies() {
  return (
    <>
    <Header isLogged={true}>
      <Navigation />
    </Header>
    <SearchForm />
    <main className="movies">
      <div className="movies__container"></div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;