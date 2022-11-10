import { useFormAndValidation } from '../hooks/useFormAndValidation'
import { useEffect } from 'react'

const Login = ({ onLogin }) => {
  const loginData = {
    email: '',
    password: '',
  }

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(loginData)

  function handleLoginSubmit(evt) {
    evt.preventDefault()
    onLogin(values.password, values.email)
  }

  useEffect(() => {
    resetForm(loginData)
  }, [])

  return (
    <section className='auth'>
      <form className='form' onSubmit={handleLoginSubmit}>
        <h3 className='form__title'>Вход</h3>
        <label className='form__formfield form__formfield_type_name'>
          <input
            type='email'
            className='form__input form__input_type_auth'
            placeholder='Email'
            name='email'
            minLength='3'
            maxLength='40'
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
        <label className='form__formfield '>
          <input
            type='password'
            className='form__input form__input_type_auth'
            placeholder='Пароль'
            name='password'
            minLength='3'
            maxLength='40'
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
          type='submit'
          name='login'
          className='form__button form__button_type_auth'
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </section>
  )
}

export { Login }
