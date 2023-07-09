import { useState } from "react";

import { BINGO_GAME } from "../types";
import { createBingoGameStore } from "./store"
import { bingoGameReducer } from "./reducer";
import { createDefaultBingoGameState } from "../utils/bingo/createDefaultBingoGameState";


export const useBingoGame = (
    initialState?: BINGO_GAME
) => {
    const [bingoGameState, setBingoGameState] = useState<BINGO_GAME>(initialState ? initialState : createDefaultBingoGameState());

    const store = createBingoGameStore(bingoGameReducer, bingoGameState);

    const listener = (newState: BINGO_GAME) => {
        setBingoGameState(newState);
    };

    store.subscribe(listener);

    return [ store ];
};