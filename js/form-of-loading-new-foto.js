import './transform-new-foto.js';
import {isEscapeKey, showAlert} from './utils.js';
import {sendData} from './api.js';
import {renderSuccessReport, renderErrorReport} from './reports.js';
import {DEFAULT_SCALE_VALUE} from './constants.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_AMOUNT_OF_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const hashtagRule = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = document.querySelector('#upload-file');
const imageEditingFormElement = document.querySelector('.img-upload__overlay');
const exitFormButtonElement = document.querySelector('#upload-cancel');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const previewPhotoElement = document.querySelector('.img-upload__preview > img');

// функция закрытия окна по Esc + запрет на закрытие, если в фокусе хэштеги или комментарии
const onImageFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
    } else {
      closeImageEditingForm();
    }
  }
};

const openPhotoEditForm = (file) => {
  previewPhotoElement.src = URL.createObjectURL(file);
  imageEditingFormElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  exitFormButtonElement.addEventListener('click', closeImageEditingForm);
  document.addEventListener('keydown', onImageFormEscKeydown);
  //присваиваем значения по умолчанию для масштаба картинки + инпута масштаба + блокируем кнопку его увеличения, т.к. значение уже 100%
  document.querySelector('.scale__control--value').value = `${DEFAULT_SCALE_VALUE}%`;
  document.querySelector('.scale__control--bigger').disabled = true;
  document.querySelector('.effect-level__value').value = DEFAULT_SCALE_VALUE;
};

//открытие модального окна при выборе картинки
uploadFileInputElement.addEventListener('change', () => {
  const file = uploadFileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    openPhotoEditForm(file);
  } else {
    showAlert(`Выберите файл с расширением ${FILE_TYPES.join(', ')}`);
  }
});

function closeImageEditingForm () {
  imageEditingFormElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  exitFormButtonElement.removeEventListener('click', closeImageEditingForm);
  document.removeEventListener('keydown', onImageFormEscKeydown);
  uploadFileInputElement.value = '';
  document.querySelector('.img-upload__preview > img').removeAttribute('style');
  document.querySelector('.img-upload__preview > img').removeAttribute('class');
  document.querySelector('.effect-level__slider').noUiSlider.set(DEFAULT_SCALE_VALUE);
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.querySelector('.scale__control--smaller').removeAttribute('disabled');
  hashtagsInputElement.value = '';
  commentInputElement.value = '';
}

//ниже валидация комментария и хэштегов

const pristine = new Pristine (uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'}, false);


const validateComment = () => commentInputElement.value.length <= MAX_COMMENT_LENGTH;

const validateHashtagsAmount = () => {
  const hashtagsArray = hashtagsInputElement.value.split(' ');
  return hashtagsArray.length <= MAX_AMOUNT_OF_HASHTAGS;
};
// проверка содержания хештега (превращаем в массив, перебираем массив с помощью some, возвращаем true или false)
const validateHashtagsContent = () =>
  (hashtagsInputElement.value)
    ? hashtagsInputElement.value.split(' ').every((hashtag) => hashtagRule.test(hashtag))
    : true;

// проверка хэштегов на уникальность (при этом для начала приводим всё к нижнему регистру)
const validateHashtagsDublicates = () => {
  const hashtagsArray = hashtagsInputElement.value.split(' ');
  const lowRegistrHashtags = hashtagsArray.map((hashtag) => hashtag.toLowerCase());
  const hashtagUnics = new Set(lowRegistrHashtags);
  return lowRegistrHashtags.length === hashtagUnics.size;
};

// добавляем новые правила в пристин
pristine.addValidator(commentInputElement, validateComment, `Длина комментария должна быть меньше ${MAX_COMMENT_LENGTH} символов`);
pristine.addValidator(hashtagsInputElement, validateHashtagsAmount, `Нельзя указывать более ${MAX_AMOUNT_OF_HASHTAGS} хэштегов`);
pristine.addValidator(hashtagsInputElement, validateHashtagsContent, `Хэштег должен начинаться с #, содержать только цифры и буквы и быть короче ${MAX_HASHTAG_LENGTH} символов`);
pristine.addValidator(hashtagsInputElement, validateHashtagsDublicates, 'Все хэштеги должны быть уникальны!');

const hideImageForm = () => {
  imageEditingFormElement.classList.add('hidden');
  document.removeEventListener('keydown', onImageFormEscKeydown);
};

//все проверки инпутов осуществляются после нажатия кнопки
uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(
      () => {
        closeImageEditingForm();
        renderSuccessReport();
      },
      () => {
        renderErrorReport();
        hideImageForm();
      },
      new FormData(evt.target),
    );
  }
});

export {onImageFormEscKeydown};
