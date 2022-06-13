const NAMES = [
  'Сильвер',
  'Рован',
  'Сильвия',
  'Йользе',
  'Сатрана',
  'Шелена',
  'Торвальд',
  'Иоланда',
  'Корвин',
  'Термина'
];

const AVATARS = ['1', '2', '3', '4', '5', '6'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Путешествия',
  'Домашние любимцы',
  'Портреты',
  'Пейзажи',
  'Подводный мир',
  'Дикая природа',
  'Урбанистика',
  'Документалистика',
];

const AMOUNT_OF_PHOTOS = 25;

// функция получения рандомного числа
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция получения рандомного значения из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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
const idPhotoValue = () => idPhotoOrdinal++;

// создание и накручивание счетчика id для комментариев
let idCommentOrdinal = 0;
const idCommentValue = () => {
  idCommentOrdinal++;
  return idPhotoOrdinal* 100 + idCommentOrdinal;
};

// создание комментария
const createComment = () => ({
  id: idCommentValue(),
  avatar: `img/avatar-${getRandomArrayElement(AVATARS)}.svg`,
  message: createCommentItem(),
  name: getRandomArrayElement(NAMES),
});

// создание описания фотографии
const createPhoto = () => {
  idPhotoValue();
  idCommentOrdinal = 0;
  return {
    id: idPhotoOrdinal,
    url: `photos/${idPhotoOrdinal}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15,200),
    comments: Array.from({length: getRandomPositiveInteger(1, 3)}, createComment),
  };
};

// создание массива из описаний фотографий
export const randomPhotos = Array.from({length: AMOUNT_OF_PHOTOS}, createPhoto);

// проверка длины комментария из д/з 2 блока
const checkStringLength = (stringLength, maxLength) => stringLength <= maxLength;
checkStringLength(20, 40);
