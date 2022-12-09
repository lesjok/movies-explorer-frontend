import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="component about-me">
      <h3 className="component__title">Студент</h3>
      <article className="about-me__information">
        <div className="about-me__text">   
          <h2 className="about-me__title">Олеся</h2>
          <p className="about-me__subtitle">Фронтенд-разработчик, 26 лет</p>
          <p className="about-me__description">Я родилась и живу в Липецке, закончила ВГМУ им.Н.Н.Бурденко. Я люблю слушать музыку, а ещё увлекаюсь настольным теннисом. Недавно начала кодить. В 2021 обучалась на курсах в «Негосударственном образовательном частном учреждении высшего образования МФПУ Синергия» по программе "Разработка сайтов: верстка CSS и программирование". После этого прошла курсы от "Яндекс.Практикум" по программе "веб-разработка", сейчас в активном поиске работы. Очень хочется применить свои знания на практике.</p>
          <a href="https://github.com/lesjok" className="about-me__link" target="blank">GitHub</a>
        </div>
        <img className="about-me__photo" alt="me" src={photo} />
      </article>
    </section>
  );
}

export default AboutMe;