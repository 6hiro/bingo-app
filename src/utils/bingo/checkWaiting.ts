// ビンゴ判定関数
export const checkWaiting = (card: number[][], numbers: number[]): boolean => {
    // 横方向のビンゴ判定　checkHorizontalLine
    for (let i = 0; i < 5; i++) {
      let count = 0;
      for (let j = 0; j < 5; j++) {
        if (numbers.includes(card[i][j])) {
          count++;
        }
      }
      if (count === 4) {
        return true;
      }
    }


    // 縦方向のビンゴ判定 checkVerticalLine
    for (let i = 0; i < 5; i++) {
      let count = 0;
      for (let j = 0; j < 5; j++) {
        if (numbers.includes(card[j][i])) {
          count++;
        }
      }
      if (count === 4) {
        return true;
      }
    }
  
    // 斜め方向のビンゴ判定 checkDiagonalLines
    let count1 = 0;
    let count2 = 0;
    for (let i = 0; i < 5; i++) {
      if (numbers.includes(card[i][i])) {
        count1++;
      }
      if (numbers.includes(card[i][4 - i])) {
        count2++;
      }
    }
    if (count1 === 4 || count2 === 4) {
      return true;
    }
  
    return false;

    // checkHorizontalLine(numbers) ||
    // checkVerticalLine(numbers) ||
    // checkDiagonalLines(numbers)
};