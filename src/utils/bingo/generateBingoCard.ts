// ビンゴカードを生成する関数
export const generateBingoCard = (): number[][] => {
    // ビンゴカードの生成ロジックを実装

    const card: number[][] = [];
    const numbers: number[][] = [];
  
    // 各列ごとに数字の範囲を生成
    for (let i = 0; i < 5; i++) {
      const columnNumbers: number[] = [];
      const start = i * 15 + 1; // 列の開始数字
      const end = start + 14; // 列の終了数字
  
      for (let j = start; j <= end; j++) {
        columnNumbers.push(j);
      }
  
      numbers.push(columnNumbers);
    }
  
    // 各マスにランダムに数字を割り当てる
    for (let i = 0; i < 5; i++) {
      card[i] = [];
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
          card[i][j] = 0;
        } else {
          const columnIndex = j;
          const randomIndex = Math.floor(Math.random() * numbers[columnIndex].length);
          card[i][j] = numbers[columnIndex].splice(randomIndex, 1)[0];
        }
      }
    }
  
    return card;
};
  


// // ビンゴカードの数字をマークする関数
// function markNumberInCard(card: { playerName: string; card: number[][] }, number: number): { playerName: string; card: number[][] } {
//   // ビンゴカードの数字をマークするロジックを実装
//   // ...

//   return card; // 仮の返り値
// }