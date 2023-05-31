function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__description">
          <p className="description">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
        </div>
        <div className="footer__about">
          <p className="footer__text footer__text_year">©2023</p>
          <div className="footer__author">
            <p className="footer__text footer__text_name">Галкина Светлана</p>
            <a
              className="footer__text footer__text_gh"
              href="https://github.com/G-lana"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
