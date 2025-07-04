function enableValidation (validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const button = form.querySelector(validationConfig.submitButtonSelector);
    form.addEventListener('submit', e => e.preventDefault());
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(form, inputElement, validationConfig);
        toggleButtonState(inputList, button, validationConfig);
      });
    });
  })
};

function clearValidation (form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(inputElement => hideInputError(form, inputElement, validationConfig));
  toggleButtonState(inputList, button, validationConfig);
};

function checkInputValidity (form, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validity.patternMismatch
      ? inputElement.dataset.errorMessage
      : inputElement.validationMessage;
    showInputError(form, inputElement, errorMessage, validationConfig);
  } else {
    hideInputError(form, inputElement, validationConfig);
  }
};

const showInputError = (form, inputElement, errorMessage, validationConfig) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (form, inputElement, validationConfig) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput (inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

function toggleButtonState (inputList, button, validationConfig) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export { enableValidation, clearValidation };