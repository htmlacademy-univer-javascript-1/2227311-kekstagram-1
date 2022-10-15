
const getRandomInt = (first, second) => {
  if (first < second) {
    return Math.floor(first + Math.random() * (second + 1 - first));
  }
  throw new Error("Некорректный интервал");
};

const checkStringLength = (value, maxLength) => value <= maxLength;
checkStringLength();


const generatePhotoObjects = () => {
  const photos = [];

  const generateComments = () => {
    const messages = ["Всё отлично!",
      "В целом всё неплохо. Но не всё."];
    const names = ["Миша",
      "Андрей", "Максим", "Никита", "Костя"];
    const comments = [];
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      const comment = {
        id: 1234,//???
        avatar: "img/avatar-" + getRandomInt(1, 6) + ".svg",
        message: messages[getRandomInt(0, messages.length - 1)],
        name: names[getRandomInt(0, names.length - 1)]
      };
      comments.push(comment);
    }
    return comments;
  };


  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: "photos/" + i + ".jpg",
      description: "hello, it's my " + i + " photo!",
      likes: getRandomInt(15, 200),
      comments: generateComments(),
    };
    photos.push(photo);
  }
  //console.log(photos);
  return photos;
};

generatePhotoObjects();
