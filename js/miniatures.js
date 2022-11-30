import { generatePhotoObjects } from './data';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const newFragment = document.createDocumentFragment();

const renderMiniatures = () => {
  for (const post of generatePhotoObjects()) {
    const miniature = pictureTemplate.cloneNode(true);
    const miniatureImage = miniature.querySelector('.picture__img');
    const miniatureLikes = miniature.querySelector('.picture__likes');
    const miniatureComments = miniature.querySelector('.picture__comments');
    miniatureImage.src = post.url;
    miniatureLikes.textContent = post.likes;
    miniatureComments.textContent = post.comments.length;
    newFragment.append(miniature);
  }
  pictures.append(newFragment);
};

export {renderMiniatures};
