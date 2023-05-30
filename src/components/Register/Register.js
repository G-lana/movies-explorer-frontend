import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__logo">
          <input type="image" src={logo} alt="logo" />
        </Link>
        <h1 className="register__greating">Добро пожаловать!</h1>
        <form className="register__form">
          <span className="register__form_text">Имя</span>
          <input
            className="register__input register__input_type_name"
            name="name"
            id="input-name"
          />
          <span className="register__form_text">E-mail</span>
          <input
            className="register__input register__input_type_email"
            name="email"
            id="input-email"
            type="email"
          />
          <span className="register__form_text">Пароль</span>
          <input
            className="register__input register__input_type_password"
            name="password"
            id="input-password"
            type="password"
          />
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__signin-link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
