import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../Saved-movies/Saved-movies";
import { useEffect, useState } from "react";
import PageNotFound from "../PageNotFoud/PageNotFound";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Popup from "../Popup/Popup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiMain } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { apiMovies } from "../../utils/MoviesApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    // console.log('inside useEffec');
    tokenCheck();
  }, []);

  function handleLogin({ email, password }) {
    // setIsPopupOpen(true);
    // console.log(email, password);
    apiMain
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .then(() => {
        const token = localStorage.getItem("token");
        apiMain.checkToken(token).then((data) => {
          setCurrentUser(data);
        });
      })
      .catch((error) => console.log(`Ошибка входа: ${error}`));
  }

  function handleRegister({ name, email, password }) {
    apiMain
      .register(name, email, password)
      .then((data) => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        // setInfoTooltipSet({ isOpen: true, isSucceded: false });
        console.log(`Ошибка регистрации: ${error}`);
      });
  }

  function tokenCheck() {
    // console.log('login in token check:', loggedIn);
    const token = localStorage.getItem("token");

    if (token) {
      apiMain
        .checkToken(token)
        .then((data) => {
          // console.log('inside tokenCheck api');
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(pathname, { replace: true });
          // setUserData({ email: data.email });
          // setJwtToken({ token });
        })
        .catch((error) => console.log(`Ошибка: ${error}`))
        .finally(() => setIsDataLoading(false));
    } else {
      setIsDataLoading(false);
    }
  }

  function handleProfile({ name, email }) {
    const token = localStorage.getItem("token");
    apiMain
      .setUserInfo({ name, email, token })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log(`Ошибка при обновлении профиля: ${error}`));
  }

  function getSearchResult(text, query) {
    return text.toLowerCase().includes(query.toLowerCase());
  }

  function handleSearchMovie(movies, query, isShortMovie) {
    const searchedMovies = movies.filter((movie) => {
      const text = movie.nameRU;
      const duration = movie.duration;

      if (isShortMovie & (duration <= 40)) {
        return getSearchResult(text, query);
      }
      if (!isShortMovie) {
        return getSearchResult(text, query);
      }
    });

    return searchedMovies;
  }

  function handleSearch({ searchMovies }, checked) {
    const isLocalMovies = localStorage.getItem("movies");

    if (!isLocalMovies) {
      apiMovies
        .getMovies()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
          localStorage.setItem("query", searchMovies);
          localStorage.setItem("isShortMovie", checked);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    } else {
      const movies = JSON.parse(localStorage.getItem("movies"));
      localStorage.setItem("query", searchMovies);
      localStorage.setItem("isShortMovie", checked);

      // const query = localStorage.getItem("query");
      // const isShortMovie = localStorage.getItem("isShortMovie");

      const searchResult = handleSearchMovie(movies, searchMovies, checked);
      localStorage.setItem("foundedMovies", JSON.stringify(searchResult));
      setFoundedMovies(searchResult);
    }
  }

  function onSignoutClick() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/", { replace: true });
    setCurrentUser({});
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  if (isDataLoading) return null;

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />

        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path="/signup"
            element={
              !loggedIn ? (
                <Register loggedIn={loggedIn} handleRegister={handleRegister} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/signin"
            element={
              !loggedIn ? (
                <Login loggedIn={loggedIn} handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
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
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                handleSearch={handleSearch}
                isDataLoading={isDataLoading}
                foundedMovies={foundedMovies}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />

        <Popup isOpen={isPopupOpen} onClose={handlePopupClose} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
