import arrow from "../../images/text__COLOR_font-main.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <p className="portfolio__text">Статичный сайт</p>
          <a
            className="portfolio__link"
            href="https://number396.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-logo" src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__text">Адаптивный сайт</p>
          <a
            className="portfolio__link"
            href="https://number396.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-logo" src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__text">Одностраничное приложение</p>
          <a
            className="portfolio__link"
            href="https://mesto.number396.nomoredomains.work"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-logo" src={arrow} alt="стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
