// import likeActive from '../../../images/like_active.svg';
import film from '../../../images/movie_img.png';

function moviesCard() {
  return (
    <article className="saved-movie">
      <img className="saved-movie__img" src={film} alt="saved-movie__img" />
      <div className="saved-movie__info">
        <div className="saved-movie__info_text">
          <h2 className="saved-movie__name">33 слова о дизайне</h2>
          <p className="saved-movie__duration">1ч 47м</p>
        </div>
        <button
          className="saved-movie__like"
          type="button"
          aria-label="Нравится"
        ></button>
      </div>
    </article>
  );
}

export default moviesCard;
