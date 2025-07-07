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
      popupConfirmation = document.querySelector('.popup_type_confirmation'),
      popupConfirmationButton = popupConfirmation.querySelector('.popup__button'),
      buttonDisabledClass = 'popup__button_disabled',
      popupIsAnimatedClass = 'popup_is-animated',
      popipIsOpened = 'popup_is-opened',
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
  e.preventDefault();
  if (!e.submitter.classList.contains(buttonDisabledClass)) {
    const mainButtonText = e.submitter.textContent;
    e.submitter.textContent = altBttonText;
    patchUserAvatar(avatarFormLink.value)
      .then(userInfo => {
        profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
        avatarForm.reset();
        closeModal(popupAvatar);
      })
      .catch(err => console.log(err))
      .finally(e.submitter.textContent = mainButtonText);
  }
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  if (!e.submitter.classList.contains(buttonDisabledClass)) {
    const mainButtonText = e.submitter.textContent;
    e.submitter.textContent = altBttonText;
    patchUserInfo(profileFormName.value, profileFormDescription.value)
      .then(userInfo => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        closeModal(popupEdit);
      })
      .catch(err => console.log(err))
      .finally(e.submitter.textContent = mainButtonText);
  }
}

function handlePlaceFormSubmit(e) {
  e.preventDefault();
  if (!e.submitter.classList.contains(buttonDisabledClass)) {
    const mainButtonText = e.submitter.textContent;
    e.submitter.textContent = altBttonText;
    postCard(placeFormName.value, placeFormLink.value)
      .then(card => {
        placesList.prepend(
          createCard(card, cardTemplate, userId, deleteCard, likeCard, openImagePopup, confirmDeletion)
        )
        placeForm.reset();
        closeModal(popupNewCard);
      })
      .catch(err => console.log(err))
      .finally(e.submitter.textContent = mainButtonText);
  }
}

function openImagePopup (src, alt, textContent) {
  openModal(popupImage);
  addEscListener(popupImage);
  popupImagePicture.src = src;
  popupImagePicture.alt = alt;
  popupImageText.textContent = textContent;
}


function confirmDeletion () {
  return new Promise((resolve) => {
    let isConfirmed = false;
    const addConfirmationFlag = () => {
      isConfirmed = true;
      closeModal(popupConfirmation);
    }

    openModal(popupConfirmation);
    popupConfirmationButton.addEventListener('click', addConfirmationFlag);

    const observer = new MutationObserver(() => {
      if (!popupConfirmation.classList.contains(popipIsOpened)) {
        observer.disconnect();
        popupConfirmationButton.removeEventListener('click', addConfirmationFlag);
        resolve(isConfirmed);
      }
    })

    observer.observe(popupConfirmation, {
      attributes: true,
      attributeFilter: ['class']
    })
  })
}

// #endregion

// #region Listners

profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  avatarFormLink.value = '';
  clearValidation(popupAvatar, validationConfig);
})

avatarForm.addEventListener('submit', handleAvatarFormSubmit)

profileEditButton.addEventListener('click', () => {
  openModal(popupEdit);
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
})

profileForm.addEventListener('submit', handleProfileFormSubmit)

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
  placeFormName.value = '';
  placeFormLink.value = '';
  clearValidation(popupNewCard, validationConfig);
})

placeForm.addEventListener('submit', handlePlaceFormSubmit)

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
        createCard(card, cardTemplate, userId, deleteCard, likeCard, openImagePopup, confirmDeletion)
      )
    })
  })
  .catch(err => console.log(err));

// #endregion