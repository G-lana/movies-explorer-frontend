import searchIcon from '../../../images/search_icon.svg';
import React from 'react';

function SearchForm({ handleSearch }) {
  const [checked, setChecked] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  const checkBoxClassName = `checkbox__input checkbox__input_before ${
    checked ? 'checkbox__input_type_active' : ''
  }`;

  function handleKeyword(evt) {
    setKeyword(evt.target.value);
  }

  function handleCheck() {
    setChecked(!checked);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem('keyword', keyword);
    handleSearch(checked);
  }

  React.useEffect(() => {
    handleSearch(checked);
    setKeyword(localStorage.getItem('keyword'));
  }, []);

  React.useEffect(() => {
    handleSearch(checked);
  }, [checked]);
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleKeyword}
        />
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
          type="checkbox"
          id="checkbox"
          onChange={handleCheck}
          className={checkBoxClassName}
        />
        <label className="checkbox__label" htmlFor="checkbox">
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
