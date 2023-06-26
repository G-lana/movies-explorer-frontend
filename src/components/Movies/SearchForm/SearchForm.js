import searchIcon from '../../../images/search_icon.svg';
import React from 'react';

function SearchForm({ filter, updateFilter }) {
  const [onlyShort, setOnlyShort] = React.useState(filter.onlyShort);
  const [search, setSearch] = React.useState(filter.search);

  const checkBoxClassName = `checkbox__input checkbox__input_before ${
    onlyShort ? 'checkbox__input_type_active' : ''
  }`;

  function handleSearchChange(evt) {
    setSearch(evt.target.value);
  }

  function handleCheck() {
    setOnlyShort(!onlyShort);
    updateFilter({ ...filter, onlyShort: !onlyShort });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    updateFilter({
      search,
      onlyShort,
    });
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleSearchChange}
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
