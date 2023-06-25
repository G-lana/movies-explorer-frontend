function More({ onMoreClick, isButtonActive }) {
  return (
    isButtonActive && (
      <div className="more">
        <button className="more__button" onClick={onMoreClick}>
          Ещё
        </button>
      </div>
    )
  );
}

export default More;
