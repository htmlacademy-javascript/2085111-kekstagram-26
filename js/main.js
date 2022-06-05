const checkStringLength = (stringLength, maxLength) => stringLength <= maxLength;

checkStringLength(20, 40);


const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Источник, где подсмотрела основу для этой функции: https://developer.mozilla.org/

getRandomNumber(4, 10);
