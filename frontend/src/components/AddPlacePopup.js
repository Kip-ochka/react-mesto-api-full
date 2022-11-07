import PopupWithForm from './PopupWithForm'
import { useEffect } from 'react'
import { useFormAndValidation } from '../hooks/useFormAndValidation'

const AddPlacePopup = ({ isOpen, onClose, onAddCard, isLoading }) => {
  const cardData = {
    name: '',
    link: '',
  }

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(cardData)
  useEffect(() => {
    resetForm(cardData)
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddCard({ values })
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      defaultButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className="form__formfield form__formfield_type_place-name">
        <input
          type="text"
          className="form__input form__input_type_place-name"
          placeholder="Название"
          id="name"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error form__input-error_type_name ${
            isValid ? '' : 'form__input-error_active'
          }`}
        >
          {errors.name}
        </span>
      </label>
      <label className="form__formfield form__formfield_type_link">
        <input
          type="url"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          required
          value={values.link || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error form__input-error_type_link ${
            isValid ? '' : 'form__input-error_active'
          }`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
