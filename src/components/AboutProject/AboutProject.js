import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="component about-project">
      <h3 className="component__title">О проекте</h3>
      <div className="about-project__description">
        <article className="about-project__section">
          <h3 className="description__title">Дипломный проект включал 5 этапов</h3>
          <p className="description__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__section">
          <h3 className="description__title">На выполнение диплома ушло 5 недель</h3>
          <p className="description__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__duration">
        <div className="about-project__duration_color_green">1 неделя</div>
        <div className="about-project__duration_color_grey">4 недели</div>
      </div>
    </section>
  );
}

export default AboutProject;