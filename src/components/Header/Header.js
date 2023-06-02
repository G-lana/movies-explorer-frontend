import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';
import { Link, useLocation } from 'react-router-dom';
import menu from '../../images/menu.svg';

function Header({ openPopup }) {
  const location = useLocation();
  const headerMovies =
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';
  return (
    <header className="header">
      {location.pathname === '/' && (
        <div className="header__violet">
          <div className="header__container header__container_violet">
            <Link to="/" className="header__logo">
              <input type="image" src={logo} alt="logo" />
            </Link>
            <ul className="header__menu header__menu_main">
              <Link
                to="/signup"
                className="header__menu_item header__menu_item_type_signup"
              >
                Регистрация
              </Link>
              <Link
                to="/signin"
                className="header__menu_item header__menu_item_type_signin"
              >
                Войти
              </Link>
            </ul>
          </div>
        </div>
      )}
      {headerMovies && (
        <div className="header__container header__container_white">
          <Link to="/" className="header__logo">
            <input type="image" src={logo} alt="logo" />
          </Link>
          <input
            type="image"
            src={menu}
            className="burger"
            alt="menu"
            onClick={openPopup}
          />
          <ul className="header__menu">
            <Link
              to="/movies"
              className="header__menu_item header__menu_item_type_films"
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="header__menu_item header__menu_item_type_saved-films"
            >
              Сохраненные фильмы
            </Link>
            <Link
              to="/profile"
              className="header__menu_item header__menu_item_type_profile"
            >
              <button className="menu-button">
                <img src={profile} className="menu-button__img" alt="profile" />{' '}
                Аккаунт
              </button>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
