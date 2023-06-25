import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import React from 'react';

function Movies({
  movies,
  handleSearch,
  windowWidth,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  return (
    <div className="movies">
      <SearchForm handleSearch={handleSearch} windowWidth={windowWidth} />
      <MoviesCardList
        movies={movies}
        windowWidth={windowWidth}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
      />
    </div>
  );
}

export default Movies;
