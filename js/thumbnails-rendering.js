import {openBigPhoto} from './big-picture-rendering.js';

//шаблон template в разметке
const templatePicture = document.querySelector('#picture').content;

// функция, которая навешивает EventListener на каждую миниатюру
// не могу понять, нужен ли в этой функции preventDefault - ???
const onThumbnailClick = (thumbnail, randomPhoto) => {
  thumbnail.querySelector('.picture__img').addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPhoto(randomPhoto);
  });
};

const createThumbnails = (randomPhotos) => {
  //фрагмент, в котором будут собраны миниатюры перед добавлением на страницу
  const thumbnailsFragment = document.createDocumentFragment();

  //создаём копии шаблона, грузим в них данные, добавляем в контейнер
  randomPhotos.forEach((randomPhoto) => {
    const photoElement = templatePicture.cloneNode(true);

    photoElement.querySelector('.picture__img').src = randomPhoto.url;
    photoElement.querySelector('.picture__comments').textContent = randomPhoto.description;
    photoElement.querySelector('.picture__likes').textContent = randomPhoto.likes;

    onThumbnailClick(photoElement, randomPhoto);

    thumbnailsFragment.append(photoElement);
  });
  return thumbnailsFragment;
};

export {createThumbnails};
