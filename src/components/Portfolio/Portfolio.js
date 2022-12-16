import "./Portfolio.css";
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav>
        <ul className="portfolio__list list">
          <li className="list__item item">
            <a href="https://visionary-panda-dc9de0.netlify.app/" className="item__link" target="blank">
              <p className="item__name">Статичный сайт</p>
              <img src={arrow} className="item__arrow" alt="arrow" />
            </a>         
          </li>
          <li className="list__item item">
            <a href="https://lesjok.github.io/russian-travel/" className="item__link" target="blank">
              <p className="item__name">Адаптивный сайт</p>
              <img src={arrow} className="item__arrow" alt="arrow" />
            </a>       
          </li>
          <li className="list__item item">
            <a href="http://1149487-cj55507.tw1.ru/" className="item__link" target="blank">
              <p className="item__name">Одностраничное приложение</p>
              <img src={arrow} className="item__arrow" alt="arrow" /> 
            </a>    
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;