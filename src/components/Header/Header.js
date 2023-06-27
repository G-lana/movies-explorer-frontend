import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';
import whiteProfile from '../../images/white-profile.svg';
import { Link, useLocation } from 'react-router-dom';
import menu from '../../images/menu.svg';
import React from 'react';

function Header({ openPopup, loggedIn }) {
  const location = useLocation();
  // const [onlyShort, setOnlyShort] = React.useState(filter.onlyShort);
  const moviesLocation = location.pathname === '/movies';
  const savedMoviesLocation = location.pathname === '/saved-movies';
  const purpleHeader = location.pathname === '/';
  const headerClassName = `header__container ${
    purpleHeader ? 'header__container_violet' : ''
  }`;
  const headerMainClassName = `header__color ${
    purpleHeader ? 'header__color_violet' : ''
  }`;
  const buttonClassName = `menu-button ${
    purpleHeader ? 'menu-button_black' : ''
  }`;
  const menuItemMoviesClassName = `header__menu_item ${
    moviesLocation ? 'header__menu_item_bold' : ''
  }`;
  const menuItemSavedMoviesClassName = `header__menu_item ${
    savedMoviesLocation ? 'header__menu_item_bold' : ''
  }`;
  const imgSrc = purpleHeader ? whiteProfile : profile;

  return (
    <header className="header">
      {!loggedIn && (
        <div className={headerMainClassName}>
          <div className={headerClassName}>
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
      {loggedIn && (
        <div className={headerMainClassName}>
          <div className={headerClassName}>
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
              <Link to="/movies" className={menuItemMoviesClassName}>
                Фильмы
              </Link>
              <Link to="/saved-movies" className={menuItemSavedMoviesClassName}>
                Сохраненные фильмы
              </Link>
              <Link
                to="/profile"
                className="header__menu_item header__menu_item_type_profile"
              >
                <button className={buttonClassName}>
                  <img
                    src={imgSrc}
                    className="menu-button__img"
                    alt="profile"
                  />{' '}
                  Аккаунт
                </button>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
