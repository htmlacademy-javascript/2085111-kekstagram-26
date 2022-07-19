import {createThumbnails} from './thumbnails-rendering.js';
import './form-of-loading-new-foto.js';
import {getData} from './api.js';
import {AMOUNT_OF_PHOTOS} from './constants.js';
import {showAlert} from './utils.js';
import {addFilters} from './thumbnails-filtration.js';

getData((photos) => {
  createThumbnails(photos.slice(0, AMOUNT_OF_PHOTOS));
  addFilters(photos);
}, showAlert);
