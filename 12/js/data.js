import {getRandomInt} from './utils.js' ;

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.'];
const NAMES = ['Миша',
  'Андрей', 'Максим', 'Никита', 'Костя'];

const generateComments = () => {
  const comments = [];
  for (let i = 0; i < getRandomInt(1, 20); i++) {
    const comment = {
      id: i,
      avatar: `img/avatar-${  getRandomInt(1, 6)  }.svg`,
      message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
};

const generatePhotoObjects = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${  i  }.jpg`,
      description: `hello, it's my ${  i  } photo!`,
      likes: getRandomInt(15, 200),
      comments: generateComments(),
    };
    photos.push(photo);
  }
  //console.log(photos);
  return photos;
};

export {generatePhotoObjects};
