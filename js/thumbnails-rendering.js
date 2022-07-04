//шаблон template в разметке
const templatePicture = document.querySelector('#picture').content;

//фрагмент, в котором будут собраны миниатюры перед добавлением на страницу
const thumbnailsFragment = document.createDocumentFragment();

//создаём копии шаблона, грузим в них данные, добавляем в контейнер
const createThumbnails = (randomPhotos) => {
  randomPhotos.forEach(({url, description, likes}) => {
    const photoElement = templatePicture.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = description;
    photoElement.querySelector('.picture__likes').textContent = likes;

    thumbnailsFragment.append(photoElement);
  });
  return thumbnailsFragment;
};

export {createThumbnails};
