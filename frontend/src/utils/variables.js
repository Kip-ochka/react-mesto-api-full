const buttonOpenEditProfile = document.querySelector('.profile__edit-button')
const popUpEditProfile = '.popup_type_edit-profile'
const cardGrid = document.querySelector('.card-grid')
const buttonAddNewCard = document.querySelector('.profile__add-button')
const popUpAdd = '.popup_type_add-card'
const profileJobTextContent = '.profile__job'
const profileNameTextContent = '.profile__name'
const profileAvatarSelector = '.profile__avatar'
const popUpPreview = '.popup_type_opened-photo'
const popupSubmit = '.popup_type_confirm'
const popupAvatar = '.popup_type_avatar'
const avatarButtom = document.querySelector('.profile__avatar-wrapper')

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

export {
  avatarButtom,
  popupAvatar,
  popupSubmit,
  buttonOpenEditProfile,
  popUpEditProfile,
  cardGrid,
  buttonAddNewCard,
  popUpAdd,
  profileJobTextContent,
  profileNameTextContent,
  popUpPreview,
  config,
  profileAvatarSelector,
}
