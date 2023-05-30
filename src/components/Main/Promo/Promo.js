import promo from '../../../images/promo_image.svg';

function Promo() {
  return (
    <div className="promo__container">
      <section className="promo" id="promo">
        <img className="promo__image" src={promo} alt="promo_image" />
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </section>
    </div>
  );
}

export default Promo;
