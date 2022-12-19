import { isEscapeKey } from './utils.js';
import { postPhoto } from './api.js';
import { editScale, editFilter, effectChangeValue } from './edit-pic.js';
//Picture
const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('#upload-file');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const preview = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
//scale
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

//Effects
const effects = imgUploadOverlay.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
//Validate data
const hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
const descriptionInput = imgUploadOverlay.querySelector('.text__description');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;
let correctHashtags = true;
let correctDescription = true;

const closeEditWindow = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUpload.value = '';
  preview.src = '';
  //remove effects
  preview.style.filter = '';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  preview.style.transform = `scale(${1})`;
  //
  scaleSmaller.removeEventListener('click', editScale);
  scaleBigger.removeEventListener('click', editScale);
  sliderElement.noUiSlider.destroy();
};

const disableSubmitButton = () => {
  if (correctHashtags && correctDescription) {
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
  }
};

imgUpload.addEventListener('change', (evt) => {
  evt.preventDefault();
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100
    },
    start: 0,
    step: 1,
    connect: 'lower'
  });
  const [picture] = imgUpload.files;
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  preview.src = URL.createObjectURL(picture); //module12-task2 already done here
  scaleSmaller.addEventListener('click', editScale);
  scaleBigger.addEventListener('click', editScale);
  effects.addEventListener('change', (filter) => {
    editFilter(filter.target.id);
    sliderElement.noUiSlider.on('update', () => {
      effectChangeValue(filter.target.id);
    });
  });
  closeButton.addEventListener('click', closeEditWindow);
  disableSubmitButton();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postPhoto(evt);
  closeEditWindow();
});

imgUpload.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditWindow();
  }
  evt.stopPropagation();
});

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

const validateHashtag = (value) => {
  const array = value.split(' ').map((element) => element.toLowerCase());
  const set = new Set(array);
  correctHashtags = true;
  if (array.length > 5 || array.length !== set.size) {
    correctHashtags = false;
  }
  for (let i = 0; i < array.length; i++) {
    if (!regexHashtag.test(array[i])) {
      correctHashtags = false;
    }
  }
  disableSubmitButton();
  return correctHashtags;
};

const validateDescription = (value) => {
  correctDescription = value.length < 140;
  disableSubmitButton();
  return correctDescription;
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  'Хэштэг задан неправильно'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не должен превышать 140 символов'
);
pristine.validate();
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
