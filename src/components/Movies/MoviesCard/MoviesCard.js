import movieImg from '../../../images/movie_img.png';

function MovieCard(isLiked) {
  const movieLikeButtonClassName = `movie__like ${
    isLiked ? 'movie__like_type_active' : ''
  }`;
  return (
    <article className="movie movies_movie">
      <img className="movie__img" src={movieImg} alt="movie__img" />
      <div className="movie__info">
        <div className="movie__info_text">
          <h2 className="movie__name">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 47м</p>
        </div>
        <button
          className={movieLikeButtonClassName}
          type="button"
          aria-label="Нравится"
        ></button>
      </div>
    </article>
  );
}

export default MovieCard;
