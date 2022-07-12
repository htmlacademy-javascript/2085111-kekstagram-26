import {getRandomPositiveInteger, getRandomArrayElement} from './utils.js';
import {NAMES, AVATARS, MESSAGES, DESCRIPTIONS, AMOUNT_OF_PHOTOS} from './constants.js';

// функция создания 1 или 2 текстов комментариев и их склейки
const createCommentItem = () => {
  let commentValue = '';
  for (let i = 1; i <= getRandomPositiveInteger(1, 2); i++) {
    if (i >= 2) {
      commentValue += ' ';
    }
    commentValue += getRandomArrayElement(MESSAGES);
  }
  return commentValue;
};

// создание и накручивание счетчика id для фотографий
let idPhotoOrdinal = 0;
const incPhotoId = () => idPhotoOrdinal++;

// создание и накручивание счетчика id для комментариев
let idCommentOrdinal = 0;
const incCommentId = () => {
  idCommentOrdinal++;
  return idPhotoOrdinal * 100 + idCommentOrdinal;
};

// создание комментария
const createComment = () => ({
  id: incCommentId(),
  avatar: `img/avatar-${getRandomArrayElement(AVATARS)}.svg`,
  message: createCommentItem(),
  name: getRandomArrayElement(NAMES),
});

// создание описания фотографии
const createPhoto = () => {
  incPhotoId();
  idCommentOrdinal = 0;
  return {
    id: idPhotoOrdinal,
    url: `photos/${idPhotoOrdinal}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15,200),
    comments: Array.from({length: getRandomPositiveInteger(2, 12)}, createComment),
  };
};

// функция по созданию массива из описаний фотографий
const generateRandomPhotos = () => Array.from({length: AMOUNT_OF_PHOTOS}, createPhoto);

export {generateRandomPhotos};
