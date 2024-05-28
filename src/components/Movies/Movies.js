import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import React from 'react';

import {
  MAX_WINDOW_WIDTH,
  MIN_WINDOW_WIDTH,
  MAX_STEP,
  MIN_STEP,
  MAX_CARDS_COUNT,
  MIDDLE_CARDS_COUNT,
  MIN_CARDS_COUNT,
  SHORT_FILM_DURATION,
} from '../../constants/constants';

function Movies({
  movies,
  windowWidth,
  handleSaveMovie,
  handleDeleteMovie,
  clearAllErrors,
  savedMoviesIds,
  serverError,
}) {
  React.useEffect(() => {
    clearAllErrors();

    const storedFilter = JSON.parse(localStorage.getItem('filter'));
    setFilter((state) => storedFilter || state);
  }, []);

  const [renderedMoviesList, setRenderedMoviesList] = React.useState([]);
  const [isButtonActive, setIsButtonActive] = React.useState(false);
  const [renderedCardsCount, setRenderedCardsCount] = React.useState(12);
  const [addedCardsCount, setAddedCardsCount] = React.useState(0);
  const [filter, setFilter] = React.useState({
    onlyShort: false,
    search: '',
  });

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
    localStorage.setItem('filter', JSON.stringify(newFilter));
  };

  React.useEffect(() => {
    if (windowWidth > MAX_WINDOW_WIDTH) {
      setRenderedCardsCount(MAX_CARDS_COUNT);
      setAddedCardsCount(MAX_STEP);
    } else if (
      windowWidth <= MAX_WINDOW_WIDTH &&
      windowWidth > MIN_WINDOW_WIDTH
    ) {
      setRenderedCardsCount(MIDDLE_CARDS_COUNT);
      setAddedCardsCount(MIN_STEP);
    } else if (windowWidth <= MIN_WINDOW_WIDTH) {
      setRenderedCardsCount(MIN_CARDS_COUNT);
      setAddedCardsCount(MIN_STEP);
    }
  }, [windowWidth]);

  //--------------------------------------------------------------------Фильтрация фильмов-------------------------------------------------------------//

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

    return sortedMovies.map((item) => ({
      ...item,
      saved: savedMoviesIds.some((id) => id === item.id),
    }));
  }, [filter, movies, savedMoviesIds]);

  React.useEffect(() => {
    const moviesCount = renderedMoviesList.length || renderedCardsCount;
    setRenderedMoviesList(filteredMovies.slice(0, moviesCount));

    setIsButtonActive(filteredMovies.length > moviesCount);
  }, [filteredMovies, renderedCardsCount, renderedMoviesList.length]);

  function handleMoreClick() {
    setRenderedMoviesList(
      filteredMovies.slice(0, renderedMoviesList.length + addedCardsCount)
    );
    if (renderedMoviesList.length >= filteredMovies.length - addedCardsCount) {
      setIsButtonActive(false);
    }
  }

  return (
    <div className="movies">
      <SearchForm
        updateFilter={updateFilter}
        filter={filter}
        setRenderedMoviesList={setRenderedMoviesList}
      />
      <span className="search-form__error">
        {filteredMovies.length === 0 ? 'Ничего не найдено' : ''}
      </span>
      <span className="server__error">
        {serverError
          ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          : ''}
      </span>
      {filter.search !== '' && (
        <MoviesCardList
          movies={renderedMoviesList}
          windowWidth={windowWidth}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          foundError={filteredMovies.length === 0}
          isButtonActive={isButtonActive}
          handleMoreClick={handleMoreClick}
        />
      )}
    </div>
  );
}

export default Movies;
