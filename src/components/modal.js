function openModal (element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', addEscListener);
}

function closeModal (element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', addEscListener);
}

function closeByClick (e) {
  if ( e.target.classList.contains('popup__close') 
    || e.target.classList.contains('popup') 
  ) { 
    closeModal(e.currentTarget); 
  } 
}

function addEscListener (e) {
  if (e.key === 'Escape') {
    closeModal( document.querySelector('.popup_is-opened') );
  }
}

export { openModal, closeModal, closeByClick, addEscListener };