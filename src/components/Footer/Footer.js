import { Route, Routes, useLocation } from "react-router-dom";

function Footer() {
    const { pathname } = useLocation();
    const route = (pathname === "/" || pathname === "/saved-movies" || pathname === "/movies" ? true : false);

    return (
        <Routes>
            <Route
                path={pathname}
                element={route &&
                    <footer className="footer">
                        <h4 className="footer__title">
                            Учебный проект Яндекс.Практикум х BeatFilm.
                        </h4>
                        <div className="footer__separator" />
                        <div className="footer__content">
                            <p className="footer__author">
                                &copy; {new Date().getFullYear()}
                            </p>
                            <nav>
                                <ul className="footer__link-container">
                                    <li className="footer__links">
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
                    </footer>
                }
            />
        </Routes>
    );
}
export default Footer;
