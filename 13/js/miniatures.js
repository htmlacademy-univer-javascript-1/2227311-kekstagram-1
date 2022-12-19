import { renderBigPicture } from './bigpic.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const RANDOM_FILTER_SIZE = 10;
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
const oldChilds = new Set();

const renderMiniatures = (posts) => {
  oldChilds.forEach((child) => pictures.removeChild(child));
  oldChilds.clear();
  const newChild = document.createDocumentFragment();
  for (const post of posts) {
    const miniature = pictureTemplate.cloneNode(true);
    miniature.querySelector('.picture__img').src = post.url;
    miniature.querySelector('.picture__likes').textContent = post.likes;
    miniature.querySelector('.picture__comments').textContent = post.comments.length;
    miniature.querySelector('.picture__img').alt = post.description;
    miniature.addEventListener('click', () => {
      renderBigPicture(post);
    });
    newChild.append(miniature);
    oldChilds.add(miniature);
  }
  pictures.append(newChild);
};

const renderRandomMiniatures = (posts) => {
  const postsToRender = posts.slice();
  while (postsToRender.length > RANDOM_FILTER_SIZE) {
    postsToRender.splice(Math.floor(Math.random()*postsToRender.length), 1);
  }
  renderMiniatures(postsToRender);
};

const renderDiscussedMiniatures = (posts) => {
  const postsToRender = posts.slice();
  const compareCommentsSize = (postA, postB) => postB.comments.length - postA.comments.length;
  postsToRender.sort(compareCommentsSize);
  renderMiniatures(postsToRender);
};

const useFilter = (filter, posts) => {
  switch (filter) {
    case 'filter-default':
      renderMiniatures(posts);
      break;
    case 'filter-random':
      renderRandomMiniatures(posts);
      break;
    case 'filter-discussed':
      renderDiscussedMiniatures(posts);
      break;
  }
};

const setButton = (cb, button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');
    cb();
  });
};

const setFilters = (data) => {
  renderMiniatures(data);
  for (const button of filterButtons) {
    setButton(debounce(() => useFilter(button.id, data), RERENDER_DELAY), button);
  }
};


export { setFilters };
