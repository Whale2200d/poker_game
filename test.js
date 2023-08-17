let arr = [
  { number: 13, shape: "C" },
  { number: 8, shape: "D" },
  { number: 13, shape: "S" },
  { number: 8, shape: "H" },
  { number: 9, shape: "S" },
];

const CARDS_NUMBER = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const CARDS_SHAPE = ["S", "D", "H", "C"];

function isStraight(cards) {
  const sortedNumbers = cards
    .map((card) => card.number)
    .sort((a, b) => CARDS_NUMBER.indexOf(a) - CARDS_NUMBER.indexOf(b));

  // console.log("sortedNumbers: ", sortedNumbers);

  for (let i = 0; i < sortedNumbers.length - 1; i++) {
    if (
      CARDS_NUMBER.indexOf(sortedNumbers[i + 1]) -
        CARDS_NUMBER.indexOf(sortedNumbers[i]) !==
      1
    ) {
      return false;
    }
  }
  return true;
}

console.log(isStraight(arr));
