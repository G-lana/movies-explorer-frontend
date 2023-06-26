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
