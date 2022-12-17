import { renderMiniatures } from './miniatures.js';
const errorMessage = document.querySelector('.error__message');
const successMessage = document.querySelector('.success__message');
const ALERT_SHOW_TIME = 5000;

const getPhotos = () => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => renderMiniatures(data))
    .catch((err) => {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = `Не удалось получить фото с сервера. ${  err}`;
      setTimeout(() => {
        errorMessage.classList.add('hidden');
      }, ALERT_SHOW_TIME);
    });
};

const postPhoto = (evt) => {
  const formData = new FormData(evt.target);
  fetch ('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        successMessage.classList.remove('hidden');
        successMessage.textContent = 'Фото успешно загрузилось на сервер';
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, ALERT_SHOW_TIME);
      } else {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = `Не удалось отправить фото на сервер. Код ${response.status}`;
        setTimeout(() => {
          errorMessage.classList.add('hidden');
        }, ALERT_SHOW_TIME);
      }
    })
    .catch((err) => {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = `Не удалось отправить фото на сервер. ${  err}`;
      setTimeout(() => {
        errorMessage.classList.add('hidden');
      }, ALERT_SHOW_TIME);
    });
};

export { getPhotos, postPhoto };
