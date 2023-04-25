import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../Saved-movies/Saved-movies";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import PageNotFound from "../PageNotFoud/PageNotFound";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Виталий" });
  const navigate = useNavigate();

  function handleLogin() {

  }
  function handleRegister() {

  }
  function handleProfile() {

  }
  function onSignoutClick() {
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  return (
    <div className='App'>
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
            currentUser={currentUser}
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
    </div>



  );
}

export default App;
