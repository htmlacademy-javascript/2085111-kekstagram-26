import {isEscapeKey} from './utils.js';
import './transform-new-foto.js';
import {sendData} from './api.js';
import {renderSuccessReport, renderErrorReport} from './reports.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const exitFormButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtagRule = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_COMMENT_LENGTH = 140;
const MAX_AMOUNT_OF_HASHTAGS = 5;

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

//открытие модального окна при выборе картинки
uploadFileInput.addEventListener('change', () => {
  imageEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  exitFormButton.addEventListener('click', closeImageEditingForm);
  document.addEventListener('keydown', onImageFormEscKeydown);
  //присваиваем значения по умолчанию для масштаба картинки + инпута масштаба + блокируем кнопку его увеличения, т.к. значение уже 100%
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.scale__control--bigger').disabled = true;
  document.querySelector('.effect-level__value').value = 100;
});

function closeImageEditingForm () {
  imageEditingForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  exitFormButton.removeEventListener('click', closeImageEditingForm);
  document.removeEventListener('keydown', onImageFormEscKeydown);
  uploadFileInput.value = '';
  document.querySelector('.img-upload__preview > img').removeAttribute('style');
  document.querySelector('.img-upload__preview > img').removeAttribute('class');
  document.querySelector('.effect-level__slider').noUiSlider.set(100);
  document.querySelector('.effect-level__slider').setAttribute('disabled', true);
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
const validateHashtagsContent = () => {
  if (hashtagsInput.value) {
    return hashtagsInput.value.split(' ').every((hashtag) => hashtagRule.test(hashtag));
  } else {
    return true;
  }
};

// проверка хэштегов на уникальность (при этом для начала приводим всё к нижнему регистру)
const validateHashtagsDublicates = () => {
  const hashtagsArray = hashtagsInput.value.split(' ');
  const lowRegistrHashtags = hashtagsArray.map((hashtag) => hashtag.toLowerCase());
  const hashtagUnics = new Set(lowRegistrHashtags);
  return lowRegistrHashtags.length === hashtagUnics.size;
};

// добавляем новые правила в пристин
pristine.addValidator(commentInput, validateComment, 'Длина комментария должна быть меньше 140 символов.');
pristine.addValidator(hashtagsInput, validateHashtagsAmount, 'Нельзя указывать более 5 хэштегов');
pristine.addValidator(hashtagsInput, validateHashtagsContent, 'Хэштег должен начинаться с # и содержать только цифры и буквы');
pristine.addValidator(hashtagsInput, validateHashtagsDublicates, 'Все хэштеги должны быть уникальны!');

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
        imageEditingForm.classList.add('hidden');
        document.removeEventListener('keydown', onImageFormEscKeydown);
      },
      new FormData(evt.target),
    );
  }
});

export {onImageFormEscKeydown};
