import {DEFAULT_SCALE_VALUE, sliderOptions} from './constants.js';

const DECREASE = 'decrease';
const INCREASE = 'increase';
const STEP_OF_SCALING = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const defaultSliderOptions = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
};

const buttonToMakeSmallElement = document.querySelector('.scale__control--smaller');
const buttonToMakeBigElement = document.querySelector('.scale__control--bigger');
const transformValueTextblockElement = document.querySelector('.scale__control--value');
const tranformingImageElement = document.querySelector('.img-upload__preview > img');
const listOfEffectsInputsElement = document.querySelector('.effects__list');
const sliderElementElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderBlockElement = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElementElement, defaultSliderOptions);
sliderBlockElement.classList.add('hidden');

const changeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    tranformingImageElement.removeAttribute('class');
    const nameOfCurrentEffect = evt.target.value;
    tranformingImageElement.classList.add(`effects__preview--${nameOfCurrentEffect}`);

    if (nameOfCurrentEffect === 'none') {
      tranformingImageElement.style.filter = 'unset';
      sliderBlockElement.classList.add('hidden');
      effectLevelValueElement.value = DEFAULT_SCALE_VALUE;
    } else {
      sliderBlockElement.classList.remove('hidden');
      sliderElementElement.noUiSlider.updateOptions(sliderOptions[nameOfCurrentEffect]);
    }
  }
};

const changeScale = (param) => {
  let numberWithoutPercent = parseInt(transformValueTextblockElement.value, 10);
  numberWithoutPercent = param === DECREASE ? numberWithoutPercent - STEP_OF_SCALING : numberWithoutPercent + STEP_OF_SCALING;
  buttonToMakeSmallElement.disabled = numberWithoutPercent === MIN_SCALE;
  buttonToMakeBigElement.disabled = numberWithoutPercent === MAX_SCALE;
  transformValueTextblockElement.value = `${numberWithoutPercent}%`;
  tranformingImageElement.style.transform = `scale(${numberWithoutPercent /= 100})`;
};

buttonToMakeSmallElement.addEventListener('click', () => changeScale(DECREASE));
buttonToMakeBigElement.addEventListener('click', () => changeScale(INCREASE));
listOfEffectsInputsElement.addEventListener('change', changeEffect);

sliderElementElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = sliderElementElement.noUiSlider.get();
  if (tranformingImageElement.classList.contains('effects__preview--chrome')) {
    tranformingImageElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
  }
  if (tranformingImageElement.classList.contains('effects__preview--sepia')) {
    tranformingImageElement.style.filter = `sepia(${effectLevelValueElement.value})`;
  }
  if (tranformingImageElement.classList.contains('effects__preview--marvin')) {
    tranformingImageElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
  }
  if (tranformingImageElement.classList.contains('effects__preview--phobos')) {
    tranformingImageElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
  }
  if (tranformingImageElement.classList.contains('effects__preview--heat')) {
    tranformingImageElement.style.filter = `brightness(${effectLevelValueElement.value})`;
  }
});
