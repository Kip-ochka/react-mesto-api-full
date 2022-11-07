import { useContext } from 'react'
import loadAvatar from '../images/icons/loading.svg'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-wrapper">
            <img
              src={currentUser.avatar ? currentUser.avatar : loadAvatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
            <div
              className="profile__avatar-overlay"
              onClick={onEditAvatar}
            ></div>
          </div>
          <div className="profile__info">
            <div className="profile__text-container">
              <h1 className="profile__name">
                {currentUser.name ? currentUser.name : 'Загрузка...'}
              </h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__job">
              {currentUser.about ? currentUser.about : 'Загрузка...'}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="card-grid">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main
