import More from '../More/More';
import MovieCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList({
  movies,
  handleSaveMovie,
  handleDeleteMovie,
  isButtonActive,
  handleMoreClick,
}) {
  return (
    <>
      <section className="moviesCardList">
        {movies.map((data) => {
          return (
            <MovieCard
              key={data.id}
              data={data}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
          );
        })}
      </section>
      <More onMoreClick={handleMoreClick} isButtonActive={isButtonActive} />
    </>
  );
}

export default MoviesCardList;
