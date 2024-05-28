import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Error() {
  const navigate = useNavigate();

  return (
    <section className="error">
      <h1 className="error__status">404</h1>
      <p className="error__name">Страница не найдена</p>
      <button className="error__link" onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}

export default Error;
