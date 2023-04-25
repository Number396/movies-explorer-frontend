import { Route, Routes, useNavigate, } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ logedIn }) {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={
                <header className="header"  >
                </header >
            } />
            <Route path="/movies" element={
                <header >
                </header >
            } />
            <Route path="/saved-movies" element={
                <header >
                </header >
            } />
            <Route path="/profile" element={
                <header >
                </header >
            } />
        </Routes>
    );
}
export default Header;