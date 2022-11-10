import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__date">© 2020</p>
        <ul className="footer__social">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="blank">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/" target="blank">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;