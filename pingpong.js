function pingpong(n, cur = 1, acc = 1, turnValue = -1) {
  if (n === cur) return acc;

  if (turnValue === -1) {
    if (cur % 7 === 0 || cur.toString().includes("7")) {
      turnValue = 1;
      return pingpong(n, cur + 1, acc - 1 * turnValue, turnValue);
    } else {
      return pingpong(n, cur + 1, acc - 1 * turnValue, turnValue);
    }
  } else if (turnValue === 1) {
    if (cur % 7 === 0 || cur.toString().includes("7")) {
      turnValue = -1;
      return pingpong(n, cur + 1, acc - 1 * turnValue, turnValue);
    } else {
      return pingpong(n, cur + 1, acc - 1 * turnValue, turnValue);
    }
  }
}

// print
let testArray = [8, 22, 68, 100];
for (let i = 0; i < testArray.length; i++) {
  console.log(`pingpong(${testArray[i]}): ${pingpong(testArray[i])}`);
}
