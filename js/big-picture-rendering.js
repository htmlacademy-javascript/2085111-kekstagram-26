import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const exitButton = bigPicture.querySelector('.big-picture__cancel');
const listOfComments = bigPicture.querySelector('.social__comments');

//очищаем список комментариев от тех, что по умолчанию залиты в html'е
listOfComments.innerHTML = '';

const generateComments = (photo, i) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = photo.comments[i].avatar;
  commentAvatar.alt = photo.comments[i].name;
  commentItem.append(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = photo.comments[i].message;
  commentItem.append(commentText);

  listOfComments.append(commentItem);
};


const renderBigPhoto = (smallPhoto) => {
  bigPicture.querySelector('.big-picture__img > img').src = smallPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = smallPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = smallPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = smallPhoto.description;

  for (let i = 0; i < smallPhoto.comments.length; i++) {
    generateComments(smallPhoto, i);
  }
};

// что будет, если нажать Esc на большом фото
const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

function openBigPhoto(thumbnail) {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  renderBigPhoto(thumbnail);

  exitButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onBigPhotoEscKeydown);
}

function closeBigPhoto() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');

  listOfComments.innerHTML = '';
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  exitButton.removeEventListener('click', closeBigPhoto);
}

export {openBigPhoto};
