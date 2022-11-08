import "./Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__date">© 2020</p>
        <ul className="footer__social">
          <li>
            <Link className="footer__link" to="https://practicum.yandex.ru/" target="blank">
              Яндекс.Практикум
            </Link>
          </li>
          <li>
            <Link className="footer__link" to="https://github.com/" target="blank">
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;