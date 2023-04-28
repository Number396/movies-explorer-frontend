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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleLogin({ email, password }) {
    // setIsPopupOpen(true);
    apiAuth
      .login(email, password)
      .then((data) => {
        // console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          // setLoggedIn(true);
          // navigate("/movies", { replace: true });
          tokenCheck();
        }

      })
      // .then(() => tokenCheck())
      .catch((error) => console.log(`Ошибка входа: ${error}`));
  }

  function handleRegister({ name, email, password }) {
    apiAuth.register(name, email, password)
      .then((data) => {
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        // setInfoTooltipSet({ isOpen: true, isSucceded: false });
        console.log(`Ошибка регистрации: ${error}`);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate("/movies", { replace: true });
          // console.log(data);
          // setUserData({ email: data.email });
          // navigate("/", { replace: true });
          // setJwtToken({ token });
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }


  function handleProfile() {

  }

  function onSignoutClick() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: true });
    setCurrentUser({});
    console.log(loggedIn);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>

        <Header loggedIn={loggedIn} />

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
            element={
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                // currentUser={currentUser}
                handleProfile={handleProfile}
                onSignoutClick={onSignoutClick}
              />
            }
          />

          <Route
            path="/movies"
            // element={<Movies />}
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
              />
            }
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
