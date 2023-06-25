import More from '../More/More';
import MovieCard from '../MoviesCard/MoviesCard';
import React from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation().pathname;

  function cardsCount() {
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
  }

  function handleMoreClick() {
    setRenderedMoviesList(
      movies.slice(0, renderedMoviesList.length + addedCardsCount)
    );
    if (renderedMoviesList.length >= movies.length - addedCardsCount) {
      setIsButtonActive(false);
    }
  }

  React.useEffect(() => {
    cardsCount();
  }, [windowWidth]);

  React.useEffect(() => {
    if (location === '/movies') {
      setRenderedMoviesList(movies.slice(0, renderedCardsCount));
      if (movies.length <= renderedCardsCount) {
        setIsButtonActive(false);
      } else {
        setIsButtonActive(true);
      }
    } else {
      setRenderedMoviesList(movies);
      setIsButtonActive(false);
    }
  }, [movies]);

  return (
    <>
      <section className="moviesCardList">
        {renderedMoviesList.map((data) => {
          return (
            <MovieCard
              key={location === '/movies' ? data.id : data._id}
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
