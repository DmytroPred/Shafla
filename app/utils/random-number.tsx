export const randomNum = (end: number): number => {
  const randomNumber = Math.floor(Math.random() * (end + 1));

  if (randomNumber === end) {
    return randomNum(end);
  }

  return randomNumber;
};
