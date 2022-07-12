const buttonToMakeSmall = document.querySelector('.scale__control--smaller');
const buttonToMakeBig = document.querySelector('.scale__control--bigger');
const transformValueTextblock = document.querySelector('.scale__control--value');
const tranformingImage = document.querySelector('.img-upload__preview > img');
const STEP_OF_SCALING = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const listOfEffectsInputs = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderElement.setAttribute('disabled', true);

const changeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    tranformingImage.removeAttribute('class');
    tranformingImage.removeAttribute('style.filter');
    tranformingImage.classList.add(`effects__preview--${evt.target.value}`);

    if (evt.target.value === 'none') {
      tranformingImage.removeAttribute('style');
      // делала ещё вариант не через атрибут disables, а через класс hidden. Визуально понравилось меньше, оставила пока так.
      sliderElement.setAttribute('disabled', true);
      effectLevelValue.value = 100;
    } else {
      sliderElement.removeAttribute('disabled');
    }
    // Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
    if (evt.target.value === 'chrome') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
    // Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
    if (evt.target.value === 'sepia') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
    // Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
    if (evt.target.value === 'marvin') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
    // Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
    if (evt.target.value === 'phobos') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    // Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
    if (evt.target.value === 'heat') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  }
};

const changeScale = (param) => {
  let numberWithoutPercent = parseInt(transformValueTextblock.value, 10);
  numberWithoutPercent = param === 'decrease' ? numberWithoutPercent - STEP_OF_SCALING : numberWithoutPercent + STEP_OF_SCALING;
  buttonToMakeSmall.disabled = numberWithoutPercent === MIN_SCALE;
  buttonToMakeBig.disabled = numberWithoutPercent === MAX_SCALE;
  transformValueTextblock.value = `${numberWithoutPercent}%`;
  tranformingImage.style.transform = `scale(${numberWithoutPercent /= 100})`;
};

buttonToMakeSmall.addEventListener('click', () => changeScale('decrease'));
buttonToMakeBig.addEventListener('click', () => changeScale('increase'));
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
  /*
  Я попыталась записать это в виде бесконечного тернарного оператора, но линтер сильно на это ругался.
    tranformingImage.style.filter = tranformingImage.classList.contains('effects__preview--chrome')
    ? `grayscale(${effectLevelValue.value})`
    : tranformingImage.classList.contains('effects__preview--sepia')
      ? `sepia(${effectLevelValue.value})`
      : tranformingImage.classList.contains('effects__preview--marvin')
        ? `invert(${effectLevelValue.value}%)`
        : tranformingImage.classList.contains('effects__preview--phobos')
          ? `blur(${effectLevelValue.value}px)`
          : `brightness(${effectLevelValue.value})`;
  */
});
