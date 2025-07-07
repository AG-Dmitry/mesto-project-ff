function like (currentCard, button, isActiveClass, counter, likeCard) {
  likeCard(currentCard, button, isActiveClass)
    .then (updatedCard => {
      button.classList.toggle(isActiveClass);
      counter.textContent = updatedCard.likes.length;
    })
    .catch(err => console.log(err));
}

function remove (card, deleteCard, confirmDeletion) {
  confirmDeletion()
    .then(isConfirmed => {
      if (isConfirmed) {
        deleteCard(card)
          .then(card.remove())
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}

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
    remove(newPlacesItem, deleteCard, confirmDeletion);
  })

  likeButton.addEventListener('click', () => {
    like(newPlacesItem, likeButton, isActiveLikeClass, likeCounter, likeCard);
  })

  cardImage.addEventListener('click', () => {
    openImagePopup(cardImage.src, cardImage.alt, cardTitle.textContent);
  })

  return newPlacesItem;
}

export { createCard };