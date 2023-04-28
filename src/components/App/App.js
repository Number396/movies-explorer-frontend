import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../Saved-movies/Saved-movies";
import { useState } from "react";
import PageNotFound from "../PageNotFoud/PageNotFound";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Popup from "../Popup/Popup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiAuth } from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleLogin() {
    // setIsPopupOpen(true);

  }

  function handleRegister({ name, email, password }) {
    apiAuth.register(name, email, password)
      .then((data) => {
        console.log(data);
        navigate("/signin", { replace: true });

      })

  }

  function handleProfile() {

  }

  function onSignoutClick() {
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>

        <Header logedIn={loggedIn} />

        <Routes>
          <Route
            path="/"
            element={<Main />}
          />
          <Route
            path="/signup"
            element={<Register loggedIn={loggedIn} handleRegister={handleRegister} />}
          />
          <Route
            path="/signin"
            element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
          />
          <Route
            path="/profile"
            element={<Profile
              // currentUser={currentUser}
              currentUser="number396"
              handleProfile={handleProfile}
              onSignoutClick={onSignoutClick} />}
          />
          <Route
            path="/movies"
            element={<Movies />}
          />
          <Route
            path="/saved-movies"
            element={<SavedMovies />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>

        <Footer />

        <Popup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
