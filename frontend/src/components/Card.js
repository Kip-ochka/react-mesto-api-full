import { useContext } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = (card.owner._id||card.owner) === currentUser._id
  const isLiked = card.likes.some((i) => i._id === currentUser._id)
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? '' : 'card__delete-button_type_hidden'
  }`
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_active' : ''
  }`
  
  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => {
          onCardClick(card)
        }}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="card__title-container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-volume">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
