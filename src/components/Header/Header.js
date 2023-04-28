import { Route, Routes, useNavigate, } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ logedIn }) {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={
                <header className="header"  >
                    <div className="header__logo" onClick={() => navigate('/')} />
                    <Navigation logedIn={logedIn} />
                </header >
            } />
            <Route path="/movies" element={
                <header className="header header_active"  >
                    <div className="header__logo" onClick={() => navigate('/')} />
                    <Navigation logedIn={true} />
                </header >
            } />
            <Route path="/saved-movies" element={
                <header className="header header_active"  >
                    <div className="header__logo" onClick={() => navigate('/')} />
                    <Navigation logedIn={true} />
                </header >
            } />
            <Route path="/profile" element={
                <header className="header header_active"  >
                    <div className="header__logo" onClick={() => navigate('/')} />
                    <Navigation logedIn={true} />
                </header >
            } />

        </Routes>
    );
}
export default Header;