import { Link } from 'react-router-dom'
import { useFormAndValidation } from '../hooks/useFormAndValidation'
import { useEffect } from 'react'

const Register = ({ onRegistration }) => {
  const accountData = {
    password: '',
    email: '',
  }
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(accountData)

  function handleRegistrationSubmit(evt) {
    evt.preventDefault()
    onRegistration(values.password, values.email)
  }

  useEffect(() => {
    resetForm(accountData)
  }, [])
  return (
    <section className="auth">
      <form className="form" onSubmit={handleRegistrationSubmit}>
        <h3 className="form__title">Регистрация</h3>
        <label className="form__formfield form__formfield_type_name">
          <input
            type="email"
            className="form__input form__input_type_auth"
            placeholder="Email"
            name="email"
            minLength="3"
            maxLength="100"
            value={values.email || ''}
            onChange={handleChange}
            required
          />
          <span
            className={`form__input-error form__input-error_type_auth ${
              isValid ? '' : 'form__input-error_active'
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="form__formfield ">
          <input
            type="password"
            className="form__input form__input_type_auth"
            placeholder="Пароль"
            name="password"
            minLength="3"
            maxLength="100"
            value={values.password || ''}
            onChange={handleChange}
            required
          />
          <span
            className={`form__input-error form__input-error_type_auth ${
              isValid ? '' : 'form__input-error_active'
            }`}
          >
            {errors.password}
          </span>
        </label>
        <button
          type="submit"
          name="login"
          className="form__button form__button_type_auth"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <p className="auth__caption">
          Уже зарегестрированы?
          <Link
            className="auth__caption auth__caption_type_link"
            to={'/sign-in'}
          >
            {' '}
            Войти
          </Link>
        </p>
      </form>
    </section>
  )
}

export { Register }
