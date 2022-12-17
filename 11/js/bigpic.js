import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsNumber = bigPicture.querySelector('.comments-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const comments = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');


const renderBigPicture = (post) => {
  bigPictureImg.src = post.url;
  description.textContent = post.description;
  likes.textContent = post.likes;
  for (const comment of comments.querySelectorAll('.social__comment')) {
    comment.remove();
  }
  const renderComments = (comms, first, second) => {
    for (const comment of comms.slice(first, second)) {
      const commentClone = commentTemplate.cloneNode(true);
      commentClone.querySelector('img').src = comment.avatar;
      commentClone.querySelector('img').alt = comment.name;
      commentClone.querySelector('.social__text').textContent = comment.message;
      comments.append(commentClone);
    }
  };
  if (post.comments.length > 5) {
    loadCommentsButton.classList.remove('hidden');
    commentsNumber.textContent = `5 из ${post.comments.length}`;
    renderComments(post.comments, 0, 5);
    let first = 5;
    let second = post.comments.length > 10 ? 10 : post.comments.length;
    loadCommentsButton.addEventListener('click', () => {
      commentsNumber.textContent = `${second} из ${post.comments.length}`;
      renderComments(post.comments, first, second);
      first += 5;
      second = post.comments.length - 5 > second + 5 ? second + 5 : post.comments.length;
      if (first >= second) {
        loadCommentsButton.classList.add('hidden');
      }
    });
  } else {
    commentsNumber.textContent = `${post.comments.length} из ${post.comments.length}`;
    loadCommentsButton.classList.add('hidden');
    renderComments(post.comments, 0, post.comments.length);
  }
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
