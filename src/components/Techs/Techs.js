import "./Techs.css";

function Techs() {
  return (
    <section className="component techs">
      <h3 className="component__title">Teхнологии</h3>
      <h4 className="techs__subtitle">7 тeхнологий</h4>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__grid grid">
        <li className="grid__elem">HTML</li>
        <li className="grid__elem">CSS</li>
        <li className="grid__elem">JS</li>
        <li className="grid__elem">React</li>
        <li className="grid__elem">Git</li>
        <li className="grid__elem">Express.js</li>
        <li className="grid__elem">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;