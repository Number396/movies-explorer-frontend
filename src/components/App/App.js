import { Navigate, Route, Routes, redirect, useLocation, useNavigate } from "react-router-dom";
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
import { apiAuth } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  let { pathname } = useLocation();

  useEffect(() => {
    console.log('inside useEffec');
    // const isTokenExist = localStorage.getItem("token");
    tokenCheck();
  }, []);

  function handleLogin({ email, password }) {
    // setIsPopupOpen(true);
    console.log(email, password);
    apiAuth
      .login(email, password)
      .then((data) => {
        // console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          // setIsDataLoading(false);
          // pathname = "/movies";
          navigate("/movies", { replace: true });
        }

      })
      .then(() => {
        const token = localStorage.getItem("token");
        apiAuth.checkToken(token)
          .then((data) => {
            setCurrentUser(data);
          })
      })
      // .then(() => tokenCheck())
      .catch((error) => console.log(`Ошибка входа: ${error}`));
  }

  function handleRegister({ name, email, password }) {
    apiAuth.register(name, email, password)
      .then((data) => {

        handleLogin({ email, password });
      })
      .catch((error) => {
        // setInfoTooltipSet({ isOpen: true, isSucceded: false });
        console.log(`Ошибка регистрации: ${error}`);
      });
  }

  function tokenCheck() {
    console.log('login in token check:', loggedIn);
    const token = localStorage.getItem("token");
    console.log('inside token check');
    // console.log(isDataLoading);

    if (token) {
      apiAuth
        .checkToken(token)
        .then((data) => {
          console.log('inside tokenCheck api');
          setLoggedIn(true);
          setCurrentUser(data);
          // console.log(pathname);
          // if (pathname === "/signin") {
          //   pathname = "/";
          // }
          navigate(pathname, { replace: true });
          // console.log(data);
          // setUserData({ email: data.email });
          // navigate("/", { replace: true });
          // setJwtToken({ token });
        })
        .catch((error) => console.log(`Ошибка: ${error}`))
        .finally(() => setIsDataLoading(false));

    }
    else {
      setIsDataLoading(false);
    }
  }


  function handleProfile() {

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
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>


        <Header
          loggedIn={loggedIn}
        />

        <Routes>
          <Route
            path="/"
            element={<Main />}
          />

          <Route
            path="/signup"
            element={<Register loggedIn={loggedIn} handleRegister={handleRegister} />}
          />


          < Route
            path="/signin"
            element={
              // !loggedIn && isDataLoading ?
              !loggedIn ?
                <Login loggedIn={loggedIn} handleLogin={handleLogin} />
                : <Navigate to="/" />
            }
          />

          <Route
            path="/profile"
            element={
              // !isDataLoading ?
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                isDataLoading={isDataLoading}
                // currentUser={currentUser}
                handleProfile={handleProfile}
                onSignoutClick={onSignoutClick}
              />
              // : <Navigate to="/**" />
            }
          />

          <Route
            path="/movies"
            // element={<Movies />}
            element={
              // !isDataLoading ?
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                isDataLoading={isDataLoading}
              />
              // : <Navigate to="/" />
            }
          />

          <Route
            path="/saved-movies"
            element={
              // !isDataLoading &&
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
              />
              // : <Navigate to="/" />
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
