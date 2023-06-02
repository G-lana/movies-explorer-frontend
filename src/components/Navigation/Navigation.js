import { Link } from 'react-router-dom';
import profile from '../../images/profile.svg';

function Navigation({ isPopupOpen, closePopup }) {
  const popupClassName = `popup ${isPopupOpen ? 'popup_open' : ''}`;

  return (
    <div className={popupClassName} id="popup">
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={closePopup}
        ></button>
        <ul className="popup__menu">
          <li className="popup__menu_item">
            <Link to="/" className="popup__menu_link">
              Главная
            </Link>
          </li>
          <li className="popup__menu_item">
            <Link to="/movies" className="popup__menu_link">
              Фильмы
            </Link>
          </li>
          <li className="popup__menu_item">
            <Link to="/saved-movies" className="popup__menu_link">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="popup__button">
          <img src={profile} className="button__img" alt="profile" /> Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
