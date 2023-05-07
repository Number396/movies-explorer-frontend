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
import { useResize } from "../../hooks/useResize";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortMovie, setShortMovies] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();

  const [newMovies, setNewMovies] = useState([]);
  const [countS, setCountS] = useState(7);
  const [countM, setCountM] = useState(10);
  const [countL, setCountL] = useState(16);
  const [isMore, setIsMore] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  const { width, isScreenSm, isScreenMd, isScreenLg } = useResize();

  // для отображения карточек в зависимости от разрешения
  useEffect(() => {
    // console.log("base");
    // console.log("foundedMovies:", foundedMovies);

    if (isScreenSm) {
      if (foundedMovies.length >= 6) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }

      setNewMovies(foundedMovies.slice(0, 5));
      setCountS(7);
    }

    if (isScreenMd) {
      if (foundedMovies.length >= 9) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }

      setNewMovies(foundedMovies.slice(0, 8));
      setCountM(10);
    }
    if (isScreenLg) {
      if (foundedMovies.length >= 13) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }

      setNewMovies(foundedMovies.slice(0, 12));
      setCountL(16);
    }
  }, [width, foundedMovies]);

  //основной юзэффект при монтировании страницы
  useEffect(() => {
    // console.log('inside useEffec');
    tokenCheck();
    const isFoundedMovies = JSON.parse(localStorage.getItem("foundedMovies"));
    const isShortMovie = JSON.parse(localStorage.getItem("isShortMovie"));
    const isQuery = localStorage.getItem("query");
    // console.log(isShortMovie);

    if (isFoundedMovies) {
      setFoundedMovies(isFoundedMovies);
    }

    if (isShortMovie) {
      setShortMovies(isShortMovie);
    }
    if (isQuery) {
      setQuery(isQuery);
    }
  }, []);

  function handleMoreClick() {
    // console.log(foundedMovies.length);

    // setIsLoading(!isLoading);
    // if (isScreenMd) {
    //   setNewMovies(foundedMovies.slice(0, 8));
    // }
    if (isScreenSm) {
      setNewMovies(foundedMovies.slice(0, countS));
      setCountS(countS + 2);
      // console.log("countS", countS);
      if (foundedMovies.length <= countS) {
        setIsMore(false);
        setCountS(7);
      }
    }

    if (isScreenMd) {
      setNewMovies(foundedMovies.slice(0, countM));
      setCountM(countM + 2);
      // console.log("countM", countM);
      if (foundedMovies.length <= countM) {
        setIsMore(false);
        setCountM(10);
      }
    }

    if (isScreenLg) {
      setNewMovies(foundedMovies.slice(0, countL));
      setCountL(countL + 4);
      // console.log("countL", countL);
      if (foundedMovies.length <= countL) {
        setIsMore(false);
        setCountL(16);
      }
    }
  }

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

  // function handleSearch({ searchMovies }, checked) {
  function handleSearch({ searchMovies }) {
    const isLocalMovies = localStorage.getItem("movies");

    if (!isLocalMovies) {
      apiMovies
        .getMovies()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
          localStorage.setItem("query", searchMovies);
          localStorage.setItem("isShortMovie", shortMovie);
          // localStorage.setItem("isShortMovie", checked);
          const searchResult = handleSearchMovie(
            data,
            searchMovies,
            shortMovie
          );

          localStorage.setItem("foundedMovies", JSON.stringify(searchResult));
          setFoundedMovies(searchResult);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    } else {
      const movies = JSON.parse(localStorage.getItem("movies"));
      localStorage.setItem("query", searchMovies);
      localStorage.setItem("isShortMovie", shortMovie);
      setQuery(searchMovies);
      // localStorage.setItem("isShortMovie", checked);

      // const query = localStorage.getItem("query");
      // const isShortMovie = localStorage.getItem("isShortMovie");

      // const searchResult = handleSearchMovie(movies, searchMovies, checked);
      const searchResult = handleSearchMovie(movies, searchMovies, shortMovie);
      localStorage.setItem("foundedMovies", JSON.stringify(searchResult));
      setFoundedMovies(searchResult);
    }
  }

  function handleCheckbox() {
    // localStorage.setItem("isShortMovie", !shortMovie);
    // const isShortMovie = JSON.parse(localStorage.getItem("isShortMovie"));
    setShortMovies(!shortMovie);
    const isFoundedMovies = JSON.parse(localStorage.getItem("foundedMovies"));
    if (isFoundedMovies) {
      const searchInside = handleSearchMovie(
        isFoundedMovies,
        query,
        !shortMovie
      );
      setFoundedMovies(searchInside);
    }
  }

  function handleRemoveClick(card, isLiked, setIsLiked) {
    const token = localStorage.getItem("token");
    console.log(card);
    console.log(savedMovies);
    const copySavedMovies = [...savedMovies];

    const movieIndex = copySavedMovies.findIndex((item) => {
      // console.log(item.movieId, card.id);
      return item.movieId === card.movieId;
    });

    console.log(movieIndex);
    console.log(isLiked);
    const movieId = card._id;

    apiMain
      .deleteMovie({ movieId, token })
      .then((result) => {
        // console.log("3)", result);
        // const newSavedMovies = savedMovies.splice(movieIndex, 1);
        // console.log("4) copySavedMovies before cut:", copySavedMovies);
        const cut = copySavedMovies.splice(movieIndex, 1);
        console.log("cut:", cut);
        console.log("4.1) copySavedMovies after cut:", copySavedMovies);
        setSavedMovies(copySavedMovies);
        // localStorage.setItem("savedMovie", JSON.stringify(copySavedMovies));
        // console.log("5) savedMovie");
      })
      .catch((error) => console.log(`Ошибка снятия лайка: ${error}`));
  }

  function handleLikeClick(card, isLiked, setIsLiked) {
    const token = localStorage.getItem("token");
    // const copySavedMovies = [...savedMovies];
    // console.log("copySavedMovies", copySavedMovies);
    // console.log(card);

    if (isLiked) {
      const copySavedMovies = [...savedMovies];
      // console.log(copySavedMovies);

      // console.log("0) SavedMovies", savedMovies);
      // console.log("0) copySavedMovies", copySavedMovies);

      const movieIndex = copySavedMovies.findIndex((item) => {
        // console.log(item.movieId, card.id);
        return item.movieId === card.id;
      });

      // console.log("1) movieIndex:", movieIndex);

      if (movieIndex !== -1) {
        // const movieId = savedMovies[movieIndex]._id;
        // const copyMovieId = copySavedMovies[movieIndex]._id;
        const movieId = copySavedMovies[movieIndex]._id;

        // console.log("2) movieId", movieId);
        // console.log("2.1) copyMovieId", copyMovieId);

        apiMain
          .deleteMovie({ movieId, token })
          .then((result) => {
            // console.log("3)", result);
            // const newSavedMovies = savedMovies.splice(movieIndex, 1);
            // console.log("4) copySavedMovies before cut:", copySavedMovies);
            const cut = copySavedMovies.splice(movieIndex, 1);
            // console.log("cut:", cut);
            // console.log("4.1) copySavedMovies after cut:", copySavedMovies);
            setSavedMovies(copySavedMovies);
            setIsLiked(!isLiked);
            // localStorage.setItem("savedMovie", JSON.stringify(copySavedMovies));
            // console.log("5) savedMovie");
          })
          .catch((error) => console.log(`Ошибка снятия лайка: ${error}`));
      }
    } else {
      // console.log(card);
      const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        id,
        nameRU,
        nameEN,
      } = card;

      apiMain
        .createMovie({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          id,
          nameRU,
          nameEN,
          token,
        })
        .then((data) => {
          setSavedMovies([...savedMovies, data]);
          console.log("saveMovies:", savedMovies);
          // setSaveMovies((saveMovie) => [...saveMovie, data]);
          // console.log(data);
          setIsLiked(!isLiked);
        })
        .catch((error) => console.log(`Ошибка установки лайка: ${error}`));
      // console.log("saveMovies3:", saveMovies);
    }
  }

  function onSignoutClick() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/", { replace: true });
    setCurrentUser({});
    setFoundedMovies([]);
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
                handleCheckbox={handleCheckbox}
                isDataLoading={isDataLoading}
                // foundedMovies={foundedMovies}
                shortMovie={shortMovie}
                handleMoreClick={handleMoreClick}
                isMore={isMore}
                newMovies={newMovies}
                query={query}
                // isLiked={isLiked}
                handleLikeClick={handleLikeClick}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                saveMovies={savedMovies}
                handleRemoveClick={handleRemoveClick}
              />
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
