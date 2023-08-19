const fs = require("fs");

function readCardsFromFile(lines, i = 0) {
  const player1Cards = lines[i].slice(0, 14).split(" ");
  const player2Cards = lines[i].slice(15).split(" ");

  return [player1Cards, player2Cards];
}

const CARDS_NUMBER = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// const CARDS_SHAPE = ["S", "D", "H", "C"];

function sameValue(playerCards) {
  // Four of a kind 인지
  const isFourOfAKind = (cards) => {
    const numberCounts = {};

    // 카드 숫자 세기
    for (const card of cards) {
      const number = card.number;
      numberCounts[number] = (numberCounts[number] || 0) + 1;
    }

    // Four of a Kind인지 확인하기
    for (const number in numberCounts) {
      if (numberCounts[number] === 4) {
        return true;
      }
    }

    return false;
  };
  const hasFourOfAKind = isFourOfAKind(playerCards);

  // Full house인지
  const isFullHouse = (cards) => {
    const numberCounts = {};

    // 카드 숫자 세기
    for (const card of cards) {
      const number = card.number;
      numberCounts[number] = (numberCounts[number] || 0) + 1;
    }

    let hasThreeOfAKind = false;
    let hasTwoOfAKind = false;

    // Full House인지 확인하기
    for (const number in numberCounts) {
      if (numberCounts[number] === 3) {
        hasThreeOfAKind = true;
      } else if (numberCounts[number] === 2) {
        hasTwoOfAKind = true;
      }
    }

    return hasThreeOfAKind && hasTwoOfAKind ? true : false;
  };
  const hasFullHouse = isFullHouse(playerCards);

  // Three of a kind인지
  const isThreeOfAKind = (cards) => {
    const numberCounts = {};

    // 카드 숫자 세기
    for (const card of cards) {
      const number = card.number;
      numberCounts[number] = (numberCounts[number] || 0) + 1;
    }

    // Three of a kind 인지 확인하기
    for (const number in numberCounts) {
      if (numberCounts[number] === 3) {
        return true;
      }
    }
    // console.log("numberCounts: ", numberCounts);

    return false;
  };
  const hasThreeOfAKind = isThreeOfAKind(playerCards);

  // Two Pair인지, One Pair인지
  const isTwoPairOrOnePair = (cards) => {
    const numberCounts = {};

    // 카드 숫자 세기
    for (const card of cards) {
      const number = card.number;
      numberCounts[number] = (numberCounts[number] || 0) + 1;
    }

    let pairCount = 0;

    // Two pair인지, One Pair인지 확인하기
    for (const number in numberCounts) {
      if (numberCounts[number] === 2) {
        pairCount++;
      }
    }

    if (pairCount === 1) return "One Pair";
    if (pairCount === 2) return "Two Pair";
  };
  const hasTwoPairOfOnePair = isTwoPairOrOnePair(playerCards);

  if (hasFourOfAKind) return "Four of a Kind"; // Four of a Kind
  if (hasFullHouse) return "Full House"; // Full House
  if (hasThreeOfAKind) return "Three of a Kind"; // 'Three of a Kind'
  if (hasTwoPairOfOnePair === "Two Pair") return "Two Pair"; // 'Two Pair'
  if (hasTwoPairOfOnePair === "One Pair") return "One Pair"; // 'One Pair'
  return "High Card"; // 'High Card'
}

function isFlush(cards) {
  const shape = new Set();

  for (const card of cards) {
    shape.add(card.shape);
  }
  return shape.size === 1;
}

