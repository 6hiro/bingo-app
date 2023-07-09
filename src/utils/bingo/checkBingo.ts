// ビンゴ判定関数
export const checkBingo = (card: number[][], numbers: number[]): boolean => {
    // 横方向のビンゴ判定　checkHorizontalLine
    // 行のいずれかがすべてマークされているかをチェック
    for (let i = 0; i < 5; i++) {
      let count = 0;
      for (let j = 0; j < 5; j++) {
        if (numbers.includes(card[i][j])) {
          count++;
        }
      }
      if (count === 5) {
        return true;
      }
    }


    // 縦方向のビンゴ判定 checkVerticalLine
    // 列のいずれかがすべてマークされているかをチェック
    for (let i = 0; i < 5; i++) {
      let count = 0;
      for (let j = 0; j < 5; j++) {
        if (numbers.includes(card[j][i])) {
          count++;
        }
      }
      if (count === 5) {
        return true;
      }
    }
  
    // 斜め方向のビンゴ判定 checkDiagonalLines
    // 斜めのいずれかがすべてマークされているかをチェック
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
    if (count1 === 5 || count2 === 5) {
      return true;
    }
  
    return false;

    // checkHorizontalLine(numbers) ||
    // checkVerticalLine(numbers) ||
    // checkDiagonalLines(numbers)
};
  

// const isBingo = checkBingo(card, selectedNumbers);
// if (isBingo) {
//   console.log('ビンゴが成立しました！');
// }

// test
// const card = [
//     [4, 25, 41, 60, 75],
//     [11, 27, 45, 57, 68],
//     [14, 24, 0, 56, 61],
//     [15, 18, 36, 46, 66],
//     [8, 23, 42, 51, 69]
// ];

// // const selectedNumbers = [0, 41, 45, 36, 42]; // 縦（0含む）
// // const selectedNumbers = [0, 4, 11, 14, 15, 8]; // 縦（0含ない）
// // const selectedNumbers = [0, 25, 27, 24, 18, 23]; // 縦（0含ない）
// // const selectedNumbers = [0, 60, 57, 56, 46, 51]; // 縦（0含ない）
// // const selectedNumbers = [0, 75, 68, 61, 66, 69]; // 縦（0含ない）

// // const selectedNumbers = [14, 24, 0, 56, 61]; // 横（0含む）
// // const selectedNumbers = [0, 4, 25, 41, 60, 75]; // 横（0含むない）
// // const selectedNumbers = [0, 11, 27, 45, 57, 68]; // 横（0含むない）
// // const selectedNumbers = [0, 15, 18, 36, 46, 66]; // 横（0含むない）
// // const selectedNumbers = [0, 8, 23, 42, 51, 69]; // 横（0含むない）

// const selectedNumbers = [4, 27, 0, 46, 69]; // 斜め
// // const selectedNumbers = [8, 18, 0, 57, 75]; // 斜め

// console.log(checkBingo(card, selectedNumbers))