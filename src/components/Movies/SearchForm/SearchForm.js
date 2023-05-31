import searchIcon from '../../../images/search_icon.svg';

function SearchForm({ isChecked, turnOnCheckBox }) {
  const checkBoxClassName = `checkbox__input checkbox__input_before ${
    isChecked ? 'checkbox__input_type_active' : ''
  }`;

  return (
    <section className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" placeholder="Фильм" />
        <button type="submit" className="search-form__button">
          <img
            className="search-form__button_img"
            src={searchIcon}
            alt="search_icon"
          />
        </button>
      </form>
      <div className="checkbox">
        <input
          className={checkBoxClassName}
          onClick={turnOnCheckBox}
          type="checkbox"
          id="checkbox"
        />
        <label className="checkbox__label" for="checkbox">
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
