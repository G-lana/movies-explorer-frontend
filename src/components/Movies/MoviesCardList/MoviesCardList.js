import More from '../More/More';
import MovieCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList({
  movies,
  windowWidth,
  handleSaveMovie,
  handleDeleteMovie,
}) {
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
    if (windowWidth > 984) {
      setRenderedCardsCount(12);
      setAddedCardsCount(3);
    } else if (windowWidth <= 984 && windowWidth > 568) {
      setRenderedCardsCount(8);
      setAddedCardsCount(2);
    } else if (windowWidth <= 568) {
      setRenderedCardsCount(5);
      setAddedCardsCount(2);
    }
  }, [windowWidth]);

  React.useEffect(() => {
    const moviesCount = renderedMoviesList.length || renderedCardsCount;
    setRenderedMoviesList(movies.slice(0, moviesCount));

    setIsButtonActive(movies.length > moviesCount);
  }, [movies, renderedCardsCount]);

  return (
    <>
      <section className="moviesCardList">
        {renderedMoviesList.map((data) => {
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