function isStraight(cards) {
  const sortedNumbers = cards
    .map((card) => card.number)
    .sort((a, b) => CARDS_NUMBER.indexOf(a) - CARDS_NUMBER.indexOf(b));

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

function isRoyal(cards) {
  const royalNumbers = [10, 11, 12, 13, 14];
  const sortedNumbers = cards
    .map((card) => card.number)
    .sort((a, b) => CARDS_NUMBER.indexOf(a) - CARDS_NUMBER.indexOf(b));

  for (let i = 0; i < royalNumbers.length; i++) {
    if (sortedNumbers.indexOf(royalNumbers[i]) === -1) {
      return false;
    }
  }
  return true;
}

function whatIsMyCardRanking(playerCards) {
  // Royal Flush
  if (isStraight(playerCards) && isRoyal(playerCards) && isFlush(playerCards))
    return 10;

  // Straight Flush
  if (isStraight(playerCards) && !isRoyal(playerCards) && isFlush(playerCards))
    return 9;

  // Four of a kind
  if (
    !isStraight(playerCards) &&
    !isFlush(playerCards) &&
    sameValue(playerCards) === "Four of a Kind"
  )
    return 8;

  // Full House
  if (
    !isStraight(playerCards) &&
    !isFlush(playerCards) &&
    sameValue(playerCards) === "Full House"
  )
    return 7;

  // Flush
  if (!isStraight(playerCards) && isFlush(playerCards)) return 6;

  // Straight
  if (isStraight(playerCards) && !isFlush(playerCards)) return 5;

  // Three of a kind
  if (
    !isStraight(playerCards) &&
    !isFlush(playerCards) &&
    sameValue(playerCards) === "Three of a Kind"
  )
    return 4;

  // Two Pair
  if (
    !isStraight(playerCards) &&
    !isFlush(playerCards) &&
    sameValue(playerCards) === "Two Pair"
  )
    return 3;

  // One Pair
  if (
    !isStraight(playerCards) &&
    !isFlush(playerCards) &&
    sameValue(playerCards) === "One Pair"
  )
    return 2;

  // High Card
  if (
    !isStraight(playerCards) &&
    !isFlush(playerCards) &&
    sameValue(playerCards) === "High Card"
  )
    return 1;
}

function sortedCardsNumber(cards) {
  const sortedNumbers = cards
    .map((card) => card.number)
    .sort((a, b) => CARDS_NUMBER.indexOf(b) - CARDS_NUMBER.indexOf(a));

  return sortedNumbers;
}

function findThreeOfAKindOrFourOfAKind(cards, pair) {
  const numberCounts = {};

  // 카드 숫자 세기
  for (const card of cards) {
    const number = card.number;
    numberCounts[number] = (numberCounts[number] || 0) + 1;
  }

  // Three of a kind 인지 확인하기
  for (const number in numberCounts) {
    if (numberCounts[number] === pair) {
      return numberCounts;
    }
  }
}

function findOnePairOrTwoPair(cards, pair) {
  const numberCounts = {};

  // 카드 숫자 세기
  for (const card of cards) {
    const number = card.number;
    numberCounts[number] = (numberCounts[number] || 0) + 1;
  }

  let pairCount = 0;

  // Two pair인지, One Pair인지 확인하기
  for (const number in numberCounts) {
    if (numberCounts[number] === 2) {
      pairCount++;
    }
  }

  // console.log("numberCounts: ", numberCounts); // 왜 순서대로 잘 들어가는지?
  if (pairCount === pair) return numberCounts;
}

function whoisHighCard(player1Cards, player2Cards) {
  let highestNumber1 = sortedCardsNumber(player1Cards)[0];
  let highestNumber2 = sortedCardsNumber(player2Cards)[0];

  if (highestNumber1 > highestNumber2) return "Player 1";
  if (highestNumber1 < highestNumber2) return "Player 2";
}

function deletePairsHandArray(playerCards, keyArray) {
  let playerDeletePairsHandArray = [...playerCards];
  for (let i = 0; i < keyArray.length; i++) {
    for (let j = 0; j < playerCards.length; j++) {
      if (playerCards[j].number === Number(keyArray[i]))
        playerDeletePairsHandArray.splice(j, 1);
    }
  }
  return playerDeletePairsHandArray;
}

function getKeyByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
}

