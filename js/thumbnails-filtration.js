import {AMOUNT_OF_PHOTOS} from './constants.js';
import {createThumbnails} from './thumbnails-rendering.js';
import {shuffle, debounce} from './utils.js';

const AMOUNT_OF_RANDOM_PHOTOS = 10;
const TIME_OF_DEBOUNCE = 500;

const defaultFilterElement = document.querySelector('#filter-default');
const randomFilterElement = document.querySelector('#filter-random');
const discussedFilterElement = document.querySelector('#filter-discussed');
const filterBlockElement = document.querySelector('.img-filters');
const filtersElements = document.querySelectorAll('.img-filters__button');

const changeActiveFilter = (filter) => {
  for (const eachFilter of filtersElements) {
    eachFilter.classList.remove('img-filters__button--active');
  }
  filter.classList.add('img-filters__button--active');
};

const onDiscussionFilterClick = (photos, createThumbnailsWithDebounce) => {
  discussedFilterElement.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    const filteredArrayOfPhotos = photos.slice();
    filteredArrayOfPhotos.sort((a,b) => a.likes > b.likes ? -1 : 1);
    createThumbnailsWithDebounce(filteredArrayOfPhotos);
  });
};

const onRandomFilterClick = (photos, createThumbnailsWithDebounce) => {
  randomFilterElement.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    const shuffledArrayOfPhotos = photos.slice();
    shuffle(shuffledArrayOfPhotos);
    createThumbnailsWithDebounce(shuffledArrayOfPhotos.slice(0, AMOUNT_OF_RANDOM_PHOTOS));
  });
};

const onDefaultFilterClick = (photos, createThumbnailsWithDebounce) => {
  defaultFilterElement.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    createThumbnailsWithDebounce(photos.slice(0, AMOUNT_OF_PHOTOS));
  });
};

const addFilters = (photos) => {
  filterBlockElement.classList.remove('img-filters--inactive');
  onDiscussionFilterClick(photos, debounce(createThumbnails, TIME_OF_DEBOUNCE));
  onRandomFilterClick(photos, debounce(createThumbnails, TIME_OF_DEBOUNCE));
  onDefaultFilterClick(photos, debounce(createThumbnails, TIME_OF_DEBOUNCE));
};

export {addFilters};
