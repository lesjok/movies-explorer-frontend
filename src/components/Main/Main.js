import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <>  
      <Header isLogged={false}>
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
      </Header>
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