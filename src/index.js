import './index.css';
import { initialCards } from './components/cards.js';
import { createCard, removeCard, like } from './components/card.js';
import { openModal, closeModal, closeByClick, addEscListener } from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content,
      placesList = document.querySelector('.places__list'),
      popups = document.querySelectorAll('.popup'),
      popupEdit = document.querySelector('.popup_type_edit'),
      popupNewCard = document.querySelector('.popup_type_new-card'),
      profileEditButton = document.querySelector('.profile__edit-button'),
      profileAddButton = document.querySelector('.profile__add-button'),
      profileTitle = document.querySelector('.profile__title'),
      profileDescription = document.querySelector('.profile__description'),
      profileForm = document.forms['edit-profile'],
      profileFormName = profileForm['name'],
      profileFormDescription = profileForm['description'],
      placeForm = document.forms['new-place'],
      placeFormName = placeForm['place-name'],
      placeFormLink = placeForm['link'],
      popupImage = document.querySelector('.popup_type_image'),
      popupImagePicture = popupImage.querySelector('.popup__image'),
      popupImageText = popupImage.querySelector('.popup__caption');

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closeModal(popupEdit);
}

function handlePlaceFormSubmit(e) {
  e.preventDefault();
  const newCard = {
    name: placeFormName.value,
    link: placeFormLink.value
  }
  placesList.prepend( createCard(newCard, cardTemplate, removeCard, like, openImagePopup) );
  placeForm.reset();
  closeModal(popupNewCard);
}

profileEditButton.addEventListener('click', () => {
  openModal(popupEdit);
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  addEscListener(popupEdit);
})

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
  addEscListener(popupNewCard);
})

placeForm.addEventListener('submit', handlePlaceFormSubmit);

function openImagePopup (src, alt, textContent) {
  openModal(popupImage);
  addEscListener(popupImage);
  popupImagePicture.src = src;
  popupImagePicture.alt = alt;
  popupImageText.textContent = textContent;
}

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closeByClick)
})

initialCards.forEach(initialCard => {
  placesList.append( createCard(initialCard, cardTemplate, removeCard, like, openImagePopup) );
})