import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import { useFormWithValidation } from '../../utils/Validator';

function Login({ onLogin, clearErrors, loginError, setLoginError }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });
    resetForm();
  }
  function handleClearErrors() {
    resetForm();
    clearErrors();
  }
  function handleChangeInput(e) {
    handleChange(e);
    if (loginError.length > 0) {
      setLoginError('');
    }
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
            onChange={handleChangeInput}
            value={values.email || ''}
          />
          <span className="login__error">{errors.email}</span>
          <span className="login__form_text">Пароль</span>
          <input
            className="login__input login__input_type_password"
            name="password"
            id="input-password"
            type="password"
            required
            onChange={handleChangeInput}
            value={values.password || ''}
            minLength="8"
          />
          <span className="login__error">{errors.password}</span>
          <div className="register__button-container">
            <span className="login__error">{loginError}</span>
            <button className="login__button" type="submit" disabled={!isValid}>
              Войти
            </button>
          </div>
        </form>
        <div className="login__signup">
          <p className="login__signup-text">Ещё не зарегистрированы?</p>
          <Link
            to="/signup"
            className="login__signup-link"
            onClick={handleClearErrors}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
