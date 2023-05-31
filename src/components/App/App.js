import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React from 'react';

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

function App() {
  const location = useLocation();
  const showFooter =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isCheckBoxCheked, setIsCheckBoxChecked] = React.useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOnCheckBox = () => {
    setIsCheckBoxChecked(true);
  };

  return (
    <div className="page">
      <Header openPopup={openPopup} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <Movies
              isChecked={isCheckBoxCheked}
              turnOnCheckBox={handleOnCheckBox}
            />
          }
        />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Navigation isPopupOpen={isPopupOpen} closePopup={closePopup} />
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
