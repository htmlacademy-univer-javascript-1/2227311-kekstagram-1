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
const FilterType = {
    Chrome: 'effect-chrome',
    Sepia: 'effect-sepia',
    Marvin: 'effect-marvin',
    Phobos: 'effect-phobos',
    Heat: 'effect-heat',
    None: 'effect-none'
};
const editFilter = (filter) => {
  let min,max,step,start;
  switch (filter) {
    case FilterType.Chrome:
      min = 0;
      max = 1;
      step = 0.1;
      start = 1;
      break;
    case FilterType.Sepia:
      min = 0;
      max = 1;
      step = 0.1;
      start = 1;
      break;
    case FilterType.Marvin:
      min = 0;
      max = 100;
      step = 1;
      start = 100;
      break;
    case FilterType.Phobos:
      min = 0;
      max = 3;
      step = 0.1;
      start = 3;
      break;
    case FilterType.Heat:
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
    step: step,
    connect: 'lower'
  });
  if (filter !== FilterType.None) {
    sliderField.classList.remove('hidden');
  } else {
    sliderField.classList.add('hidden');
  }
};
console.log(sliderElement);
const effectChangeValue = (filter) => {
  const sliderValue = sliderElement.noUiSlider.get();
  document.querySelector('.effect-level__value').value = sliderValue;
  switch (filter) {
    case FilterType.Chrome:
      filter = `grayscale(${sliderValue})`;
      break;
    case FilterType.Sepia:
      filter = `sepia(${sliderValue})`;
      break;
    case FilterType.Marvin:
      filter = `invert(${sliderValue}%)`;
      break;
    case FilterType.Phobos:
      filter = `blur(${sliderValue}px)`;
      break;
    case FilterType.Heat:
      filter = `brightness(${sliderValue})`;
      break;
  }
  if (filter === FilterType.None) {
    picture.style.filter = '';
  } else {
    picture.style.filter = filter;
  }
};

export { editScale, editFilter, effectChangeValue };
