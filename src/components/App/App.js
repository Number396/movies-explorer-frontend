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
import { LOGIN_ERROR, REGISTER_ERROR } from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [errorRegisterMessage, setErrorRegisterMessage] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const [errorGMessage, setErrorGMessage] = useState("");
  const [isGError, setGError] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  //shortMovie  состояние чекбокса
  const [shortMovie, setShortMovies] = useState(false);
  //shortSaveMovie состояние чекбокса для сохранённых фильмов
  const [shortSaveMovie, setShortSaveMovie] = useState(false);
  const [query, setQuery] = useState("");
  const [querySavedMovie, setQuerySavedMovie] = useState("");
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

  useEffect(() => {
    // console.log("getSavedMovies");
    const token = localStorage.getItem("token");
    if (token) {
      apiMain
        .getSavedMovies({ token })
        .then((data) => {
          // console.log(data);
          localStorage.setItem("savedMovies", JSON.stringify(data));
          setSavedMovies(data);
        })
        .catch((error) =>
          console.log(`Ошибка получения сохр. фильмов: ${error}`)
        );
    }
  }, [loggedIn]);

  useEffect(() => {
    if (pathname === "/signin" || pathname === "/signup") {
      console.log(pathname);
      // setErrorLoginMessage("");
      setErrorRegisterMessage("");
      setErrorGMessage("");
    }
  }, [pathname]);

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

  function checkErrorStatus(error, setErrorMessage, setIsError, messageError) {
    try {
      error.json().then((error) => {
        setErrorMessage(error.message);
        setIsError(true);
        setIsButtonDisabled(false);
        console.log("uuuuuu");
      });
    } catch {
      console.log(messageError);
      setErrorMessage(messageError);
      setIsError(true);
      setIsButtonDisabled(false);
    }
  }

  function handleLogin({ email, password }) {
    // setIsPopupOpen(true);
    // console.log(email, password);
    setIsButtonDisabled(true);
    setGError(false);
    // setIsLoginError(false);
    // setErrorLoginMessage("");
    setErrorGMessage("");

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

        // setIsLoginError(false);
        setGError(false);

        apiMain.checkToken(token).then((data) => {
          setCurrentUser(data);
        });
      })
      .catch((error) => {
        // console.log(error);
        // console.log(typeof error);
        // console.log(error.ok);
        // if (!error.ok) {
        // try {
        //   error.json().then((error) => {
        //     console.log(error);
        //     // setErrorLoginMessage(error.message);
        //     setErrorGMessage(error.message);
        //     // setIsLoginError(true);
        //     setGError(true);
        //     console.log(error.message);
        //   });
        // } catch {
        //   console.log("catch try");
        //   setErrorGMessage(LOGIN_ERROR);
        //   setGError(true);
        // }
        // });

        // setIsButtonDisabled(false);

        checkErrorStatus(error, setErrorGMessage, setGError, LOGIN_ERROR);

        // if (typeof error !== "object") {
        //   error.json().then((error) => {
        //     setErrorLoginMessage(error.message);
        //     setIsLoginError(true);
        //     setIsButtonDisabled(false);
        //   });
        // } else {
        //   setErrorLoginMessage(LOGIN_ERROR);
        //   setIsButtonDisabled(false);
        // }
      });
    // setIsButtonDisabled(false);
  }

  function handleRegister({ name, email, password }) {
    setErrorRegisterMessage("");
    setErrorGMessage("");
    setIsRegisterError(false);
    setGError(false);
    setIsButtonDisabled(true);
    apiMain
      .register(name, email, password)
      .then((data) => {
        // setIsRegisterError(false);
        setGError(false);
        setIsButtonDisabled(false);
        handleLogin({ email, password });
      })
      .catch((error) => {
        // if (typeof error !== "object") {
        //   error.json().then((error) => {
        //     setErrorRegisterMessage(error.message);
        //     setIsRegisterError(true);
        //     setIsButtonDisabled(false);
        //   });
        // } else {
        //   console.log(REGISTER_ERROR);
        //   setIsRegisterError(true);
        //   setErrorRegisterMessage(REGISTER_ERROR);
        //   setIsButtonDisabled(false);
        // }

        checkErrorStatus(error, setErrorGMessage, setGError, REGISTER_ERROR);

        // setErrorRegisterMessage(error);
        // setIsRegisterError(true);
        // setIsButtonDisabled(false);
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
    console.log("pathname:", pathname);
    //searchMovies - это значение из инпута
    if (pathname === "/movies") {
      console.log("hello movies");
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
        const searchResult = handleSearchMovie(
          movies,
          searchMovies,
          shortMovie
        );

        localStorage.setItem("foundedMovies", JSON.stringify(searchResult));
        setFoundedMovies(searchResult);
      }
    } else {
      console.log("saved movies search---");
      // console.log(shortMovie);
      const savedLocalMovies = JSON.parse(localStorage.getItem("savedMovies"));

      const searchResult = handleSearchMovie(
        savedLocalMovies,
        searchMovies,
        shortSaveMovie
      );
      console.log(searchResult);
      localStorage.setItem("foundedSavedMovies", JSON.stringify(searchResult));
      setQuerySavedMovie(searchMovies);
      setSavedMovies(searchResult);
    }
  }

  function handleCheckbox() {
    // localStorage.setItem("isShortMovie", !shortMovie);
    // const isShortMovie = JSON.parse(localStorage.getItem("isShortMovie"));
    if (pathname === "/movies") {
      setShortMovies(!shortMovie);

      const isFoundedMovies = JSON.parse(localStorage.getItem("foundedMovies"));

      if (isFoundedMovies) {
        const searchInsideResult = handleSearchMovie(
          isFoundedMovies,
          query,
          !shortMovie
        );
        setFoundedMovies(searchInsideResult);
      }
    } else {
      console.log("savedMovie checkbox handle");
      setShortSaveMovie(!shortSaveMovie);

      const isFoundedSavedMovies = JSON.parse(
        localStorage.getItem("foundedSavedMovies")
      );
      if (isFoundedSavedMovies) {
        const searchInsideResult = handleSearchMovie(
          isFoundedSavedMovies,
          querySavedMovie,
          !shortSaveMovie
        );
        setSavedMovies(searchInsideResult);
        console.log(searchInsideResult);
      }
    }
  }

  function handleRemoveClick(card, isLiked, setIsLiked) {
    const token = localStorage.getItem("token");
    console.log(card);
    // console.log(savedMovies);
    const copySavedMovies = [...savedMovies];

    const movieIndex = copySavedMovies.findIndex((item) => {
      // console.log(item.movieId, card.id);
      return item.movieId === card.movieId;
    });

    // console.log(movieIndex);
    console.log(isLiked);
    const movieId = card._id;

    apiMain
      .deleteMovie({ movieId, token })
      .then((result) => {
        // console.log("3)", result);
        // const newSavedMovies = savedMovies.splice(movieIndex, 1);
        // console.log("4) copySavedMovies before cut:", copySavedMovies);

        // const cut = copySavedMovies.splice(movieIndex, 1);
        copySavedMovies.splice(movieIndex, 1);
        // console.log("cut:", cut);
        console.log("4.1) copySavedMovies after cut:", copySavedMovies);

        localStorage.setItem("savedMovies", JSON.stringify(copySavedMovies));
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
    console.log(card);

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

            // const cut = copySavedMovies.splice(movieIndex, 1);
            copySavedMovies.splice(movieIndex, 1);
            // console.log("cut:", cut);
            // console.log("4.1) copySavedMovies after cut:", copySavedMovies);
            localStorage.setItem(
              "savedMovies",
              JSON.stringify(copySavedMovies)
            );
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
          localStorage.setItem(
            "savedMovies",
            JSON.stringify([...savedMovies, data])
          );
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
    setSavedMovies([]);
    setQuerySavedMovie("");
    setQuery("");
    setIsButtonDisabled(false);
    setGError(false);
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
                <Register
                  loggedIn={loggedIn}
                  handleRegister={handleRegister}
                  errorRegisterMessage={errorRegisterMessage}
                  isRegisterError={isRegisterError}
                  isButtonDisabled={isButtonDisabled}
                  setErrorRegisterMessage={setErrorRegisterMessage}
                  pathname={pathname}
                  errorGMessage={errorGMessage}
                  isGError={isGError}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/signin"
            element={
              !loggedIn ? (
                <Login
                  loggedIn={loggedIn}
                  handleLogin={handleLogin}
                  errorLoginMessage={errorLoginMessage}
                  isLoginError={isLoginError}
                  isButtonDisabled={isButtonDisabled}
                  setErrorLoginMessage={setErrorLoginMessage}
                  pathname={pathname}
                  errorGMessage={errorGMessage}
                  isGError={isGError}
                />
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
                handleSearch={handleSearch}
                setSavedMovies={setSavedMovies}
                shortSaveMovie={shortSaveMovie}
                handleCheckbox={handleCheckbox}
                querySavedMovie={querySavedMovie}
                // setShortSaveMovie={setShortSaveMovie}
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
