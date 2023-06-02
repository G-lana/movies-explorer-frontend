import More from '../Movies/More/More';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <div className="saved_movies">
      <SearchForm />
      <MoviesCardList />
      <More />
    </div>
  );
}

export default SavedMovies;
