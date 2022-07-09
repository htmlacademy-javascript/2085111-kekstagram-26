import {isEscapeKey} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const exitFormButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtagRule = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

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
});

function closeImageEditingForm () {
  imageEditingForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  exitFormButton.removeEventListener('click', closeImageEditingForm);
  document.removeEventListener('keydown', onImageFormEscKeydown);
  uploadFileInput.value = '';
}

//ниже валидация комментария и хэштегов

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'}, false);


const validateComment = () => commentInput.value.length <= 140;

const validateHashtagsAmount = () => {
  const hashtagsArray = hashtagsInput.value.split(' ');
  return hashtagsArray.length <= 5;
};
// проверка содержания хештега (превращаем в массив, перебираем массив с помощью some, возвращаем true или false)
const validateHashtagsContent = () => hashtagsInput.value.split(' ').every((hashtag) => hashtagRule.test(hashtag));

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
    uploadForm.submit();
  }
});
