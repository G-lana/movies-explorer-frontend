import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import { useFormWithValidation } from '../../utils/Validator';

function Register({
  onRegister,
  clearErrors,
  registerError,
  setRegisterError,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: values.email,
      name: values.name,
      password: values.password,
    });
    resetForm();
  }
  function handleClearErrors() {
    resetForm();
    clearErrors();
  }
  function handleChangeInput(e) {
    handleChange(e);
    if (registerError.length > 0) {
      setRegisterError('');
    }
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
            type="text"
            required
            onChange={handleChangeInput}
            value={values.name || ''}
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
            minLength="2"
          />
          <span className="register__error">{errors.name}</span>
          <span className="register__form_text">E-mail</span>
          <input
            className="register__input register__input_type_email"
            name="email"
            id="input-email"
            type="email"
            value={values.email || ''}
            onChange={handleChangeInput}
            required
          />
          <span className="register__error">{errors.email}</span>
          <span className="register__form_text">Пароль</span>
          <input
            className="register__input register__input_type_password"
            name="password"
            id="input-password"
            type="password"
            value={values.password || ''}
            onChange={handleChangeInput}
            required
            minLength="8"
          />
          <span className="register__error">{errors.password}</span>
          <div className="register__button-container">
            <span className="register__error">{registerError}</span>
            <button
              className="register__button"
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link
            to="/signin"
            className="register__signin-link"
            onClick={handleClearErrors}
          >
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
