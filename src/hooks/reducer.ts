import { BINGO_CARD, BINGO_GAME, BINGO_GAME_ACTION } from "../types";
import { checkBingo } from "../utils/bingo/checkBingo";
import { checkWaiting } from "../utils/bingo/checkWaiting";
import { createDefaultBingoGameState } from "../utils/bingo/createDefaultBingoGameState";
import { generateBingoCard } from "../utils/bingo/generateBingoCard";


const createBingoCards = (playerNames: string[]): BINGO_CARD[] => {
    let bingoCards: BINGO_CARD[] = [];

    playerNames.forEach((playerName) => {
        bingoCards.push(
            {
                playerName: playerName, 
                card: generateBingoCard()
            }
        )
    })

    return bingoCards;
};

const updateWinnerNames = (bingoGame: BINGO_GAME): BINGO_GAME => {
    const { bingoCards, selectedNumbers, winnerNames } = bingoGame;
  
    // ビンゴを達成したプレーヤーの名前を格納する配列
    const previousWinnerNames: string[][] = [...winnerNames];
    const newWinnerNames: string[] = [];
  
    // 各ビンゴカードごとにビンゴをチェック
    for (const card of bingoCards) {  
        // 行・列・斜めのいずれかのラインがビンゴになっているかをチェック
        if ( !winnerNames.flat().includes(card.playerName) && checkBingo(card.card, selectedNumbers) ) {
            newWinnerNames.push(card.playerName);
        }
    }
    
    if(newWinnerNames.length){
        previousWinnerNames.push(newWinnerNames);
    }

    // winnerNamesを更新した新しいBINGO_GAMEオブジェクトを返す
    return {
        ...bingoGame,
        winnerNames: previousWinnerNames,
    };
};

const updateWatingPlayerName = (bingoGame: BINGO_GAME): BINGO_GAME => {
    const { bingoCards, selectedNumbers, waitingPlayerNames } = bingoGame;
  
    // リーチを達成したプレーヤーの名前を格納する配列
    const newWatingPlayerNames: string[] = [...waitingPlayerNames];
  
    // 各ビンゴカードごとにリーチをチェック
    for (const card of bingoCards) {  
        // 行・列・斜めのいずれかのラインがリーチになっているかをチェック
        if ( !waitingPlayerNames.includes(card.playerName) && checkWaiting(card.card, selectedNumbers) ) {
            newWatingPlayerNames.push(card.playerName);
        }
    }
  
    return {
        ...bingoGame,
        waitingPlayerNames: newWatingPlayerNames,
    };
};

export const bingoGameReducer = (
    previousState: BINGO_GAME, 
    action: BINGO_GAME_ACTION
): BINGO_GAME => {

    switch (action.type) {
        case 'GAME_START':
            // ゲーム開始アクションが発生した場合の処理
            if(action.payload.hostName && action.payload.playerNames) {
                return {
                    ...previousState,
                    host: action.payload.hostName,
                    gameStarted: true,
                    numPlayers: action.payload.playerNames.length,
                    bingoCards: createBingoCards(action.payload.playerNames),
                };
            }
            
            // playerNamesが渡されていない場合、numPlayers===1として'GAME_START'
            return {
                ...previousState,
                gameStarted: true,
                numPlayers: 1,
                bingoCards: createBingoCards(["Anonymous"]),
                selectedNumbers: [0],
            };
        case 'GAME_END':
            // ゲーム終了アクションが発生した場合の処理
            return createDefaultBingoGameState();
        case 'GENERATE_CARD':
            if(action.payload.playerNames) {
                return {
                    ...previousState,
                    numPlayers: previousState.numPlayers + action.payload.playerNames.length,
                    bingoCards: [...previousState.bingoCards, ...createBingoCards(action.payload.playerNames)],
                };
            }

            return {...previousState};
        case 'SHOW_RESULT':
            // ビンゴ判定のロジック
            if (previousState.selectedNumbers.length > 4) {     
                const allPlayersBingo = previousState.bingoCards.every((card) => checkBingo(card.card, previousState.selectedNumbers));
                
                if (allPlayersBingo) {
                    return {
                        ...previousState,
                        gameStarted: false,
                    };
                }
            }

            return {...previousState};
        case 'DRAW_NUMBER':
            // Draw number logic here
            const number = action.payload.number;
            
            let newState = {...previousState};

            // newStateのselectedNumbersに新しいnumberを追加
            if (number && !newState.selectedNumbers.includes(number)) {
                newState = {
                    ...newState,
                    // numSelecting: true,
                    selectedNumbers: [...newState.selectedNumbers, number],
                };
            }

            if (previousState.selectedNumbers.length > 4) {      
                // リーチが成立したユーザーのリストに追加
                newState = updateWatingPlayerName(newState);    

                // ビンゴが成立したユーザーのリストに追加
                newState = updateWinnerNames(newState);
            }

            return newState;
        default:
            return {...previousState};
    }

};

  