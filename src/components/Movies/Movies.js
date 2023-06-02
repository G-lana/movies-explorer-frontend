import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import More from './More/More';

function Movies({ isChecked, turnOnCheckBox }) {
  return (
    <div className="movies">
      <SearchForm isChecked={isChecked} turnOnCheckBox={turnOnCheckBox} />
      <MoviesCardList />
      <More />
    </div>
  );
}

export default Movies;
