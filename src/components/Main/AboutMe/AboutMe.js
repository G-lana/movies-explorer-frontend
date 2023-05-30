import author from '../../../images/my_photo.jpg';

function AboutMe () {
    return (
        <section className="about-me" id="about-me">
        <div className="about-me__block">
        <div className="about-me__container">
          <h2 className="about-me__title">Студент</h2>
        </div>
        <div className="about-me__info_container">
          <div className="about-me__info_profile">
            <h2 className="about-me__info_name">Светлана</h2>
            <h3 className="about-me__info_about">Веб-разработчик, 21 год</h3>
            <p className="about-me__info_text">Я живу в Краснодаре, закончила факультет экономики РЭУ Плеханова. Увлекаюсь психологией и занимаюсь творчеством. Недавно начала кодить. После курса планирую работать в сфере IT и найти идеальную страну для жизни.</p>
          </div>
          <img className="about-me__info_photo" src={author} alt="author" />
        </div>
        <a className="about-me__gh" href="https://github.com/G-lana">Github</a>
      </div>
      </section>
    )
}

export default AboutMe;