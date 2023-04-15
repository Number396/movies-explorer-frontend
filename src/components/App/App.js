import { Route, Routes } from "react-router-dom";
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

function App() {
  const [logedIn, setLogedIn] = useState(false);

  return (
    <div className='App'>
      <Header>
        <Navigation logedIn={logedIn} />
      </Header>

      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
        <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/profile"
          element={<Profile />}
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
    </div>


  );
}

export default App;
