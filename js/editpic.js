//Scale
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const picture = document.querySelector('.img-upload__preview').querySelector('img');
//Effects
const sliderField = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderField.querySelector('.effect-level__slider');


const editScale = (evt) => {
  const scale = scaleValue.value.replace('%', '');
  if (evt.target === scaleSmaller && scale > 0) {
    scaleValue.value = `${parseInt(scale, 10) - 25}%`;
    picture.style.transform = `scale(${(parseInt(scale, 10) - 25) / 100})`;
  } else if (evt.target === scaleBigger && scale < 100) {
    scaleValue.value = `${parseInt(scale, 10) + 25}%`;
    picture.style.transform = `scale(${(parseInt(scale, 10) + 25) / 100})`;
  }
};

const editFilter = (filter) => {
  let min,max,step,start;
  switch (filter) {
    case 'effect-chrome':
      min = 0;
      max = 1;
      step = 0.1;
      start = 1;
      break;
    case 'effect-sepia':
      min = 0;
      max = 1;
      step = 0.1;
      start = 1;
      break;
    case 'effect-marvin':
      min = 0;
      max = 100;
      step = 1;
      start = 100;
      break;
    case 'effect-phobos':
      min = 0;
      max = 3;
      step = 0.1;
      start = 3;
      break;
    case 'effect-heat':
      min = 1;
      max = 3;
      step = 0.1;
      start = 3;
      break;
    default:
      min = 0;
      max = 100;
      step = 1;
      start = 0;
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: start,
    step: step
  });
  if (filter !== 'effect-none') {
    sliderField.classList.remove('hidden');
  } else {
    sliderField.classList.add('hidden');
  }
};
const effectChangeValue = (filter) => {
  const sliderValue = sliderElement.noUiSlider.get();
  document.querySelector('.effect-level__value').value = sliderValue;
  switch (filter) {
    case 'effect-chrome':
      filter = `grayscale(${sliderValue})`;
      break;
    case 'effect-sepia':
      filter = `sepia(${sliderValue})`;
      break;
    case 'effect-marvin':
      filter = `invert(${sliderValue}%)`;
      break;
    case 'effect-phobos':
      filter = `blur(${sliderValue}px)`;
      break;
    case 'effect-heat':
      filter = `brightness(${sliderValue})`;
      break;
  }
  if (filter === 'effect-none') {
    picture.style.filter = '';
  } else {
    picture.style.filter = filter;
  }
};

export { editScale, editFilter, effectChangeValue };
