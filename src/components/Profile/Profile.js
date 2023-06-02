function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, Виталий!</h1>
      <div className="profile__info">
        <p className="profile__info_text profile__info_meaning">Имя</p>
        <p className="profile__info_text profile__info_value">Виталий</p>
      </div>
      <div className="profile__info">
        <p className="profile__info_text profile__info_meaning">Email</p>
        <p className="profile__info_text profile__info_value">
          pochta@yandex.ru
        </p>
      </div>
      <div className="profile__links">
        <a className="profile_link profile__link_type_edit" href="#">
          Редактировать
        </a>
        <a className="profile_link profile__link_type_signout" href="#">
          Выйти из аккаунта
        </a>
      </div>
    </section>
  );
}

export default Profile;
