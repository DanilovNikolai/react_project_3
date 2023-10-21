function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomLetter(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function getRandomOrder(min: number, max: number): string {
  const symbol_1 = getRandomLetter;
  const symbol_2 = getRandomNumber(min, max).toString();
  const symbol_3 = getRandomNumber(min, max).toString();
  const symbol_4 = getRandomNumber(min, max).toString();
  return symbol_1 + symbol_2 + symbol_3 + symbol_4;
}

export default getRandomOrder;
