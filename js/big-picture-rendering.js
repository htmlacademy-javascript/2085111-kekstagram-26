import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const exitButton = bigPicture.querySelector('.big-picture__cancel');
const listOfComments = bigPicture.querySelector('.social__comments');
const loadingButton = bigPicture.querySelector('.social__comments-loader');
const COMMENTS_LIMIT_PER_VIEW = 5;
let amountOfComments = 0;
let amountOfNotHiddenComments = COMMENTS_LIMIT_PER_VIEW;
let currentComments;

//очищаем список комментариев от тех, что по умолчанию залиты в html'е
listOfComments.innerHTML = '';

//функция отрисовки строчки со счётчиком отображаемых комментариев
const generateCurrentComments = (notHiddenComments, allComments) => {
  currentComments = notHiddenComments < allComments ? notHiddenComments : allComments;
  bigPicture.querySelector('.social__comment-count').textContent = `${currentComments} из ${allComments} комментариев`;
};

// функция создает сразу все комментарии, но прячет лишние
const generateComments = (photo) => {
  for (let i = 0; i < photo.comments.length; i++) {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    // все комментарии после 5 скрываются через класс hidden
    if (i >= COMMENTS_LIMIT_PER_VIEW) {
      commentItem.classList.add('hidden');
    }

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
  }
};

const renderBigPhoto = (smallPhoto) => {
  bigPicture.querySelector('.big-picture__img > img').src = smallPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = smallPhoto.likes;
  bigPicture.querySelector('.social__caption').textContent = smallPhoto.description;

  generateComments(smallPhoto);

  amountOfComments = smallPhoto.comments.length;
  amountOfNotHiddenComments = COMMENTS_LIMIT_PER_VIEW;
  generateCurrentComments(amountOfNotHiddenComments, amountOfComments);
};

// функция скрывает кнопку подгрузки комм-в, если количество не-скрытых-комментариев (5+5+5...) больше либо равно кол-ву комм-в
const verifyIfLoadingButtonNeeds = () => {
  if (amountOfNotHiddenComments >= amountOfComments) {loadingButton.classList.add('hidden');}
};

const onLoadingButtonClick = () => {
  for (let i = amountOfNotHiddenComments; i < amountOfComments && i < amountOfNotHiddenComments + COMMENTS_LIMIT_PER_VIEW; i++) {
    listOfComments.children[i].classList.remove('hidden');
  }
  amountOfNotHiddenComments += COMMENTS_LIMIT_PER_VIEW;
  verifyIfLoadingButtonNeeds();
  generateCurrentComments(amountOfNotHiddenComments, amountOfComments);
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

  renderBigPhoto(thumbnail);
  verifyIfLoadingButtonNeeds();
  exitButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onBigPhotoEscKeydown);

  loadingButton.addEventListener('click', onLoadingButtonClick);
}

function closeBigPhoto() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  listOfComments.innerHTML = '';
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  exitButton.removeEventListener('click', closeBigPhoto);
  loadingButton.removeEventListener('click', onLoadingButtonClick);
  loadingButton.classList.remove('hidden');
}

export {openBigPhoto};
