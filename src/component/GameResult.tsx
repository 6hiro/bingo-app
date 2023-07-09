import { BINGO_GAME } from "../types";

type Props = {
    onGameEnd: () => void,
    bingoGameState: BINGO_GAME
}
const GameResult = (props: Props) => {

    const handleEnd = () => props.onGameEnd();

    return (
        <div>
            <h1 style={{textAlign: "center", textShadow: "5px 3px white"}}>ゲーム結果</h1>

            <div
                style={{background: "#ffffff99", padding: "20px 30px", borderRadius: "10px"}}
            >
                <div>
                    {props.bingoGameState.winnerNames.map((names, i) => {
                        return (
                            <div 
                                key={i} 
                                style={{textAlign: "center", color: "#1a1a1a", margin: "20px 0", display: "flex", gap: "10px", fontSize: `${i===0 ? "3rem" : "2rem"}`}}
                            >
                                <div style={{
                                    width: `${i===0 ? "70px" : "60px"}`,
                                    height: `${i===0 ? "75px" : "55px"}`,
                                    borderRadius: "10px",
                                    background: `${i===0 ? "#7efea9" : "#fff"}`
                                }}>{i+1}.</div>
                                <div style={{display: "flex", gap: "10px"}}>
                                    {names.map((name, i) => {
                                        return <div key={i} style={{ height: "55px",padding: "0 10px"}}>{name}</div>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={{textAlign: "center", margin: "50px 0 20px", fontWeight: "600"}}>
                    <button 
                        onClick={handleEnd}
                        style={{fontSize: "1.4em", width: "260px", height: "70px", backgroundColor: "#fff", color: "#242424", border: "4px solid #242424"}}
                    >
                        新しいゲームを始める
                    </button>
                </div>  
            </div>

        </div>
    )
}

export default GameResult;