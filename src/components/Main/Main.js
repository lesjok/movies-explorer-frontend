import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function Main(props) {
  return (
    <>   
    {props.loggedIn ? 
    <Header>
      <nav className="nav">
        <li className="nav__item">
          <Link to="/movies" className="nav__signup">
            Фильмы
          </Link>     
        </li>
        <li className="nav__item">
          <Link to="/saved-movies" className="nav__signup">
            Сохраненные фильмы
          </Link> 
        </li>
        <li className="nav__item">
          <Link to="/profile" className="nav__signin">
            Аккаунт
          </Link>     
        </li>
      </nav>
    </Header>
    : 
    <Header>
      <nav className="nav">
        <li className="nav__item">
          <Link to="/signup" className="nav__signup">
            Регистрация
          </Link>     
        </li>
        <li className="nav__item">
          <Link to="/signin" className="nav__signin">
            Войти
          </Link> 
        </li>
      </nav>
    </Header>}
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
    <Footer />
    </>
  );
}

export default Main;