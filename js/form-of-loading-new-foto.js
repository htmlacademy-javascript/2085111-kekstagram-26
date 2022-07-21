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

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const exitFormButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const previewPhoto = document.querySelector('.img-upload__preview > img');

// функция закрытия окна по Esc + запрет на закрытие, если в фокусе хэштеги или комментарии
const onImageFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeImageEditingForm();
    }
  }
};

const openPhotoEditForm = (file) => {
  previewPhoto.src = URL.createObjectURL(file);
  imageEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  exitFormButton.addEventListener('click', closeImageEditingForm);
  document.addEventListener('keydown', onImageFormEscKeydown);
  //присваиваем значения по умолчанию для масштаба картинки + инпута масштаба + блокируем кнопку его увеличения, т.к. значение уже 100%
  document.querySelector('.scale__control--value').value = `${DEFAULT_SCALE_VALUE}%`;
  document.querySelector('.scale__control--bigger').disabled = true;
  document.querySelector('.effect-level__value').value = DEFAULT_SCALE_VALUE;
};

//открытие модального окна при выборе картинки
uploadFileInput.addEventListener('change', () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    openPhotoEditForm(file);
  } else {
    showAlert(`Выберите файл с расширением ${FILE_TYPES.join(', ')}`);
  }
});

function closeImageEditingForm () {
  imageEditingForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  exitFormButton.removeEventListener('click', closeImageEditingForm);
  document.removeEventListener('keydown', onImageFormEscKeydown);
  uploadFileInput.value = '';
  document.querySelector('.img-upload__preview > img').removeAttribute('style');
  document.querySelector('.img-upload__preview > img').removeAttribute('class');
  document.querySelector('.effect-level__slider').noUiSlider.set(DEFAULT_SCALE_VALUE);
  document.querySelector('.effect-level__slider').setAttribute('disabled', true);
  document.querySelector('.scale__control--smaller').removeAttribute('disabled');
  hashtagsInput.value = '';
  commentInput.value = '';
}

//ниже валидация комментария и хэштегов

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'}, false);


const validateComment = () => commentInput.value.length <= MAX_COMMENT_LENGTH;

const validateHashtagsAmount = () => {
  const hashtagsArray = hashtagsInput.value.split(' ');
  return hashtagsArray.length <= MAX_AMOUNT_OF_HASHTAGS;
};
// проверка содержания хештега (превращаем в массив, перебираем массив с помощью some, возвращаем true или false)
const validateHashtagsContent = () =>
  (hashtagsInput.value)
    ? hashtagsInput.value.split(' ').every((hashtag) => hashtagRule.test(hashtag))
    : true;

// проверка хэштегов на уникальность (при этом для начала приводим всё к нижнему регистру)
const validateHashtagsDublicates = () => {
  const hashtagsArray = hashtagsInput.value.split(' ');
  const lowRegistrHashtags = hashtagsArray.map((hashtag) => hashtag.toLowerCase());
  const hashtagUnics = new Set(lowRegistrHashtags);
  return lowRegistrHashtags.length === hashtagUnics.size;
};

// добавляем новые правила в пристин
pristine.addValidator(commentInput, validateComment, `Длина комментария должна быть меньше ${MAX_COMMENT_LENGTH} символов`);
pristine.addValidator(hashtagsInput, validateHashtagsAmount, `Нельзя указывать более ${MAX_AMOUNT_OF_HASHTAGS} хэштегов`);
pristine.addValidator(hashtagsInput, validateHashtagsContent, `Хэштег должен начинаться с #, содержать только цифры и буквы и быть короче ${MAX_HASHTAG_LENGTH} символов`);
pristine.addValidator(hashtagsInput, validateHashtagsDublicates, 'Все хэштеги должны быть уникальны!');

const hideImageForm = () => {
  imageEditingForm.classList.add('hidden');
  document.removeEventListener('keydown', onImageFormEscKeydown);
};

//все проверки инпутов осуществляются после нажатия кнопки
uploadForm.addEventListener('submit', (evt) => {
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
