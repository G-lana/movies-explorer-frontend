import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';

function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    mame: '',
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

    onRegister({
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
    });
  }
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__logo">
          <input type="image" src={logo} alt="logo" />
        </Link>
        <h1 className="register__greating">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <span className="register__form_text">Имя</span>
          <input
            className="register__input register__input_type_name"
            name="name"
            id="input-name"
            required
            onChange={handleChange}
          />
          <span className="register__form_text">E-mail</span>
          <input
            className="register__input register__input_type_email"
            name="email"
            id="input-email"
            type="email"
            required
            onChange={handleChange}
          />
          <span className="register__form_text">Пароль</span>
          <input
            className="register__input register__input_type_password"
            name="password"
            id="input-password"
            type="password"
            required
            onChange={handleChange}
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
