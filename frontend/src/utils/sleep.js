export const sleep = (ms, value) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(value);
  }, ms);
});