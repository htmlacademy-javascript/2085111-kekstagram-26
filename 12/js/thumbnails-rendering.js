import {openBigPhoto} from './big-picture-rendering.js';

//шаблон template в разметке
const templatePicture = document.querySelector('#picture').content;
//секция, куда попадут миниатюры
const thumbnailsContainer = document.querySelector('.pictures');

const createThumbnails = (usersPhotos) => {
  //фрагмент, в котором будут собраны миниатюры перед добавлением на страницу
  const thumbnailsFragment = document.createDocumentFragment();

  //создаём копии шаблона, грузим в них данные, добавляем в контейнер
  usersPhotos.forEach((photoOfOtherUser) => {
    const photoElement = templatePicture.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photoOfOtherUser.url;
    photoElement.querySelector('.picture__comments').textContent = photoOfOtherUser.description;
    photoElement.querySelector('.picture__likes').textContent = photoOfOtherUser.likes;

    photoElement.querySelector('.picture__img').addEventListener('click', () => {
      openBigPhoto(photoOfOtherUser);
    });

    thumbnailsFragment.append(photoElement);
  });
  const pics = thumbnailsContainer.querySelectorAll('.picture');
  for (const pic of pics) {
    pic.remove();
  }
  thumbnailsContainer.append(thumbnailsFragment);
};

export {createThumbnails};
