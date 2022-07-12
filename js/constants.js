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

const STEP_OF_SCALING = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const sliderOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

export {NAMES, AVATARS, MESSAGES, DESCRIPTIONS, AMOUNT_OF_PHOTOS, STEP_OF_SCALING, MIN_SCALE, MAX_SCALE, sliderOptions};
