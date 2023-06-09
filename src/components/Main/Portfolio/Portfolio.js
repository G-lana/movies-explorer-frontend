import arrow from '../../../images/link-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__links_container">
        <ul className="portfolio__links_list">
          <li className="portfolio__links">
            <div>
              <a
                rel="noreferrer"
                target="_blank"
                className="portfolio__link portfolio__link_static"
                href="https://github.com/G-lana/how-to-learn"
              >
                Статичный сайт <img src={arrow} alt="link-arrow" />
              </a>
            </div>
          </li>
          <li className="portfolio__links">
            <div>
              <a
                rel="noreferrer"
                target="_blank"
                className="portfolio__link portfolio__link_adaptive"
                href="https://github.com/G-lana/russian-travel"
              >
                Адаптивный сайт <img src={arrow} alt="link-arrow" />
              </a>
            </div>
          </li>
          <li className="portfolio__links">
            <div>
              <a
                rel="noreferrer"
                target="_blank"
                className="portfolio__link portfolio__link_one-page"
                href="https://github.com/G-lana/react-mesto-api-full-gha"
              >
                Одностраничное приложение <img src={arrow} alt="link-arrow" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
