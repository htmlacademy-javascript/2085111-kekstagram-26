import {isEscapeKey} from './utils.js';
import {onImageFormEscKeydown} from './form-of-loading-new-foto.js';

const templateSuccessReportElement = document.querySelector('#success').content;
const templateErrorReportElement = document.querySelector('#error').content;

// появление, особенности поведения и закрытие сообщения об успешной подгрузке

const onSuccessReportEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessReport();
  }
};

const onSuccessReportClick = (evt) => {
  if (evt.target !== document.querySelector('.success__inner') && evt.target !== document.querySelector('.success__title')) {
    removeSuccessReport();
  }
};

const renderSuccessReport = () => {
  const successReport = templateSuccessReportElement.cloneNode(true);
  document.body.append(successReport);

  document.addEventListener('keydown', onSuccessReportEscKeydown);
  document.addEventListener('click', onSuccessReportClick);

  const submitButtonElement = document.querySelector('.success__button');
  submitButtonElement.addEventListener('click', removeSuccessReport);

};

function removeSuccessReport () {
  document.querySelector('section.success').remove();
  document.removeEventListener('keydown', onSuccessReportEscKeydown);
  document.removeEventListener('click', onSuccessReportClick);
}

// появление, особенности поведения и закрытие сообщения об ошибке

const onErrorReportEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorReport();
  }
};

const onErrorReportClick = (evt) => {
  if (evt.target !== document.querySelector('.error__inner') && evt.target !== document.querySelector('.error__title')) {
    removeErrorReport();
  }
};

const renderErrorReport = () => {
  const errorReport = templateErrorReportElement.cloneNode(true);
  document.body.append(errorReport);

  document.addEventListener('keydown', onErrorReportEscKeydown);
  document.addEventListener('click', onErrorReportClick);

  const errorButtonElement = document.querySelector('.error__button');
  errorButtonElement.addEventListener('click', removeErrorReport);

};

const showImageForm = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onImageFormEscKeydown);
};

function removeErrorReport () {
  document.querySelector('section.error').remove();
  document.removeEventListener('keydown', onErrorReportEscKeydown);
  document.removeEventListener('click', onErrorReportClick);
  showImageForm();
}

export {renderSuccessReport, renderErrorReport};
