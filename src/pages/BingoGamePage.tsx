import { useBingoGame } from "../hooks/useBingoGame";
import BingoGame from "../component/BingoGame";


const BingoGamePage = () => {

    const [ store ] = useBingoGame();

    let bingoGameState = store.getState();

    return (
        <div style={{marginBottom: "50px", padding: "40px 15px", width: "100vw"}}>
            <BingoGame bingoGameState={bingoGameState} dispatch={store.dispatch} />
        </div>
    )
};

export default BingoGamePage;