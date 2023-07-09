import { BINGO_GAME } from "../../types";

export const createDefaultBingoGameState = (): BINGO_GAME => {
    return {
        host: "",
        gameStarted: false,
        // numSelecting: false,
        numPlayers: 1,
        bingoCards: [],
        selectedNumbers: [0],
        winnerNames: [],
        waitingPlayerNames: []
    }
};