import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';

function Login({ onLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: '',

    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,

      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email: formValue.email, password: formValue.password });
  }
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__logo">
          <input type="image" src={logo} alt="logo" />
        </Link>
        <h1 className="login__greating">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <span className="login__form_text">E-mail</span>
          <input
            className="login__input login__input_type_email"
            name="email"
            id="input-email"
            type="email"
            required
            onChange={handleChange}
          />
          <span className="login__form_text">Пароль</span>
          <input
            className="login__input login__input_type_password"
            name="password"
            id="input-password"
            type="password"
            required
            onChange={handleChange}
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
