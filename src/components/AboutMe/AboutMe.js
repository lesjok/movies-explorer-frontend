import "./AboutMe.css";
import photo from "../../images/photo.jpg";
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <section className="component about-me">
      <h3 className="component__title">Студент</h3>
      <article className="about-me__information">
        <div className="about-me__text">   
          <h2 className="about-me__title">Виталий</h2>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
      и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <Link to="https://github.com/" className="about-me__link">GitHub</Link>
        </div>
        <img className="about-me__photo" alt="me" src={photo} />
      </article>
    </section>
  );
}

export default AboutMe;