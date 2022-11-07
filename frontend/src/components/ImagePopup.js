function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div
      className={`popup popup_type_opened-photo ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <figure className="popup__container popup__container_type_opened-photo">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button popup__close-button_type_opened-photo"
        ></button>
        <img src={card.link} alt={card.name} className="popup__opened-photo" />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
