import { renderBigPicture } from './bigpic.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const newFragment = document.createDocumentFragment();


const renderMiniatures = (posts) => {
  for (const post of posts) {
    const miniature = pictureTemplate.cloneNode(true);
    miniature.querySelector('.picture__img').src = post.url;
    miniature.querySelector('.picture__likes').textContent = post.likes;
    miniature.querySelector('.picture__comments').textContent = post.comments.length;
    miniature.querySelector('.picture__img').alt = post.description;
    miniature.addEventListener('click', () => {
      renderBigPicture(post);
    });
    newFragment.append(miniature);
  }
  pictures.append(newFragment);
};


export {renderMiniatures};
