import { useLocation } from 'react-router-dom';
import React from 'react';

function MovieCard({ data, handleSaveMovie, handleDeleteMovie }) {
  const isSaved = data.saved;
  const location = useLocation().pathname;

  function handleSave() {
    handleSaveMovie(data);
  }

  function handleDelete() {
    handleDeleteMovie(data.id);
  }

  function handleImageClick() {
    location === '/movies'
      ? window.open(data.trailerLink, '_blank')
      : window.open(data.trailer, '_blank');
  }

  const movieLikeButtonClassName = `movie__like ${
    isSaved ? 'movie__like_type_active' : ''
  }`;

  const movieName = data.nameRU;
  const movieImg = `https://api.nomoreparties.co${data.image.url}`;
  const movieDuration =
    data.duration > 60
      ? `${Math.floor(data.duration / 60)}ч ${data.duration % 60}м`
      : `${data.duration % 60}м`;
  return (
    <article className="movie movies_movie">
      <img
        className="movie__img"
        src={movieImg}
        alt="movie__img"
        onClick={handleImageClick}
      />
      <div className="movie__info">
        <div className="movie__info_text">
          <h2 className="movie__name">{movieName}</h2>
          <p className="movie__duration">{movieDuration}</p>
        </div>
        <button
          className={movieLikeButtonClassName}
          type="button"
          aria-label="Нравится"
          onClick={isSaved ? handleDelete : handleSave}
        ></button>
      </div>
    </article>
  );
}

export default MovieCard;
