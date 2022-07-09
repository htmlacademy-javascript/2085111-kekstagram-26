import {isEscapeKey} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const exitFormButton = document.querySelector('#upload-cancel');
// const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const onImageFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditingForm();
  }
};

uploadFileInput.addEventListener('change', () => {
  imageEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  exitFormButton.addEventListener('click', closeImageEditingForm);
  document.addEventListener('keydown', onImageFormEscKeydown);
});

function closeImageEditingForm () {
  imageEditingForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  exitFormButton.removeEventListener('click', closeImageEditingForm);
  document.removeEventListener('keydown', onImageFormEscKeydown);
  uploadFileInput.value = '';
}

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'error',
  // successClass: 'success__title',
  errorTextParent: 'img-upload__field-wrapper',
  // errorTextTag: 'span',
  errorTextClass: 'error'});

const validateComment = () => commentInput.value < 5;

pristine.addValidator(commentInput, validateComment, 'Длина комментария должна быть меньше 140 символов.');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // console.log('pristine: ', pristine.validate());
  pristine.validate();
});

//pristine.addValidator(hashtagsForm);
/*
const validateHashtags = () => {
  const hashtagsArray = hashtagsInput.value.split(' ');
  console.log(hashtagsArray);

};

hashtagsInput.addEventListener('blur', validateHashtags);
*/