function determineWinner(player1Cards, player2Cards) {
  // return "Player 1";
  let cardRanking1 = whatIsMyCardRanking(player1Cards);
  let cardRanking2 = whatIsMyCardRanking(player2Cards);

  // console.log("cardRanking1: ", cardRanking1);
  // console.log("cardRanking2: ", cardRanking2);

  if (cardRanking1 > cardRanking2) return "Player 1";
  if (cardRanking1 < cardRanking2) return "Player 2";
  if (cardRanking1 === cardRanking2) {
    // Royal Straight Flush
    if (cardRanking1 === 10) {
      return "who is winner?";
    }

    // Straight Flush
    if (cardRanking1 === 9) {
      let sortedPlayer1CardsArray = sortedCardsNumber(player1Cards);
      let sortedPlayer2CardsArray = sortedCardsNumber(player2Cards);

      for (let i = 0; i < sortedPlayer1CardsArray.length; i++) {
        if (sortedPlayer1CardsArray[i] > sortedPlayer2CardsArray[i]) {
          return "Player 1";
        } else if (sortedPlayer1CardsArray[i] < sortedPlayer2CardsArray[i]) {
          return "Player 2";
        }
      }

      return "who is winner?";
    }

    // Four of a kind
    if (cardRanking1 === 8) {
      let player1FourOfAKind = findThreeOfAKindOrFourOfAKind(player1Cards, 4);
      let player2FourOfAKind = findThreeOfAKindOrFourOfAKind(player2Cards, 4);

      let keyArray1 = getKeyByValue(player1FourOfAKind, 4);
      let keyArray2 = getKeyByValue(player2FourOfAKind, 4);

      // Three of a Kind 카드의 값을 비교하여 높은 값을 가진 자로 승자 도출
      if (Number(keyArray1[0]) > Number(keyArray2[0])) return "Player 1";
      if (Number(keyArray1[0]) < Number(keyArray2[0])) return "Player 2";
    }

    // Full House
    if (cardRanking1 === 7) {
      let player1ThreeOfAKind = findThreeOfAKindOrFourOfAKind(player1Cards, 3);
      let player2ThreeOfAKind = findThreeOfAKindOrFourOfAKind(player2Cards, 3);

      let keyArray1 = getKeyByValue(player1ThreeOfAKind, 3);
      let keyArray2 = getKeyByValue(player2ThreeOfAKind, 3);

      // Three of a Kind 카드의 값을 비교하여 높은 값을 가진 자로 승자 도출
      if (Number(keyArray1[0]) > Number(keyArray2[0])) return "Player 1";
      if (Number(keyArray1[0]) < Number(keyArray2[0])) return "Player 2";
    }

    // Flush
    if (cardRanking1 === 6) {
      let sortedPlayer1CardsArray = sortedCardsNumber(player1Cards);
      let sortedPlayer2CardsArray = sortedCardsNumber(player2Cards);

      for (let i = 0; i < sortedPlayer1CardsArray.length; i++) {
        if (sortedPlayer1CardsArray[i] > sortedPlayer2CardsArray[i]) {
          return "Player 1";
        } else if (sortedPlayer1CardsArray[i] < sortedPlayer2CardsArray[i]) {
          return "Player 2";
        }
      }

      return "who is winner?";
    }

    // Straight
    if (cardRanking1 === 5) {
      let sortedPlayer1CardsArray = sortedCardsNumber(player1Cards);
      let sortedPlayer2CardsArray = sortedCardsNumber(player2Cards);

      for (let i = 0; i < sortedPlayer1CardsArray.length; i++) {
        if (sortedPlayer1CardsArray[i] > sortedPlayer2CardsArray[i]) {
          return "Player 1";
        } else if (sortedPlayer1CardsArray[i] < sortedPlayer2CardsArray[i]) {
          return "Player 2";
        }
      }

      return "who is winner?";
    }

    // Three of a kind
    if (cardRanking1 === 4) {
      let player1ThreeOfAKind = findThreeOfAKindOrFourOfAKind(player1Cards, 3);
      let player2ThreeOfAKind = findThreeOfAKindOrFourOfAKind(player2Cards, 3);

      let keyArray1 = getKeyByValue(player1ThreeOfAKind, 3);
      let keyArray2 = getKeyByValue(player2ThreeOfAKind, 3);

      // Three of a Kind 카드의 값을 비교하여 높은 값을 가진 자로 승자 도출
      // 같은 카드가 4장이므로 Three of a kind 이후 값은 비교할 일 없음
      if (Number(keyArray1[0]) > Number(keyArray2[0])) return "Player 1";
      if (Number(keyArray1[0]) < Number(keyArray2[0])) return "Player 2";
    }

    // Two Pairs
    if (cardRanking1 === 3) {
      let player1TwoPairHand = findOnePairOrTwoPair(player1Cards, 2);
      let player2TwoPairHand = findOnePairOrTwoPair(player2Cards, 2);

      let keyArray1 = getKeyByValue(player1TwoPairHand, 2);
      let keyArray2 = getKeyByValue(player2TwoPairHand, 2);

      // Two Pair 중 높은 카드의 값을 비교하여 높은 값을 가진 자로 승자 도출
      if (Number(keyArray1[1]) > Number(keyArray2[1])) return "Player 1";
      if (Number(keyArray1[1]) < Number(keyArray2[1])) return "Player 2";
      if (Number(keyArray1[1]) === Number(keyArray2[1])) {
        if (Number(keyArray1[0]) > Number(keyArray2[0])) return "Player 1";
        if (Number(keyArray1[0]) < Number(keyArray2[0])) return "Player 2";
        if (Number(keyArray1[0]) === Number(keyArray2[0])) {
          // One Pair 카드를 제외하고,
          let deletedOnPairHandArray1 = deletePairsHandArray(
            player1Cards,
            keyArray1
          );
          let deletedOnPairHandArray2 = deletePairsHandArray(
            player2Cards,
            keyArray1
          );

          // One Pair 카드를 제외한 나머지 카드 배열에서 가장 높은 값이 무엇인지 비교
          return whoisHighCard(
            deletedOnPairHandArray1,
            deletedOnPairHandArray2
          );
        }
      }
    }

    // One Pair
    if (cardRanking1 === 2) {
      let player1OnePairHand = findOnePairOrTwoPair(player1Cards, 1);
      let player2OnePairHand = findOnePairOrTwoPair(player2Cards, 1);
      // console.log("player1OnePairHand: ", player1OnePairHand);
      // console.log("player2OnePairHand: ", player2OnePairHand);

      let keyArray1 = getKeyByValue(player1OnePairHand, 2);
      let keyArray2 = getKeyByValue(player2OnePairHand, 2);
      // console.log("keyArray1: ", keyArray1);
      // console.log("keyArray2: ", keyArray2);

      // One Pair 카드의 값을 비교하여 높은 값을 가진 자로 승자 도출
      if (Number(keyArray1[0]) > Number(keyArray2[0])) return "Player 1";
      if (Number(keyArray1[0]) < Number(keyArray2[0])) return "Player 2";
      // One Pair 카드의 값이 같으면, One Pair를 제외하고 나머지 카드 배열에서 가장 높은 값을 비교해서 승자 도출
      if (Number(keyArray1[0]) === Number(keyArray2[0])) {
        // One Pair 카드를 제외하고,
        let deletedOnPairHandArray1 = deletePairsHandArray(
          player1Cards,
          keyArray1
        );
        let deletedOnPairHandArray2 = deletePairsHandArray(
          player2Cards,
          keyArray1
        );
        // console.log("deletedOnPairHandArray1: ", deletedOnPairHandArray1);
        // console.log("deletedOnPairHandArray2: ", deletedOnPairHandArray2);

        // One Pair 카드를 제외한 나머지 카드 배열에서 가장 높은 값이 무엇인지 비교
        return whoisHighCard(deletedOnPairHandArray1, deletedOnPairHandArray2);
      }
    }

    // High Card
    if (cardRanking1 === 1) {
      // 카드가 있는 배열에서 가장 높은 값이 무엇인지 비교
      return whoisHighCard(player1Cards, player2Cards);
    }
  }
}

