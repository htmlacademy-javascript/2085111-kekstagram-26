import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const exitButton = bigPicture.querySelector('.big-picture__cancel');

const renderBigPhoto = (smallPhoto) => {
  bigPicture.querySelector('.big-picture__img > img').src = smallPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = smallPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = smallPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = smallPhoto.description;

  const comments = bigPicture.querySelectorAll('.social__comment');
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (smallPhoto.comments[i]) {
      comment.querySelector('.social__text').textContent = smallPhoto.comments[i].message;
      comment.querySelector('.social__picture').src = smallPhoto.comments[i].avatar;
      comment.querySelector('.social__picture').alt = smallPhoto.comments[i].name;
    } //ввела проверку, так как у меня были ситуации, когда был 1 комментарий и js ломался. Но else придумать не смогла...
  }
};

// что будет, если нажать Esc на большом фото
const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

// open и close объявила декларативно, потому что если объявляла их через переменную, то линтер ругался
// так как closeBigPhoto заявлен в onBigPhotoEscKeydown, который стоит до функции. Так можно? Не придумала другого способа...
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

  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  exitButton.removeEventListener('click', closeBigPhoto);
}

export {openBigPhoto};
