export const randomNum = (end: number): number => {
  const randomNumber = Math.floor(Math.random() * (end + 1));

  if (randomNumber === end) {
    randomNum(end);
  }

  return randomNumber;
};
