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

  const token = localStorage.getItem('token');

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!token);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [loginError, setLoginError] = React.useState('');
  const [isInputsActive, setIsInputsActive] = React.useState(false);
  const [registerError, setRegisterError] = React.useState('');
  const [serverError, setServerError] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isLoading, setIsLoading] = React.useState(false);

  //-----------------------------Проверка токена, получение информации о пользователе и фильмах ---------------------------------------------//

  React.useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    setInitialMovies(storedMovies);
  }, []);

  React.useEffect(() => {
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
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  }, [navigate, location.pathname, token]);

  React.useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      setIsLoggedIn(true);
      Promise.all([
        mainApi.getProfile(),
        moviesApi.getMovies(),
        mainApi.getUsersMovies(),
      ])
        .then((res) => {
          const [userInfo, moviesList, savedMovies] = res;
          setCurrentUser(userInfo.data);
          setIsLoggedIn(true);
          setIsLoading(false);
          setSavedMovies(savedMovies.data);
          setInitialMovies(moviesList);

          localStorage.setItem('userId', userInfo.data._id);
          localStorage.setItem('movies', JSON.stringify(moviesList));
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setServerError(true);
          console.log(err);
        });
    }
  }, [isLoggedIn, token]);

  //--------------------------------------Регистрация, авторизация, выход из аккаунта--------------------------------------//

  function handleSubmitRegister({ email, password, name }) {
    mainApi
      .register({ email, password, name })
      .then((data) => {
        setIsInputsActive(true);
        if (data._id) {
          handleSubmitLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegisterError('Что-то пошло не так! Попробуйте ещё раз.');
        if (err === 400)
          return setRegisterError('Некорректно заполнено одно из полей');
      })
      .finally(() => {
        setIsInputsActive(false);
      });
  }

  function handleSubmitLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        setIsInputsActive(true);
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
      })
      .finally(() => {
        setIsInputsActive(false);
      });
  }

  function handleSignOut() {
    mainApi.logout().then(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/');
    });
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
        setServerError(true);
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
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
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
      .catch((err) => {
        setServerError(true);
        console.log(err);
      });
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
  }
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
                isLoading={isLoading}
                children={
                  <Movies
                    movies={initialMovies}
                    isLoggedIn={isLoggedIn}
                    windowWidth={windowWidth}
                    handleSaveMovie={handleSaveMovie}
                    savedMoviesIds={savedMovies.map((item) => item.movieId)}
                    handleDeleteMovie={handleDeleteMovie}
                    clearAllErrors={clearAllErrors}
                    serverError={serverError}
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
                isLoading={isLoading}
                children={
                  <SavedMovies
                    movies={savedMovies}
                    isLoggedIn={isLoggedIn}
                    windowWidth={windowWidth}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
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
                isLoading={isLoading}
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
                isInputsActive={isInputsActive}
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
                isInputsActive={isInputsActive}
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
