import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import More from './More/More';

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
      <More />
    </div>
  );
}

export default Movies;
