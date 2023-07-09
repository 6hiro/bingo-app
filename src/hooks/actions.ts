import { BINGO_GAME_ACTION } from "../types"

export const createAction = {
    
    startGame: (hostName: string, playerNames: string[]): BINGO_GAME_ACTION => {
        return  {
            type: "GAME_START", 
            payload: {hostName, playerNames}
        };
    },

    endGame: (): BINGO_GAME_ACTION => {
        return {
            type: "GAME_END", 
            payload: {}
        };
    },

    showResult: (): BINGO_GAME_ACTION => {
        return {
            type: "SHOW_RESULT", 
            payload: {}
        };
    },
    
    generateBingoCard: (): BINGO_GAME_ACTION => {
        return {
            type: "GENERATE_CARD", 
            payload: {}
        };
    },
    
    drawNumber:  (number: number): BINGO_GAME_ACTION => {
        return {
            type: "DRAW_NUMBER", 
            payload: {number}
        };
    },
};