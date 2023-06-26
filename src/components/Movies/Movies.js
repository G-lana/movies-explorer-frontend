import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import React from 'react';

function Movies({
  movies,
  updateFilter,
  filter,
  windowWidth,
  handleSaveMovie,
  handleDeleteMovie,
  foundError,
  clearAllErrors,
  serverError,
}) {
  React.useEffect(() => {
    clearAllErrors();
  }, []);
  return (
    <div className="movies">
      <SearchForm updateFilter={updateFilter} filter={filter} />
      <span className="search-form__error">
        {foundError ? 'Ничего не найдено' : ''}
      </span>
      <span className="server__error">
        {serverError
          ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          : ''}
      </span>
      {filter.search !== '' && (
        <MoviesCardList
          movies={movies}
          windowWidth={windowWidth}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          foundError={foundError}
        />
      )}
    </div>
  );
}

export default Movies;
