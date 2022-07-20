import {DEFAULT_SCALE_VALUE, sliderOptions} from './constants.js';

const buttonToMakeSmall = document.querySelector('.scale__control--smaller');
const buttonToMakeBig = document.querySelector('.scale__control--bigger');
const transformValueTextblock = document.querySelector('.scale__control--value');
const tranformingImage = document.querySelector('.img-upload__preview > img');
const listOfEffectsInputs = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

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

noUiSlider.create(sliderElement, defaultSliderOptions);
sliderElement.setAttribute('disabled', true);

const changeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    tranformingImage.removeAttribute('class');
    const nameOfCurrentEffect = evt.target.value;
    tranformingImage.classList.add(`effects__preview--${nameOfCurrentEffect}`);

    if (nameOfCurrentEffect === 'none') {
      tranformingImage.style.filter = 'unset';
      sliderElement.setAttribute('disabled', true);
      effectLevelValue.value = DEFAULT_SCALE_VALUE;
    } else {
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions(sliderOptions[nameOfCurrentEffect]);
    }
  }
};

const changeScale = (param) => {
  let numberWithoutPercent = parseInt(transformValueTextblock.value, 10);
  numberWithoutPercent = param === DECREASE ? numberWithoutPercent - STEP_OF_SCALING : numberWithoutPercent + STEP_OF_SCALING;
  buttonToMakeSmall.disabled = numberWithoutPercent === MIN_SCALE;
  buttonToMakeBig.disabled = numberWithoutPercent === MAX_SCALE;
  transformValueTextblock.value = `${numberWithoutPercent}%`;
  tranformingImage.style.transform = `scale(${numberWithoutPercent /= 100})`;
};

buttonToMakeSmall.addEventListener('click', () => changeScale(DECREASE));
buttonToMakeBig.addEventListener('click', () => changeScale(INCREASE));
listOfEffectsInputs.addEventListener('change', changeEffect);

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if (tranformingImage.classList.contains('effects__preview--chrome')) {
    tranformingImage.style.filter = `grayscale(${effectLevelValue.value})`;
  }
  if (tranformingImage.classList.contains('effects__preview--sepia')) {
    tranformingImage.style.filter = `sepia(${effectLevelValue.value})`;
  }
  if (tranformingImage.classList.contains('effects__preview--marvin')) {
    tranformingImage.style.filter = `invert(${effectLevelValue.value}%)`;
  }
  if (tranformingImage.classList.contains('effects__preview--phobos')) {
    tranformingImage.style.filter = `blur(${effectLevelValue.value}px)`;
  }
  if (tranformingImage.classList.contains('effects__preview--heat')) {
    tranformingImage.style.filter = `brightness(${effectLevelValue.value})`;
  }
});
