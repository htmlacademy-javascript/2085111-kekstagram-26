const AMOUNT_OF_PHOTOS = 25;
const ALERT_SHOW_TIME = 5000;

const STEP_OF_SCALING = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const sliderOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

export {AMOUNT_OF_PHOTOS, STEP_OF_SCALING, MIN_SCALE, MAX_SCALE, sliderOptions, ALERT_SHOW_TIME};
