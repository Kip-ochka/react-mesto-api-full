import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import ImagePopup from './ImagePopup'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { ProtectedRoute } from './ProtectedRoute'
import { InfoTooltip } from './InfoTooltip'
import { auth } from '../utils/Auth'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard
  const [profileEmail, setProfileEmail] = useState('')

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopup()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
      }
    }
  }, [isOpen])

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api
      .setUserInfo(userInfo.values)
      .then((newUserData) => {
        setCurrentUser(newUserData)
        closeAllPopup()
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true)
    api
      .updateAvatar(avatarData.avatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar)
        closeAllPopup()
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddCard(cardData) {
    setIsLoading(true)
    api
      .addCard(cardData.values)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopup()
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleClosePopup(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close-button')
    ) {
      closeAllPopup()
    }
  }

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({})
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id)
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => setCards(cards.filter((item) => item._id !== card._id)))
      .catch((err) => console.log(err))
  }

  function onRegistration(password, email) {
    auth
      .signUp(password, email)
      .then(() => {
        navigate('/sign-in')
        setIsSuccess(true)
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function onLogin(password, email) {
    auth
      .signIn(password, email)
      .then((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token)
          setProfileEmail(email)
          setLoggedIn(true)
          navigate('/')
        }
        return response
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
        setIsInfoTooltipOpen(true)
      })
  }

  function handleUserLogOut() {
    if (loggedIn) {
      localStorage.removeItem('token')
      setProfileEmail('')
      setLoggedIn(false)
      navigate('/')
    }
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((response) => {
          setProfileEmail(response.data.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch((e) => {
          console.log(e)
          navigate('/sign-in')
          setLoggedIn(false)
        })
    }
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Header
            loggedIn={loggedIn}
            profileEmail={profileEmail}
            handleUserLogOut={handleUserLogOut}
          />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/sign-up'
              element={<Register onRegistration={onRegistration} />}
            />
            <Route path='/sign-in' element={<Login onLogin={onLogin} />} />
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClosePopup}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleClosePopup}
            onAddCard={handleAddCard}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClosePopup}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            buttonText='Да'
            onClose={closeAllPopup}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopup}
            isOpen={isImagePopupOpen}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopup}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
