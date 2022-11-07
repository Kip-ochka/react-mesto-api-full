import { useContext, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { useFormAndValidation } from '../hooks/useFormAndValidation'

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const user = useContext(CurrentUserContext)
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(user)

  useEffect(
    () => {
      setValues(user)
      if (!isOpen) {
        resetForm()
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isOpen]
  )

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({ values })
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      defaultButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className="form__formfield form__formfield_type_name">
        <input
          type="text"
          className="form__input form__input_type_name"
          placeholder="Имя"
          id="profilename"
          name="name"
          minLength="2"
          maxLength="40"
          required
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
      <label className="form__formfield form__formfield_type_job ">
        <input
          type="text"
          className="form__input form__input_type_job"
          placeholder="О себе"
          id="about"
          name="about"
          minLength="2"
          maxLength="200"
          required
          value={values.about || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error form__input-error_type_about ${
            isValid ? '' : 'form__input-error_active'
          }`}
        >
          {errors.about}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
