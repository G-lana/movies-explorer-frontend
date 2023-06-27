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
} from '../../constants/constants';

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

  const [renderedMoviesList, setRenderedMoviesList] = React.useState([]);
  const [isButtonActive, setIsButtonActive] = React.useState(false);
  const [renderedCardsCount, setRenderedCardsCount] = React.useState(12);
  const [addedCardsCount, setAddedCardsCount] = React.useState(0);

  function handleMoreClick() {
    setRenderedMoviesList(
      movies.slice(0, renderedMoviesList.length + addedCardsCount)
    );
    if (renderedMoviesList.length >= movies.length - addedCardsCount) {
      setIsButtonActive(false);
    }
  }

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

  React.useEffect(() => {
    const moviesCount = renderedMoviesList.length || renderedCardsCount;
    setRenderedMoviesList(movies.slice(0, moviesCount));

    setIsButtonActive(movies.length > moviesCount);
  }, [movies, renderedCardsCount, renderedMoviesList.length]);
  return (
    <div className="movies">
      <SearchForm
        updateFilter={updateFilter}
        filter={filter}
        setRenderedMoviesList={setRenderedMoviesList}
      />
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
          movies={renderedMoviesList}
          windowWidth={windowWidth}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          foundError={foundError}
          isButtonActive={isButtonActive}
          handleMoreClick={handleMoreClick}
        />
      )}
    </div>
  );
}

export default Movies;
