import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';

function Profile({ onSignOut }) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isEdit) {
      mainApi
        .editProfile({ name, email }, token)
        .then(() => {
          setName(name);
          setEmail(email);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsEdit(false);
        });
    } else {
      setIsEdit(true);
    }
  };

  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, {name}!</h1>
      <form className="profile-info__form" onSubmit={handleSubmit}>
        <div className="profile__info">
          <span className="profile__info_text profile__info_meaning">Имя</span>
          <input
            className="profile__info_text profile__info_value"
            id="name-input"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
            value={name}
            disabled={!isEdit}
            onChange={handleNameChange}
          />
        </div>
        <div className="profile__info">
          <span className="profile__info_text profile__info_meaning">
            E-mail
          </span>
          <input
            className="profile__info_text profile__info_value"
            id="email-input"
            type="email"
            name="email"
            required
            minLength="2"
            maxLength="40"
            value={email}
            disabled={!isEdit}
            onChange={handleEmailChange}
          />
        </div>
        <div className="profile__links">
          {!isEdit ? (
            <>
              <button
                className="profile_link profile__link_type_edit"
                onSubmit={handleSubmit}
                type="submit"
              >
                Редактировать
              </button>
              <button
                className="profile_link profile__link_type_signout"
                onClick={onSignOut}
                type="button"
              >
                Выйти из аккаунта
              </button>{' '}
            </>
          ) : (
            <button
              className="profile__button-save"
              type="submit"
              onSubmit={handleSubmit}
            >
              Сохранить
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
