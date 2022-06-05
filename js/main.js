const lengthExam = (commentLength, maxLength) => {
  if (commentLength <= maxLength) {
    return true;
  }

  return false;
};
// Можно ли было прописать в теле функции: return (commentLength <= maxLength) ? true : false; ? Когда пыталась так прописать, программа ругалась...

lengthExam(20, 40);


const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  };
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Источник, где подсмотрела основу для этой функции: https://developer.mozilla.org/

randomNumber(4, 10);
