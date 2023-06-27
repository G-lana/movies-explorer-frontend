import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import React from 'react';

function SavedMovies({
  savedMovies,
  updateFilter,
  filter,
  windowWidth,
  handleDeleteMovie,
  foundError,
  clearAllErrors,
}) {
  React.useEffect(() => {
    clearAllErrors();
  }, []);
  return (
    <div className="saved_movies">
      <SearchForm updateFilter={updateFilter} filter={filter} />
      <span className="search-form__error">
        {foundError ? 'Ничего не найдено' : ''}
      </span>
      <MoviesCardList
        movies={savedMovies}
        windowWidth={windowWidth}
        handleDeleteMovie={handleDeleteMovie}
      />
    </div>
  );
}

export default SavedMovies;
