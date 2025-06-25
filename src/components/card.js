function removeCard (element) {
  element.remove()
};

function like (element) {
  element.classList.toggle('card__like-button_is-active');
}

function createCard (card, cardTemplate, openImagePopup) {
  const newPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true),
        cardImage = newPlacesItem.querySelector('.card__image'),
        cardTitle = newPlacesItem.querySelector('.card__title'),
        deleteButton = newPlacesItem.querySelector('.card__delete-button'),
        likeButton = newPlacesItem.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => {
    removeCard(newPlacesItem);
  })

  likeButton.addEventListener('click', () => {
    like(likeButton);
  })

  cardImage.addEventListener('click', () => {
    openImagePopup(cardImage.src, cardImage.alt, cardTitle.textContent);
  })

  return newPlacesItem;
}

export { createCard };