function makeSeperatedCardHandArray(playerCards) {
  let seperatedCardHandArray = [];

  for (let i = 0; i < playerCards.length; i++) {
    let number = 0;
    if (Number(playerCards[i].slice(0, 1))) {
      number = Number(playerCards[i].slice(0, 1));
    } else {
      if (playerCards[i].slice(0, 1) === "T") number = 10;
      if (playerCards[i].slice(0, 1) === "J") number = 11;
      if (playerCards[i].slice(0, 1) === "Q") number = 12;
      if (playerCards[i].slice(0, 1) === "K") number = 13;
      if (playerCards[i].slice(0, 1) === "A") number = 14;
    }

    let shape = playerCards[i].slice(1);

    seperatedCardHandArray.push({ number, shape });
  }

  return seperatedCardHandArray;
}

function playPokerGame() {
  const filePath = "poker.txt";
  let player1Wins = 0;
  let player2Wins = 0;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\r\n");
    console.log(lines.length);
    for (let i = 0; i < lines.length; i++) {
      const [player1Cards, player2Cards] = readCardsFromFile(lines, i);

      const seperatedCardHandArray1 = makeSeperatedCardHandArray(player1Cards);
      const seperatedCardHandArray2 = makeSeperatedCardHandArray(player2Cards);

      const winner = determineWinner(
        seperatedCardHandArray1,
        seperatedCardHandArray2
      );
      if (winner === "Player 1") {
        player1Wins++;
      } else if (winner === "Player 2") {
        player2Wins++;
      } else {
        console.log("Who is winner?");
        break;
      }
    }
  } catch (err) {
    console.error("파일 읽기 오류:", err);
    return [[], []];
  }

  console.log(`Player 1의 이긴 횟수: ${player1Wins}`);
  // console.log(`Player 2의 이긴 횟수: ${player2Wins}`);
}

playPokerGame();
