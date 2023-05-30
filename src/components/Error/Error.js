import { Link } from 'react-router-dom';

function Error() {
  return (
    <section class="error">
      <h1 class="error__status">404</h1>
      <p class="error__name">Страница не найдена</p>
      <Link to="/" class="error__link">
        Назад
      </Link>
    </section>
  );
}

export default Error;
