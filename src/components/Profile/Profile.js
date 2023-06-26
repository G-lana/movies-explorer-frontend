import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/Validator';

function Profile({ onSignOut, updateCurrentUser }) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation();
  const [isEdit, setIsEdit] = React.useState(false);
  const [error, setError] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isEdit) {
      mainApi
        .editProfile({ name: values.name, email: values.email })
        .then((res) => {
          const name = res.data.name;
          const email = res.data.email;
          updateCurrentUser({ ...currentUser, name, email });
          setError('Обновление данных профиля прошло успешно!');
          setIsEdit(false);
        })
        .catch((err) => {
          err === 'Ошибка: 409'
            ? setError('Пользователь с таким email уже существует.')
            : setError('При обновлении профиля произошла ошибка.');
        })
        .finally(() => {
          setError('');
        });
    } else {
      setIsEdit(true);
    }
  };

  function handleClickSignOut() {
    resetForm();
    onSignOut();
  }
  function handleChangeInput(e) {
    handleChange(e);
    if (error.length > 0) {
      setError('');
    }
  }
  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  console.log(currentUser);
  console.log(values);

  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
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
            value={values.name || ''}
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
            disabled={!isEdit}
            onChange={handleChangeInput}
          />
        </div>
        <span className="profile__error">{errors.name}</span>
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
            value={values.email || ''}
            disabled={!isEdit}
            onChange={handleChangeInput}
          />
        </div>
        <span className="profile__error">{errors.email}</span>
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
                onClick={handleClickSignOut}
                type="button"
              >
                Выйти из аккаунта
              </button>{' '}
            </>
          ) : (
            <div className="save-button__container">
              <p className="profile__error profile__error_submit">{error}</p>
              <button
                className="profile__button-save"
                type="submit"
                onSubmit={handleSubmit}
                disabled={
                  !isValid ||
                  (currentUser.name === values.name &&
                    currentUser.email === values.email)
                }
              >
                Сохранить
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
