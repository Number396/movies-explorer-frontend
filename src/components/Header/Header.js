import { NavLink, Route, Routes, useLocation } from "react-router-dom";

function Header({ children }) {
    const { pathname } = useLocation();
    return (
        // <header className={`header ${logedIn && 'header_active'}`} >
        <Routes>
            <Route path="/" element={
                <header className="header"  >
                    <div className="header__logo"></div>
                    {children}
                </header >
            } />
            <Route path="/movies" element={
                <header className="header header_active"  >
                    <div className="header__logo"></div>
                    {children}
                </header >
            } />
            <Route path="/saved-movies" element={
                <header className="header header_active"  >
                    <div className="header__logo"></div>
                    {children}
                </header >
            } />
            <Route path="/profile" element={
                <header className="header header_active"  >
                    <div className="header__logo"></div>
                    {children}
                </header >
            } />





        </Routes>
    );
}
export default Header;