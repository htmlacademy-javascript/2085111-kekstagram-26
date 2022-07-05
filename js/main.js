import {generateRandomPhotos} from './generate-data.js';
import {createThumbnails} from './thumbnails-rendering.js';

//секция, куда попадут миниатюры
const thumbnailsContainer = document.querySelector('.pictures');

//массив сгенерированных фотографий
const randomPhotos = generateRandomPhotos();

//создание контейнера с миниатюрами на основе сгенерированных данных
const fullThumbnailsFragment = createThumbnails(randomPhotos);

//добавляем контейнер на страницу
thumbnailsContainer.append(fullThumbnailsFragment);
