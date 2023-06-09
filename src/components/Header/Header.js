import { Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className={`header ${loggedIn && "header_active"} `}>
            <div className="header__logo" onClick={() => navigate("/")} />
            <Navigation loggedIn={loggedIn} />
          </header>
        }
      />
      <Route
        path="/movies"
        element={
          <header className="header header_active">
            <div className="header__logo" onClick={() => navigate("/")} />
            <Navigation loggedIn={loggedIn} />
          </header>
        }
      />
      <Route
        path="/saved-movies"
        element={
          <header className="header header_active">
            <div className="header__logo" onClick={() => navigate("/")} />
            <Navigation loggedIn={loggedIn} />
          </header>
        }
      />
      <Route
        path="/profile"
        element={
          <header className="header header_active">
            <div className="header__logo" onClick={() => navigate("/")} />
            <Navigation loggedIn={loggedIn} />
          </header>
        }
      />
      <Route path="/signin" element={<div />} />
      <Route path="/signup" element={<div />} />
    </Routes>
  );
}
export default Header;
