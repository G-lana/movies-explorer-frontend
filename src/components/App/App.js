import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';

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
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [loginError, setLoginError] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const [foundError, setFoundError] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [filter, setFilter] = React.useState({
    onlyShort: false,
    search: '',
  });

  const token = localStorage.getItem('token');

  //-----------------------------Проверка токена, получение информации о пользователе и фильмах ---------------------------------------------//

  React.useEffect(() => {
    if (token) {
      Promise.all([
        mainApi.getProfile(),
        moviesApi.getMovies(),
        mainApi.getUsersMovies(),
      ])
        .then((res) => {
          const [userInfo, moviesList, savedMovies] = res;
          setCurrentUser(userInfo.data);
          setIsLoggedIn(true);
          localStorage.setItem('userId', userInfo.data._id);
          setInitialMovies(moviesList);
          setSavedMovies(savedMovies.data);
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

  function handleSubmitRegister({ email, password, name }) {
    mainApi
      .register({ email, password, name })
      .then((data) => {
        if (data._id) {
          handleSubmitLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegisterError('Что-то пошло не так! Попробуйте ещё раз.');
        if (err === 400)
          return setRegisterError('Некорректно заполнено одно из полей');
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
        if (err === 400)
          return setLoginError('Некорректно заполнено одно из полей');
        if (err === 401)
          return setLoginError('Пользователь с таким email не найден');
        setLoginError('Попробуйте еще раз!');
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
      .then((savedMovies) => {
        setSavedMovies(savedMovies.data);
      })
      .catch(() => {
        setSavedMovies([]);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then(() => {
        getSavedMovies();
        const newSavedMovie = initialMovies.find(
          (item) => item.id === movie.id
        );

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

  function handleDeleteMovie(movieId) {
    const deletedMovie = savedMovies.find((item) => item.movieId === movieId);
    mainApi
      .deleteMovie(deletedMovie._id)
      .then(() => {
        getSavedMovies();
        const newSavedMovies = savedMovies.filter(
          (item) => item.movieId !== deletedMovie.movieId
        );

        setSavedMovies(newSavedMovies);
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

  function clearAllErrors() {
    setLoginError('');
    setRegisterError('');
    setFoundError(false);
  }

  //--------------------------------------------------------------------Фильтрация фильмов-------------------------------------------------------------//

  const filteredMovies = useMemo(() => {
    const movies =
      location.pathname === '/movies' ? initialMovies : savedMovies;
    const sortedMovies = movies.filter((movie) => {
      const isTitleMatched = movie.nameRU
        .toLowerCase()
        .includes(filter.search.toLowerCase());

      if (filter.onlyShort) {
        return isTitleMatched && movie.duration <= 40;
      }

      return isTitleMatched;
    });
    sortedMovies.length === 0 ? setFoundError(true) : setFoundError(false);
    return sortedMovies;
  }, [filter, initialMovies, savedMovies, location.pathname]);

  const renderMovies = useMemo(
    () =>
      filteredMovies.map((item) => ({
        ...item,
        saved: savedMovies.some((savedMovie) => savedMovie.movieId === item.id),
      })),
    [filteredMovies, savedMovies]
  );

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
                    movies={renderMovies}
                    isLoggedIn={isLoggedIn}
                    updateFilter={setFilter}
                    filter={filter}
                    windowWidth={windowWidth}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    foundError={foundError}
                    clearAllErrors={clearAllErrors}
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
                    savedMovies={renderMovies}
                    isLoggedIn={isLoggedIn}
                    updateFilter={setFilter}
                    filter={filter}
                    windowWidth={windowWidth}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    foundError={foundError}
                    clearAllErrors={clearAllErrors}
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
                children={
                  <Profile
                    onSignOut={handleSignOut}
                    updateCurrentUser={setCurrentUser}
                  />
                }
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleSubmitLogin}
                clearErrors={clearAllErrors}
                loginError={loginError}
                setLoginError={setLoginError}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleSubmitRegister}
                clearErrors={clearAllErrors}
                registerError={registerError}
                setRegisterError={setRegisterError}
              />
            }
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
