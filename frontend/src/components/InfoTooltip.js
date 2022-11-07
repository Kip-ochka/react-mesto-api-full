import successIcon from '../images/icons/icon-success.svg'
import failIcon from '../images/icons/icon-fail.svg'

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div
      className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <div className="popup__wrapper">
          <img
            className="popup__image"
            alt="icon"
            src={isSuccess ? successIcon : failIcon}
          />
          <p className="popup__result">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export { InfoTooltip }
