
const randomize = (first, second) => first <= second ? Math.random(first, second) : 'Некорректный интервал';

const commentChecker = (comment, maxLength) => comment <= maxLength;
