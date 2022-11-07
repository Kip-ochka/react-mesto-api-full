import PopupWithForm from './PopupWithForm'
import { useEffect } from 'react'
import { useFormAndValidation } from '../hooks/useFormAndValidation'

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const avatarData = { avatar: '' }
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(avatarData)

  useEffect(() => {
    setValues(avatarData)
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: values,
    })
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      defaultButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className="form__formfield form__formfield_type_link">
        <input
          type="url"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          id="avatar"
          name="avatar"
          required
          value={values.avatar || ''}
          onChange={handleChange}
        />
        <span
          className={`form__input-error form__input-error_type_link ${
            isValid ? '' : 'form__input-error_active'
          }`}
        >
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  )
}
export default EditAvatarPopup
