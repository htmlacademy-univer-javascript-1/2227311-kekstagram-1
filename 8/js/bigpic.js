import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsNumber = bigPicture.querySelector('.comments-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const comments = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');


const renderBigPicture = (post) => {
  bigPictureImg.src = post.url;
  description.textContent = post.description;
  likes.textContent = post.likes;
  commentsNumber.textContent = post.comments.length;
  for (const comment of comments.querySelectorAll('.social__comment')) {
    comment.remove();
  }
  for (const comment of post.comments) {
    const commentClone = commentTemplate.cloneNode(true);
    commentClone.querySelector('img').src = comment.avatar;
    commentClone.querySelector('img').alt = comment.name;
    commentClone.querySelector('.social__text').textContent = comment.message;
    comments.append(commentClone);
  }

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
};

export {renderBigPicture};
