function createCard (card, cardTemplate, userId, deleteCard, likeCard, openImagePopup, confirmDeletion) {
  const newPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true),
        cardImage = newPlacesItem.querySelector('.card__image'),
        cardTitle = newPlacesItem.querySelector('.card__title'),
        deleteButton = newPlacesItem.querySelector('.card__delete-button'),
        likeButton = newPlacesItem.querySelector('.card__like-button'),
        likeCounter = newPlacesItem.querySelector('.card__like-button-counter'),
        isActiveLikeClass = 'card__like-button_is-active',
        isHiddenDeleteClass = 'card__delete-button_hidden';

  newPlacesItem.id = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  if (card.likes.some(like => like._id === userId)) {
    likeButton.classList.add(isActiveLikeClass);
  }

  if (userId !== card.owner._id) {
    deleteButton.classList.add(isHiddenDeleteClass);
  }

  deleteButton.addEventListener('click', () => {
    confirmDeletion()
      .then(() => deleteCard(newPlacesItem))
      .catch(err => {})
  })

  likeButton.addEventListener('click', () => {
    likeCard(newPlacesItem, likeButton, likeCounter, isActiveLikeClass);
  })

  cardImage.addEventListener('click', () => {
    openImagePopup(cardImage.src, cardImage.alt, cardTitle.textContent);
  })

  return newPlacesItem;
}

export { createCard };