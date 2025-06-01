// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplade = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const removeElement = element => element.remove();

function addCard (card, removeElement) {
  const newPlacesItem = cardTemplade.querySelector('.places__item').cloneNode(true);
  const cardImage = newPlacesItem.querySelector('.card__image');
  const cardTitle = newPlacesItem.querySelector('.card__title');
  const deleteButton = newPlacesItem.querySelector('.card__delete-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => {
    removeElement(newPlacesItem);
  })

  return newPlacesItem;
}

initialCards.forEach(initialCard => {
  placesList.append( addCard(initialCard, removeElement) );
})