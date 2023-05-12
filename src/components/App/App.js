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
  // const [isRegisterError, setIsRegisterError] = useState(false);
  // const [isLoginError, setIsLoginError] = useState(false);
  //  стейт для кнопки аутентификации
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [errorAuthMessage, setErrorAuthMessage] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);

  // const [errorRegisterMessage, setErrorRegisterMessage] = useState("");
  // const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [isSearchMessage, setIsSearchMessage] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [foundedSavedMovies, setFoundedSavedMovies] = useState([]);
  //массив для хранения резальтата поиска в сохранённых
  const [savedMoviesSeached, setSavedMoviesSeached] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  //shortMovie  состояние чекбокса
  const [shortMovie, setShortMovies] = useState(false);
  //shortSaveMovie состояние чекбокса для сохранённых фильмов
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
  // const [isLiked, setIsLiked] = useState(false);
  const { width, isScreenSm, isScreenMd, isScreenLg } = useResize();

  // для отображения карточек в зависимости от разрешения
  useEffect(() => {
    console.log("эффект при изменении ширины или foundedMovies");
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
    console.log("юзэффект при монтировании страницы");
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
  //закидываем в локалсторедж данные сохранённых фильмов
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
          setFoundedSavedMovies(data);
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
      // console.log(pathname);
      // setErrorLoginMessage("");
      // setErrorRegisterMessage("");
      setErrorAuthMessage("");
    }
  }, [pathname]);

  // function setFoundedMoviesDef() {
  //   console.log("inside setFoundedMoviesDef");
  //   const isFoundedMovies = JSON.parse(localStorage.getItem("foundedMovies"));
  //   setFoundedMovies(isFoundedMovies);
  // }

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
    setIsAuthError(false);
    // setIsLoginError(false);
    // setErrorLoginMessage("");
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

        // setIsLoginError(false);
        setIsAuthError(false);

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

        checkErrorStatus(
          error,
          setErrorAuthMessage,
          setIsAuthError,
          LOGIN_ERROR
        );

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
    // setErrorRegisterMessage("");
    setErrorAuthMessage("");
    // setIsRegisterError(false);
    setIsAuthError(false);
    setIsButtonDisabled(true);
    apiMain
      .register(name, email, password)
      .then((data) => {
        // setIsRegisterError(false);
        setIsAuthError(false);
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

        checkErrorStatus(
          error,
          setErrorAuthMessage,
          setIsAuthError,
          REGISTER_ERROR
        );

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
        console.log(data);
        setCurrentUser(data);
        setIsProfileUpdated(true);

        setErrorAuthMessage("Профиль обновлён");
      })
      .catch((error) => {
        setIsProfileUpdated(false);
        // console.log(`Ошибка при обновлении профиля: ${error}`);
        checkErrorStatus(
          error,
          setErrorAuthMessage,
          setIsAuthError,
          PROFILE_ERROR
        );
        // setCurrentUser(currentUser);
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
    console.log("pathname:", pathname);
    //searchMovies - это значение из инпута
    // setIsSearchMessage(false);
    setSearchMessageSettings();

    if (pathname === "/movies") {
      console.log("inside handleSearch movies");
      const isLocalMovies = localStorage.getItem("movies");

      if (!isLocalMovies) {
        setIsLoading(true);
        apiMovies
          .getMovies()
          .then((data) => {
            localStorage.setItem("movies", JSON.stringify(data));
            localStorage.setItem("query", searchMovies);
            localStorage.setItem("isShortMovie", shortMovie);
            // localStorage.setItem("isShortMovie", checked);
            setIsLoading(false);
            const searchResult = handleSearchMovie(
              data,
              searchMovies,
              shortMovie
            );

            showSearchMessage(searchResult);

            localStorage.setItem("foundedMovies", JSON.stringify(searchResult));
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
        // localStorage.setItem("isShortMovie", checked);

        // const query = localStorage.getItem("query");
        // const isShortMovie = localStorage.getItem("isShortMovie");

        // const searchResult = handleSearchMovie(movies, searchMovies, checked);
        const searchResult = handleSearchMovie(
          movies,
          searchMovies,
          shortMovie
        );

        showSearchMessage(searchResult);
        // console.log(searchResult.length);
        // if (searchResult.length === 0) {
        //   setSearchMessage(NOT_FOUND);
        //   setIsSearchMessage(true);
        // }

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

      showSearchMessage(searchResult);

      // if (searchResult.length === 0) {
      //   setSearchMessage(NOT_FOUND);
      //   setIsSearchMessage(true);
      // }
      // console.log(savedMovies);
      localStorage.setItem("foundedSavedMovies", JSON.stringify(searchResult));

      setQuerySavedMovie(searchMovies);
      setSavedMoviesSeached(searchResult);
      //для отобржения резальтата поиска
      setFoundedSavedMovies(searchResult);
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
      setShortSaveMovie(!shortSaveMovie);
      console.log(
        "setSavedMoviesSeached inside handleCheckbox",
        savedMoviesSeached
      );

      if (savedMoviesSeached.length > 0) {
        const searchInsideResult = handleSearchMovie(
          savedMoviesSeached,
          querySavedMovie,
          !shortSaveMovie
        );
        setFoundedSavedMovies(searchInsideResult);
      }

      // const isFoundedSavedMovies = JSON.parse(
      //   localStorage.getItem("foundedSavedMovies")
      // );

      // if (isFoundedSavedMovies) {
      //   const searchInsideResult = handleSearchMovie(
      //     isFoundedSavedMovies,
      //     querySavedMovie,
      //     !shortSaveMovie
      //   );
      //   setSavedMovies(searchInsideResult);
      //   console.log(searchInsideResult);
      // }
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

    const savedMoviesIndexSearched = savedMoviesSeached.findIndex((item) => {
      // console.log(item.movieId, card.id);
      return item.movieId === card.movieId;
    });

    // console.log(movieIndex);
    console.log("SavedMoviesSeached", savedMoviesSeached);
    console.log("movieIndexSearched", savedMoviesIndexSearched);

    // console.log(isLiked);
    const movieId = card._id;

    apiMain
      .deleteMovie({ movieId, token })
      .then((result) => {
        // console.log("3)", result);
        // const newSavedMovies = savedMovies.splice(movieIndex, 1);
        // console.log("4) copySavedMovies before cut:", copySavedMovies);

        // const cut = copySavedMovies.splice(movieIndex, 1);
        copySavedMovies.splice(movieIndex, 1);
        // savedMoviesSeached.splice(savedMoviesIndexSearched, 1);

        // console.log("cut:", cut);
        // console.log("4.1) copySavedMovies after cut:", copySavedMovies);

        localStorage.setItem("savedMovies", JSON.stringify(copySavedMovies));
        localStorage.setItem(
          "foundedSavedMovies",
          JSON.stringify(copySavedMovies)
        );

        setSavedMovies(copySavedMovies);
        if (savedMoviesIndexSearched !== -1) {
          savedMoviesSeached.splice(savedMoviesIndexSearched, 1);
          setFoundedSavedMovies(savedMoviesSeached);
          setShortSaveMovie(false);
        } else {
          setFoundedSavedMovies(copySavedMovies);
        }
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
            setFoundedSavedMovies(copySavedMovies);
            setIsLiked(!isLiked);
            localStorage.setItem("savedMovie", JSON.stringify(copySavedMovies));

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
          setFoundedSavedMovies([...foundedSavedMovies, data]);
          console.log("saveMovies:", savedMovies);
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
    setFoundedSavedMovies([]);
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
                  // errorRegisterMessage={errorRegisterMessage}
                  // isRegisterError={isRegisterError}
                  isButtonDisabled={isButtonDisabled}
                  // setErrorRegisterMessage={setErrorRegisterMessage}
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
                  // errorLoginMessage={errorLoginMessage}
                  // isLoginError={isLoginError}
                  isButtonDisabled={isButtonDisabled}
                  // setErrorLoginMessage={setErrorLoginMessage}
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
                // currentUser={currentUser}
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
                // foundedMovies={foundedMovies}
                shortMovie={shortMovie}
                handleMoreClick={handleMoreClick}
                isMore={isMore}
                newMovies={newMovies}
                query={query}
                // isLiked={isLiked}
                handleLikeClick={handleLikeClick}
                isSearchMessage={isSearchMessage}
                searchMessage={searchMessage}
                setSearchMessageSettings={setSearchMessageSettings}
                showSearchMessage={showSearchMessage}
                isLoading={isLoading}
                // setFoundedMoviesDef={setFoundedMoviesDef}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                // saveMovies={savedMovies}
                foundedSavedMovies={foundedSavedMovies}
                handleRemoveClick={handleRemoveClick}
                handleSearch={handleSearch}
                setSavedMovies={setSavedMovies}
                shortSaveMovie={shortSaveMovie}
                handleCheckbox={handleCheckbox}
                querySavedMovie={querySavedMovie}
                setFoundedSavedMovies={setFoundedSavedMovies}
                setSavedMoviesSeached={setSavedMoviesSeached}
                setShortSaveMovie={setShortSaveMovie}
                isSearchMessage={isSearchMessage}
                searchMessage={searchMessage}
                setSearchMessageSettings={setSearchMessageSettings}
                showSearchMessage={showSearchMessage}
                // setShortSaveMovie={setShortSaveMovie}
                // setFoundedMoviesDef={setFoundedMoviesDef}
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
