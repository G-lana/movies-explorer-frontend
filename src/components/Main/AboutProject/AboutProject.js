function AboutProject () {
    return (
        <section className="about-project" id="project">
          <div className="about-project__block">
            <div className="about-project__title_container">
              <h2 className="about-project__title">О проекте</h2>
            </div>
            <div className="about-project__container">
              <div className="about-project_info_container">
                <h3 className="about-project_info_title">Дипломный проект включал 5 этапов</h3>
                <p className="about-project_info_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              </div>
              <div className="about-project_info_container">
                <h3 className="about-project_info_title">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project_info_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </div>
            </div>
            <div className="about-project__time">
              <div className="about-project__time_backend"><p className="about-project__time_text about-project__time_text_black">1 неделя</p></div>
              <div className="about-project__time_frontend"><p className="about-project__time_text about-project__time_text_grey">4 недели</p></div>
              <span className="about-project__technologie">Back-end</span>
              <span className="about-project__technologie">Front-end</span>
           </div>
          </div>
        </section>
    )
}
export default AboutProject;