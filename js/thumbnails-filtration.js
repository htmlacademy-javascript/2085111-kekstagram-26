import {createThumbnails} from './thumbnails-rendering.js';
import {shuffle, debounce} from './utils.js';

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const filterBlock = document.querySelector('.img-filters');
const AMOUNT_OF_RANDOM_PHOTOS = 10;
const TIME_OF_DEBOUNCE = 500;

const changeActiveFilter = (filter) => {
  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');
  filter.classList.add('img-filters__button--active');
};

const onDiscussionFilterClick = (photos, createThumbnailsWithDebounce) => {
  discussedFilter.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);
    const filteredArrayOfPhotos = photos.slice();
    filteredArrayOfPhotos.sort((a,b) => a.likes > b.likes ? -1 : 1);
    createThumbnailsWithDebounce(filteredArrayOfPhotos);
  });
};

const onRandomFilterClick = (photos, createThumbnailsWithDebounce) => {
  randomFilter.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);
    const shuffledArrayOfPhotos = photos.slice();
    shuffle(shuffledArrayOfPhotos);
    createThumbnailsWithDebounce(shuffledArrayOfPhotos.slice(0, AMOUNT_OF_RANDOM_PHOTOS));
  });
};

const onDefaultFilterClick = (photos, createThumbnailsWithDebounce) => {
  defaultFilter.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);
    createThumbnailsWithDebounce(photos);
  });
};

const addFilters = (photos) => {
  filterBlock.classList.remove('img-filters--inactive');
  onDiscussionFilterClick(photos, debounce(createThumbnails, TIME_OF_DEBOUNCE));
  onRandomFilterClick(photos, debounce(createThumbnails, TIME_OF_DEBOUNCE));
  onDefaultFilterClick(photos, debounce(createThumbnails, TIME_OF_DEBOUNCE));
};

export {addFilters};
