import { isEscapeKey } from './utils.js';
const form = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const preview = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;
let correctHashtags = true;
let correctDescription = true;

const closeEditWindow = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUpload.value = '';
  preview.src = '';
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
  const [picture] = imgUpload.files;
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  preview.src = URL.createObjectURL(picture);

  closeButton.addEventListener('click', () => closeEditWindow());
  disableSubmitButton();
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

const descriptionValidation = (value) => {
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
  descriptionValidation,
  'Комментарий не должен превышать 140 символов'
);
pristine.validate();
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
