import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import Error from '../Error/Error';

import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const showFooter =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  const showHeader =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const token = localStorage.getItem('token');

  //-----------------------------Проверка токена, получение информации о пользователе и фильмах ---------------------------------------------//

  React.useEffect(() => {
    if (token) {
      Promise.all([mainApi.getProfile(), moviesApi.getMovies()])
        .then((res) => {
          const [userInfo, moviesList] = res;
          setCurrentUser(userInfo.data);
          // localStorage.setItem('name', userInfo.data.name);
          // localStorage.setItem('email', userInfo.data.email);
          setIsLoggedIn(true);
          localStorage.setItem('userId', userInfo.data._id);
          if (localStorage.getItem('movies') === null) {
            localStorage.setItem('movies', JSON.stringify(moviesList));
            setInitialMovies(moviesList);
          } else {
            setInitialMovies(JSON.parse(localStorage.getItem('movies')));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, token]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .isValidToken(token)
        .then((res) => {
          if (
            location.pathname === '/signup' ||
            location.pathname === '/signin'
          ) {
            setCurrentUser(res.data);
            setIsLoggedIn(true);
            navigate('/movies');
          }
        })
        .catch(console.error);
    }
  }, [navigate, location.pathname]);

  //--------------------------------------Регистрация, авторизация, выход из аккаунта--------------------------------------//

  function handleSubmitRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        // handleSubmitLogin(email, password);
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmitLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }

  //-------------------------------------------------Работа с фильмами---------------------------------------------------------------//

  function getSavedMovies() {
    mainApi
      .getUsersMovies(token)
      .then((movies) => {
        setInitialSavedMovies(movies);
        movies.forEach((movie) => {
          const newSavedMovie = initialMovies.find(
            (item) => item.id === movie.movieId
          );
          if (newSavedMovie !== undefined) {
            newSavedMovie.saved = true;
            setInitialMovies(
              initialMovies.map((item) =>
                item.id === movie.movieId ? newSavedMovie : item
              )
            );
          }
        });
      })
      .catch(() => {
        setInitialSavedMovies([]);
      });
  }

  function handleSearch(isShortMovies) {
    getSavedMovies();
    let sortedMovies;
    const word = localStorage.getItem('keyword') || '';
    const filteredMovies =
      location.pathname === '/movies' ? initialMovies : initialSavedMovies;

    if (word.length > 0) {
      sortedMovies = filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(word.toLowerCase())
      );
      sortedMovies.length === 0 && console.log('Ничего не найдено');
      if (isShortMovies) {
        location.pathname === '/movies'
          ? setMovies(sortedMovies.filter((movie) => movie.duration <= 40))
          : setSavedMovies(
              sortedMovies.filter((movie) => movie.duration <= 40)
            );
      } else {
        location.pathname === '/movies'
          ? setMovies(sortedMovies)
          : setSavedMovies(sortedMovies);
      }
    } else {
      setMovies([]);
      setSavedMovies([]);
    }
  }

  function handleSaveMovie(movie) {
    console.log(movie);
    mainApi
      .saveMovie(movie)
      .then(() => {
        getSavedMovies();
        const newSavedMovie = initialMovies.find(
          (item) => item.id === movie.id
        );
        console.log(newSavedMovie);

        newSavedMovie.saved = true;
        setInitialMovies(
          initialMovies.map((item) =>
            item.id === newSavedMovie.id ? newSavedMovie : item
          )
        );
        localStorage.setItem('movies', JSON.stringify(initialMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const deletedMovie = initialSavedMovies.find(
      (item) => item.movieId === movie.id
    );
    console.log(initialSavedMovies);
    mainApi
      .deleteMovie(deletedMovie.id)
      .then(() => {
        getSavedMovies();
        const deletedFilm = initialMovies.find((item) => item === movie);
        delete deletedFilm.saved;
        setInitialMovies(
          initialMovies.map((item) =>
            item.id === deletedFilm.id ? deletedFilm : item
          )
        );
        localStorage.setItem('movies', JSON.stringify(initialMovies));
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteSavedMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        getSavedMovies();
        const newMovies = savedMovies.filter((item) => item !== movie);
        const deletedMovie = initialMovies.find(
          (item) => item.id === movie.movieId
        );
        delete deletedMovie.saved;
        setSavedMovies(newMovies);
        setInitialMovies(
          initialMovies.map((item) =>
            item.id === deletedMovie.id ? deletedMovie : item
          )
        );
        localStorage.setItem('movies', JSON.stringify(initialMovies));
      })
      .catch((err) => console.log(err));
  }

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  });

  //-------------------------------------------------открытие/закрытие бургер-меню---------------------------------------------------//

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {showHeader && <Header openPopup={openPopup} loggedIn={isLoggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                children={
                  <Movies
                    movies={movies}
                    isLoggedIn={isLoggedIn}
                    handleSearch={handleSearch}
                    windowWidth={windowWidth}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                children={
                  <SavedMovies
                    savedMovies={savedMovies}
                    isLoggedIn={isLoggedIn}
                    handleSearch={handleSearch}
                    windowWidth={windowWidth}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteSavedMovie}
                  />
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                children={<Profile onSignOut={handleSignOut} />}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleSubmitLogin} />}
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleSubmitRegister} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Navigation isPopupOpen={isPopupOpen} closePopup={closePopup} />
        {showFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
