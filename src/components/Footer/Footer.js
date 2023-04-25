import { Route, Routes, useNavigate } from "react-router-dom";

function Footer() {
    // const navigate = useNavigate();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <header className="footer">
                        <h4 className="footer__title">
                            Учебный проект Яндекс.Практикум х BeatFilm.
                        </h4>
                        <div className="footer__separator" />
                        <div className="footer__content">
                            <p className="footer__author">
                                &copy; {new Date().getFullYear()}
                            </p>
                            <nav>
                                <ul className="footer__links">
                                    <li>
                                        <a
                                            className="footer__link"
                                            href="https://practicum.yandex.ru"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Яндекс.Практикум
                                        </a>
                                        <a
                                            className="footer__link"
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Github
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                }
            />
            <Route path="/movies" element={<header></header>} />
            <Route path="/saved-movies" element={<header></header>} />
            <Route path="/profile" element={<header></header>} />
        </Routes>
    );
}
export default Footer;
