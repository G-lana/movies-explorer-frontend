function moviesCard({ data, handleDeleteMovie }) {
  const movieName = data.nameRU;
  const movieImg = `https://api.nomoreparties.co${data.image.url}`;
  const movieDuration =
    data.duration > 60
      ? `${Math.floor(data.duration / 60)}ч ${data.duration % 60}м`
      : `${data.duration % 60}м`;
  return (
    <article className="saved-movie">
      <img className="saved-movie__img" src={movieImg} alt="saved-movie__img" />
      <div className="saved-movie__info">
        <div className="saved-movie__info_text">
          <h2 className="saved-movie__name">{movieName}</h2>
          <p className="saved-movie__duration">{movieDuration}</p>
        </div>
        <button
          className="saved-movie__like"
          type="button"
          aria-label="Нравится"
          onClick={handleDeleteMovie}
        ></button>
      </div>
    </article>
  );
}

export default moviesCard;
