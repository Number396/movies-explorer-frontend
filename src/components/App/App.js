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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiMain } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { apiMovies } from "../../utils/MoviesApi";
import { useResize } from "../../hooks/useResize";
import {
  EMPTY_FIELD,
  LOGIN_ERROR,
  NOT_FOUND,
  PROFILE_ERROR,
  REGISTER_ERROR,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorAuthMessage, setErrorAuthMessage] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [isSearchMessage, setIsSearchMessage] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [showSavedMovies, setShowSavedMovies] = useState([]);
  const [savedMoviesSeached, setSavedMoviesSeached] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortMovie, setShortMovies] = useState(false);
  const [shortSaveMovie, setShortSaveMovie] = useState(false);
  const [query, setQuery] = useState("");
  const [querySavedMovie, setQuerySavedMovie] = useState("");
  const { pathname } = useLocation();
  const [newMovies, setNewMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countS, setCountS] = useState(7);
  const [countM, setCountM] = useState(10);
  const [countL, setCountL] = useState(16);
  const [isMore, setIsMore] = useState(false);
  const { width, isScreenSm, isScreenMd, isScreenLg } = useResize();

  // для отображения карточек в зависимости от разрешения
  useEffect(() => {
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
    tokenCheck();
    const isFoundedMovies = JSON.parse(localStorage.getItem("foundedMovies"));
    const isShortMovie = JSON.parse(localStorage.getItem("isShortMovie"));
    const isQuery = localStorage.getItem("query");

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
    const token = localStorage.getItem("token");
    if (token) {
      apiMain
        .getSavedMovies({ token })
        .then((data) => {
          localStorage.setItem("savedMovies", JSON.stringify(data));
          setSavedMovies(data);
          setShowSavedMovies(data);
        })
        .catch((error) =>
          console.log(`Ошибка получения сохр. фильмов: ${error}`)
        );
    }
  }, [loggedIn]);

  useEffect(() => {
    if (
      pathname === "/signin" ||
      pathname === "/signup" ||
      pathname === "/profile"
    ) {
      setErrorAuthMessage("");
    }
  }, [pathname]);

  function handleMoreClick() {
    if (isScreenSm) {
      setNewMovies(foundedMovies.slice(0, countS));
      setCountS(countS + 2);
      if (foundedMovies.length <= countS) {
        setIsMore(false);
        setCountS(7);
      }
    }

    if (isScreenMd) {
      setNewMovies(foundedMovies.slice(0, countM));
      setCountM(countM + 2);
      if (foundedMovies.length <= countM) {
        setIsMore(false);
        setCountM(10);
      }
    }

    if (isScreenLg) {
      setNewMovies(foundedMovies.slice(0, countL));
      setCountL(countL + 4);
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
      });
    } catch {
      setErrorMessage(messageError);
      setIsError(true);
      setIsButtonDisabled(false);
    }
  }

  function handleLogin({ email, password }) {
    setIsAuthError(false);
    setErrorAuthMessage("");
    setIsButtonDisabled(true);

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

        setIsAuthError(false);

        apiMain.checkToken(token).then((data) => {
          setCurrentUser(data);
        });
      })
      .catch((error) => {
        checkErrorStatus(
          error,
          setErrorAuthMessage,
          setIsAuthError,
          LOGIN_ERROR
        );
      });
  }

  function handleRegister({ name, email, password }) {
    setErrorAuthMessage("");
    setIsAuthError(false);
    setIsButtonDisabled(true);

    apiMain
      .register(name, email, password)
      .then(() => {
        setIsAuthError(false);
        setIsButtonDisabled(false);
        handleLogin({ email, password });
      })
      .catch((error) => {
        checkErrorStatus(
          error,
          setErrorAuthMessage,
          setIsAuthError,
          REGISTER_ERROR
        );
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      apiMain
        .checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(pathname, { replace: true });
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
        setIsProfileUpdated(true);

        setErrorAuthMessage("Профиль обновлён");
      })
      .catch((error) => {
        setIsProfileUpdated(false);
        checkErrorStatus(
          error,
          setErrorAuthMessage,
          setIsAuthError,
          PROFILE_ERROR
        );
      });
  }

  function handleEditClick() {
    setErrorAuthMessage("");
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

  function setSearchMessageSettings() {
    setIsSearchMessage(false);
    setSearchMessage("");
  }

  function showSearchMessage(searchResult) {
    // setIsSearchMessage(false);

    if (searchResult.length === 0) {
      setSearchMessage(NOT_FOUND);
      setIsSearchMessage(true);
    }
    if (searchResult === "") {
      setSearchMessage(EMPTY_FIELD);
      setIsSearchMessage(true);
    }
  }

  function handleSearch({ searchMovies }) {
    setSearchMessageSettings();

    if (pathname === "/movies") {
      const isLocalMovies = localStorage.getItem("movies");

      if (!isLocalMovies) {
        setIsLoading(true);
        apiMovies
          .getMovies()
          .then((data) => {
            localStorage.setItem("movies", JSON.stringify(data));
            localStorage.setItem("query", searchMovies);
            localStorage.setItem("isShortMovie", shortMovie);

            setIsLoading(false);
            const searchResult = handleSearchMovie(
              data,
              searchMovies,
              shortMovie
            );

            localStorage.setItem("foundedMovies", JSON.stringify(searchResult));

            showSearchMessage(searchResult);
            setFoundedMovies(searchResult);
            setQuery(searchMovies);
          })
          .catch((error) => console.log(`Ошибка: ${error}`))
          .finally(() => setIsLoading(false));
      } else {
        const movies = JSON.parse(localStorage.getItem("movies"));

        localStorage.setItem("query", searchMovies);
        localStorage.setItem("isShortMovie", shortMovie);

        setQuery(searchMovies);
        const searchResult = handleSearchMovie(
          movies,
          searchMovies,
          shortMovie
        );

        localStorage.setItem("foundedMovies", JSON.stringify(searchResult));

        showSearchMessage(searchResult);
        setFoundedMovies(searchResult);
      }
    } else {
      const savedLocalMovies = JSON.parse(localStorage.getItem("savedMovies"));

      const searchResult = handleSearchMovie(
        savedLocalMovies,
        searchMovies,
        shortSaveMovie
      );

      showSearchMessage(searchResult);
      setQuerySavedMovie(searchMovies);
      setSavedMoviesSeached(searchResult);
      setShowSavedMovies(searchResult);
    }
  }

  function handleCheckbox() {
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
      setShortSaveMovie(!shortSaveMovie);

      if (savedMoviesSeached.length > 0) {
        const searchInsideResult = handleSearchMovie(
          savedMoviesSeached,
          querySavedMovie,
          !shortSaveMovie
        );

        setShowSavedMovies(searchInsideResult);
      }
    }
  }

  function handleRemoveClick(card, isLiked, setIsLiked) {
    const token = localStorage.getItem("token");
    const copySavedMovies = [...savedMovies];

    const movieIndex = copySavedMovies.findIndex((item) => {
      return item.movieId === card.movieId;
    });

    const savedMoviesIndexSearched = savedMoviesSeached.findIndex((item) => {
      return item.movieId === card.movieId;
    });

    const movieId = card._id;

    apiMain
      .deleteMovie({ movieId, token })
      .then(() => {
        copySavedMovies.splice(movieIndex, 1);

        localStorage.setItem("savedMovies", JSON.stringify(copySavedMovies));

        setSavedMovies(copySavedMovies);

        if (savedMoviesIndexSearched !== -1) {
          savedMoviesSeached.splice(savedMoviesIndexSearched, 1);

          setShowSavedMovies(savedMoviesSeached);
          setShortSaveMovie(false);
        } else {
          setShowSavedMovies(copySavedMovies);
        }
      })
      .catch((error) => console.log(`Ошибка снятия лайка: ${error}`));
  }

  function handleLikeClick(card, isLiked, setIsLiked) {
    const token = localStorage.getItem("token");

    if (isLiked) {
      const copySavedMovies = [...savedMovies];

      const movieIndex = copySavedMovies.findIndex((item) => {
        return item.movieId === card.id;
      });
      // console.log("1) movieIndex:", movieIndex);
      if (movieIndex !== -1) {
        const movieId = copySavedMovies[movieIndex]._id;

        apiMain
          .deleteMovie({ movieId, token })
          .then(() => {
            copySavedMovies.splice(movieIndex, 1);
            localStorage.setItem(
              "savedMovies",
              JSON.stringify(copySavedMovies)
            );
            setSavedMovies(copySavedMovies);
            setShowSavedMovies(copySavedMovies);
            setIsLiked(!isLiked);
            localStorage.setItem("savedMovie", JSON.stringify(copySavedMovies));
          })
          .catch((error) => console.log(`Ошибка снятия лайка: ${error}`));
      }
    } else {
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
          setIsLiked(!isLiked);
        })
        .catch((error) => console.log(`Ошибка установки лайка: ${error}`));
    }
  }

  function onSignoutClick() {
    localStorage.clear();
    navigate("/", { replace: true });
    setLoggedIn(false);
    setCurrentUser({});
    setFoundedMovies([]);
    setSavedMovies([]);
    setShowSavedMovies([]);
    setSavedMoviesSeached([]);
    setQuerySavedMovie("");
    setQuery("");
    setSearchMessage("");
    setIsButtonDisabled(false);
    setIsAuthError(false);
    setShortMovies(false);
    setShortSaveMovie(false);
    setIsSearchMessage(false);
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
                  isButtonDisabled={isButtonDisabled}
                  pathname={pathname}
                  errorAuthMessage={errorAuthMessage}
                  isAuthError={isAuthError}
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
                  isButtonDisabled={isButtonDisabled}
                  pathname={pathname}
                  errorAuthMessage={errorAuthMessage}
                  isAuthError={isAuthError}
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
                handleProfile={handleProfile}
                onSignoutClick={onSignoutClick}
                errorAuthMessage={errorAuthMessage}
                handleEditClick={handleEditClick}
                isProfileUpdated={isProfileUpdated}
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
                shortMovie={shortMovie}
                handleMoreClick={handleMoreClick}
                isMore={isMore}
                newMovies={newMovies}
                query={query}
                handleLikeClick={handleLikeClick}
                isSearchMessage={isSearchMessage}
                searchMessage={searchMessage}
                setSearchMessageSettings={setSearchMessageSettings}
                showSearchMessage={showSearchMessage}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                showSavedMovies={showSavedMovies}
                handleRemoveClick={handleRemoveClick}
                handleSearch={handleSearch}
                setSavedMovies={setSavedMovies}
                shortSaveMovie={shortSaveMovie}
                handleCheckbox={handleCheckbox}
                querySavedMovie={querySavedMovie}
                setShowSavedMovies={setShowSavedMovies}
                setSavedMoviesSeached={setSavedMoviesSeached}
                setShortSaveMovie={setShortSaveMovie}
                isSearchMessage={isSearchMessage}
                searchMessage={searchMessage}
                setSearchMessageSettings={setSearchMessageSettings}
                showSearchMessage={showSearchMessage}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
