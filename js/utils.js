const getRandomInt = (first, second) => {
  if (first < second) {
    return Math.floor(first + Math.random() * (second + 1 - first));
  }
  throw new Error('Некорректный интервал');
};

const checkStringLength = (value, maxLength) => value <= maxLength;
const isEscapeKey = (evt) => evt.key === 'Escape';

export{checkStringLength, getRandomInt, isEscapeKey};
