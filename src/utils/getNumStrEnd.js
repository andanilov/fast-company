export function getNumStrEnd(number) {
  return Object.entries({
    а: (number) =>
      number % 10 > 1 &&
      number % 10 < 5 &&
      (number % 100 > 20 || number % 100 < 10),
    '': () => true,
  }).find((el) => el[1](number))[0];
}
