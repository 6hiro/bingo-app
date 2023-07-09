import { BINGO_GAME_ACTION, BINGO_GAME } from "../types";
import { createAction } from "../hooks/actions";
import GameStart from "./GameStart";
import BingoCard from "./BingoCard";
import GameResult from "./GameResult";
import Footer from "./Footer";

type BingoGameProps = {
    bingoGameState: BINGO_GAME;
    dispatch: (action: BINGO_GAME_ACTION) => void;
};

// ビンゴゲームのメインコンポーネント
const BingoGame = (props: BingoGameProps) => {
    const { bingoGameState, dispatch } = props;

    // ゲーム開始時の処理
    const handleGameStart = (hostName: string, playerNames: string[]) => {
        dispatch(createAction.startGame(hostName, playerNames))
    };

    const handleShowResult = () => {
        dispatch(createAction.showResult())
    };

    // ルーレットで選ばれた抽選番号の処理
    const handleNumberSelected = (number: number) => {
        dispatch(createAction.drawNumber(number))
    };

    // ゲーム終了時の処理
    const handleGameEnd = () => {
        dispatch(createAction.endGame())
    };

    return (
        <div>
            {(!bingoGameState.gameStarted && !bingoGameState.bingoCards.length) ? <GameStart onGameStart={handleGameStart} />: null}

            {(!bingoGameState.gameStarted && bingoGameState.bingoCards.length) ? <GameResult onGameEnd={handleGameEnd}  bingoGameState={bingoGameState} /> : null}

            {bingoGameState.gameStarted 
                ? (
                    <div style={{ padding: "0px", borderRadius: "10px"}}>

                        {bingoGameState.numPlayers === bingoGameState.winnerNames.flat().length 
                            ?   (
                                    <div 
                                        style={{
                                            zIndex: "9999",
                                            position: "fixed",
                                             top: "20px",
                                             right: "20px",
                                        }}
                                    >
                                        <button 
                                            onClick={handleShowResult}
                                            style={{fontSize: "1.4em", width: "260px", height: "70px", backgroundColor: "#fff", color: "#242424", fontWeight: "600", border: "4px solid #242424"}}
                                        >
                                            結果を表示
                                        </button>
                                    </div>  
                                )
                            : null
                        }

                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            {bingoGameState.bingoCards.map((card, index) => (
                                <BingoCard 
                                    key={index} 
                                    card={card} 
                                    selectedNumbers={bingoGameState.selectedNumbers} 
                                    winnerNames={bingoGameState.winnerNames} 
                                    waitingPlayerNames={bingoGameState.waitingPlayerNames} 
                                />
                            ))}
                        </div>

                        <Footer onNumberSelected={handleNumberSelected} bingoGameState={bingoGameState} />
                    </div>
                )
                : null
            }
        </div>
    )
};

export default BingoGame;