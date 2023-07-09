export type BINGO_CARD = {
    // カードの所有者の名前
    playerName: string, 
    // ビンゴカード
    card: number[][]
};

// アプリケーション全体で管理する BINGO_GAME の状態
export type BINGO_GAME = {
    // ビンゴゲームの主催者の名前
    host: string,
    // ゲームが開始されているかどうかを示すブール値
    gameStarted: boolean,
    // 数字が抽選中かどうかを示すブール値
    // numSelecting: boolean,
    // ビンゴゲームの参加者数
    numPlayers: number, // bingoCards.length 不要？
    // ビンゴカードを表すオブジェクトの配列
    bingoCards: BINGO_CARD[],
    // ビンゴゲームで抽選された数字を表す数字の配列
    selectedNumbers: number[],
    waitingPlayerNames: string[],
    // ビンゴゲームで勝利したプレーヤーの名前をリストする文字列の配列。
    winnerNames: string[][],
};

// ビンゴゲームで実行できるアクションの種類
export type BINGO_GAME_ACTION_TYPES = 
    // ゲームの開始を示すアクション
    "GAME_START" |
    // ゲームの終了を示すアクション
    "GAME_END" | 
    // ビンゴカードの生成を示すアクション
    "GENERATE_CARD" |
    // "SET_NUM_SELECTING" |
    // "RESET_NUM_SELECTING" |
    "SHOW_RESULT" |
    //  ビンゴゲームで数字を抽選するアクション 
    "DRAW_NUMBER" ; 
// generateCard, drawNumber, markNumber, checkBingo


// ビンゴゲームで実行できるアクションを定義
export type BINGO_GAME_ACTION = {
    // アクションのタイプを指定する文字列
    type: BINGO_GAME_ACTION_TYPES
    // アクションに関連するデータを持つオブジェクト。
    payload: 
    {
        // gameStarted?: boolean,
        hostName?: string,
        playerNames?: string[],
        number?: number
    }
};


// 例
// const bingoGame = {
//     host: "Bard",
//     gameStarted: false,
//     numPlayers: 3,
//     bingoCards: [
//       {
//         playerName: "Alice",
//         card: [
//           [1, 14, 34, 49, 64],
//           [2, 15, 35, 50, 65],
//           [3, 16, 36, 51, 66],
//           [4, 17, 37, 52, 67],
//           [5, 18, 38, 53, 68],
//         ],
//       },
//       {
//         playerName: "Bob",
//         card: [
//           [6, 19, 39, 54, 69],
//           [7, 20, 40, 55, 70],
//           [8, 21, 41, 56, 71],
//           [9, 22, 42, 57, 72],
//           [10, 23, 43, 58, 73],
//         ],
//       },
//       {
//         playerName: "Carol",
//         card: [
//          [11, 24, 44, 59, 74],
//           [12, 25, 45, 60, 75],
//           [13, 26, 46, 61, 76 ],
//           [14, 27, 47, 62, 77],
//           [15, 28, 48, 63, 78],
//         ],
//       },
//     ],
//     selectedNumbers: [],
//     winnerNames: [],
// };
  