import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import React, { useState } from 'react';
import { SHORT_FILM_DURATION } from '../../constants/constants';

function SavedMovies({
  movies,
  windowWidth,
  handleDeleteMovie,
  clearAllErrors,
}) {
  const [filter, setFilter] = useState({
    onlyShort: false,
    search: '',
  });
  React.useEffect(() => {
    clearAllErrors();
  }, []);

  console.log('SavedMovies useMemo', movies);
  const filteredMovies = React.useMemo(() => {
    const sortedMovies = movies.filter((movie) => {
      const isTitleMatched = movie.nameRU
        .toLowerCase()
        .includes(filter.search.toLowerCase());

      if (filter.onlyShort) {
        return isTitleMatched && movie.duration <= SHORT_FILM_DURATION;
      }

      return isTitleMatched;
    });

    return sortedMovies;
  }, [filter, movies]);

  return (
    <div className="saved_movies">
      <SearchForm updateFilter={setFilter} filter={filter} disableValidation />
      <span className="search-form__error">
        {filteredMovies.length === 0 ? 'Ничего не найдено' : ''}
      </span>
      <MoviesCardList
        movies={filteredMovies}
        windowWidth={windowWidth}
        handleDeleteMovie={handleDeleteMovie}
      />
    </div>
  );
}

export default SavedMovies;
