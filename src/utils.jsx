import { useStore } from "./store";
const arr = [1];

const increaseScore = () => {
  useStore.setState({ scoreValue: 2 });
};

const bonus1 = () => {
  increaseScore();
  setTimeout(() => {
    useStore.setState({ scoreValue: 1 });
  }, 10000);
};

const bonus2 = () => {
  console.log("Bonus 2");
};

const bonus3 = () => {
  console.log("Bonus 3");
};

export const random = () => {
  const i = arr[Math.floor(Math.random() * arr.length)];
  if (i <= 0) return random();
  return i;
};

export const execute = () => {
  const i = random();
  eval(`bonus${i}()`);
};
