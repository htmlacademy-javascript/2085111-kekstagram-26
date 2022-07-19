import {isEscapeKey} from './utils.js';
import {onImageFormEscKeydown} from './form-of-loading-new-foto.js';

const templateSuccessReport = document.querySelector('#success').content;
const templateErrorReport = document.querySelector('#error').content;

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
  const successReport = templateSuccessReport.cloneNode(true);
  document.body.append(successReport);

  document.addEventListener('keydown', onSuccessReportEscKeydown);
  document.addEventListener('click', onSuccessReportClick);

  const submitButton = document.querySelector('.success__button');
  submitButton.addEventListener('click', removeSuccessReport);

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
  const errorReport = templateErrorReport.cloneNode(true);
  document.body.append(errorReport);

  document.addEventListener('keydown', onErrorReportEscKeydown);
  document.addEventListener('click', onErrorReportClick);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', removeErrorReport);

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
