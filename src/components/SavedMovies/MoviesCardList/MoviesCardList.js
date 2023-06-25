import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList({ movies, handleDeleteMovie }) {
  console.log(movies);
  return (
    <section className="moviesCardList">
      {movies.map((data) => {
        return (
          <MoviesCard
            key={data._id}
            data={data}
            handleDeleteMovie={handleDeleteMovie}
          />
        );
      })}
    </section>
  );
}

export default MoviesCardList;
