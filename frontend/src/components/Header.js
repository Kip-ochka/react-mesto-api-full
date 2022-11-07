import logo from '../images/logos/logo.svg'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

function Header({ loggedIn, profileEmail, handleUserLogOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Russia" className="header__logo" />
      <div className="header__user-wrapper">
        <p className="header__user-email">{loggedIn ? profileEmail : ''}</p>
        <Routes>
          <Route
            path="sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                className="header__link"
                to="/sign-in"
                onClick={() => {
                  handleUserLogOut()
                }}
              >
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  )
}

export default Header
