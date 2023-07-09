import {BINGO_GAME, BINGO_GAME_ACTION} from "../types"


// 状態管理ストアの作成関数
export const createBingoGameStore = (
    // 前のビンゴゲームの状態 (previousState) とアクション (action) を受け取り、新しいビンゴゲームの状態を返す関数
    reducer: (previousState: BINGO_GAME, action: BINGO_GAME_ACTION) => BINGO_GAME,
    // 初期のビンゴゲームの状態
    initialData: BINGO_GAME
) => {
    // ビンゴゲームの状態が更新されたときに呼び出されるレンダリング関数
    let listener: ((newState: BINGO_GAME) => void) |  undefined;
    // 現在のビンゴゲームの状態
    let currentState = initialData;

    const store = {
        // 現在のビンゴゲームの状態を返す
        getState: () => currentState,

        // 関数を受け取り、ビンゴゲームの状態の変更を監視
        // 返される関数を呼び出すことで、購読を解除できる
        subscribe: (newListener: (newState: BINGO_GAME) => void) => {
            listener = newListener; // 今回はlistenerを一つ

            return function unsubscribe () {
                listener = undefined;
            }
        },


        // アクションを受け取り、reducer を使用して新しいビンゴゲームの状態を計算し、変更をリスナーに通知
        dispatch: (action: BINGO_GAME_ACTION) => {
            let newState = reducer(currentState, action);
            // console.log(newState)
            listener && listener(newState)
        }
    };
    

    return store;
};