import "./NotFoundPage.css";
import { useHistory } from "react-router-dom";

function NotFoundPage() {
  const history = useHistory();

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
        <button onClick={history.goBack} className="not-found__link">Назад</button>
      </div>    
    </section>
  );
}

export default NotFoundPage;