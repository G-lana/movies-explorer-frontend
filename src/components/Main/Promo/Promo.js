import promo from '../../../images/promo_image.svg';

function Promo() {
  return (
    <section className="promo" id="promo">
      <div className="promo__container">
        <img className="promo__image" src={promo} alt="promo_image" />
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
    </section>
  );
}

export default Promo;
