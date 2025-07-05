import './index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal, closeByClick, addEscListener } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getCards, patchUserAvatar, patchUserInfo, postCard, deleteCard, likeCard } from './components/api.js';

// #region Global variables declaration

const cardTemplate = document.querySelector('#card-template').content,
      placesList = document.querySelector('.places__list'),
      popups = document.querySelectorAll('.popup'),
      popupAvatar = document.querySelector('.popup_type_change-avatar'),
      popupEdit = document.querySelector('.popup_type_edit'),
      popupNewCard = document.querySelector('.popup_type_new-card'),
      profileEditButton = document.querySelector('.profile__edit-button'),
      profileAddButton = document.querySelector('.profile__add-button'),
      profileTitle = document.querySelector('.profile__title'),
      profileDescription = document.querySelector('.profile__description'),
      profileAvatar = document.querySelector('.profile__image'),
      avatarForm = document.forms['change-avatar'],
      avatarFormLink = avatarForm['avatar-link'],
      profileForm = document.forms['edit-profile'],
      profileFormName = profileForm['name'],
      profileFormDescription = profileForm['description'],
      placeForm = document.forms['new-place'],
      placeFormName = placeForm['place-name'],
      placeFormLink = placeForm['link'],
      popupImage = document.querySelector('.popup_type_image'),
      popupImagePicture = popupImage.querySelector('.popup__image'),
      popupImageText = popupImage.querySelector('.popup__caption'),
      buttonDisabledClass = 'popup__button_disabled',
      popupIsAnimatedClass = 'popup_is-animated',
      altBttonText = 'Сохранение...';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let userId;

// #endregion

// #region Functions

function handleAvatarFormSubmit(e) {
  if (!e.submitter.classList.contains(buttonDisabledClass)) {
    const mainButtonText = e.submitter.textContent;
    e.submitter.textContent = altBttonText;
    patchUserAvatar(avatarFormLink.value)
      .then(userInfo => {
        profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
        e.submitter.textContent = mainButtonText;
        avatarForm.reset();
        clearValidation(popupAvatar, validationConfig);
        closeModal(popupAvatar);
      })
  }
}

function handleProfileFormSubmit(e) {
  if (!e.submitter.classList.contains(buttonDisabledClass)) {
    const mainButtonText = e.submitter.textContent;
    e.submitter.textContent = altBttonText;
    patchUserInfo(profileFormName.value, profileFormDescription.value)
      .then(userInfo => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        e.submitter.textContent = mainButtonText;
        closeModal(popupEdit);
      })
  }
}

function handlePlaceFormSubmit(e) {
  if (!e.submitter.classList.contains(buttonDisabledClass)) {
    const mainButtonText = e.submitter.textContent;
    e.submitter.textContent = altBttonText;
    postCard(placeFormName.value, placeFormLink.value)
      .then(card => {
        placesList.prepend(
          createCard(card, cardTemplate, userId, deleteCard, likeCard, openImagePopup)
        )
        e.submitter.textContent = mainButtonText;
        placeForm.reset();
        clearValidation(popupNewCard, validationConfig);
        closeModal(popupNewCard);
      })
  }
}

function openImagePopup (src, alt, textContent) {
  openModal(popupImage);
  addEscListener(popupImage);
  popupImagePicture.src = src;
  popupImagePicture.alt = alt;
  popupImageText.textContent = textContent;
}

// #endregion

// #region Listners

profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  addEscListener(popupAvatar);
})

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

profileEditButton.addEventListener('click', () => {
  openModal(popupEdit);
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  addEscListener(popupEdit);
})

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
  addEscListener(popupNewCard);
})

placeForm.addEventListener('submit', handlePlaceFormSubmit);

// #endregion

// #region Initialization

popups.forEach(popup => {
  popup.classList.add(popupIsAnimatedClass);
  popup.addEventListener('click', closeByClick)
})

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;
    cards.forEach(card => {
      placesList.append(
        createCard(card, cardTemplate, userId, deleteCard, likeCard, openImagePopup)
      )
    })
  })

// #endregion