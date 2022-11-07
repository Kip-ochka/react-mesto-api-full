function PopupWithForm({
  name,
  title,
  children,
  defaultButtonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  isLoading,
}) {
  const buttonText = isLoading ? 'Сохранение...' : defaultButtonText
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form name={name} className="form" onSubmit={onSubmit}>
          <fieldset className="form__fieldset">{children}</fieldset>
          <button type="submit" className="form__button" disabled={!isValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
