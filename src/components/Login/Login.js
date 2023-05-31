import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__logo">
          <input type="image" src={logo} alt="logo" />
        </Link>
        <h1 className="login__greating">Рады видеть!</h1>
        <form className="login__form">
          <span className="login__form_text">E-mail</span>
          <input
            className="login__input login__input_type_email"
            name="email"
            id="input-email"
            type="email"
            required="true"
          />
          <span className="login__form_text">Пароль</span>
          <input
            className="login__input login__input_type_password"
            name="password"
            id="input-password"
            type="password"
            required="true"
          />
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
        <div className="login__signup">
          <p className="login__signup-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__signup-link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
