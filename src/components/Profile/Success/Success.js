import successImage from '../../../images/success.png';

function Success({ isSuccess }) {
  const successClassName = `success ${isSuccess ? 'success_open' : ''}`;
  return (
    <div className={successClassName}>
      <div className="success__container">
        <img className="success__image" src={successImage} alt="Успех!"></img>
        <h1 className="success__text">
          Обновление данных профиля прошло успешно!
        </h1>
      </div>
    </div>
  );
}

export default Success;
