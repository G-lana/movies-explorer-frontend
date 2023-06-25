// import SearchForm from '../Movies/SearchForm/SearchForm';
// import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function SavedMovies({
  savedMovies,
  handleSearch,
  windowWidth,
  handleDeleteMovie,
}) {
  return (
    <div className="saved_movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList
        movies={savedMovies}
        windowWidth={windowWidth}
        handleDeleteMovie={handleDeleteMovie}
      />
    </div>
  );
}

export default SavedMovies;
