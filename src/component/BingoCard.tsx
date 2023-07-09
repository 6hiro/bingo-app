import { BINGO_CARD } from '../types';
import { getNestedIndex } from '../utils/getNestedIndex';

type BingoCardProps = {
    card: BINGO_CARD,
    selectedNumbers: number[],
    winnerNames: string[][],
    waitingPlayerNames: string[],
};


// ビンゴカードを表示するコンポーネント
const BingoCard = (props: BingoCardProps) => {
      
    return (
        <div style={{margin: "0 15px 25px 15px"}}>
            <h2 style={{color: "#1a1a1a", marginLeft: "5px", marginBottom: "2px", fontSize: "1.8rem", display: "flex", height: "50px"}}>

                {props.waitingPlayerNames.includes(props.card.playerName) 
                    ? <div style={{fontSize: "1.6rem", width: "120px", textAlign: "center", padding: "5px 10px"}}>
                        {props.winnerNames.flat().includes(props.card.playerName) 
                            ? <div style={{color: "#000", border: "2px solid #fff", borderRadius: "10px", backgroundColor: "#1ed8fa"}}>
                                {getNestedIndex(props.winnerNames, props.card.playerName)+1}
                            </div>
                            : <div style={{color: "#fff", border: "2px solid #fff", borderRadius: "10px", backgroundColor: "#222"}}>リーチ</div>
                        }
                    </div>
                    : <div></div>
                }
                {props.card.playerName}
            </h2>

            <table style={{ borderSpacing: "3px"}}>
                <tbody>
                    {props.card.card.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((number, colIndex) => (
                                <td 
                                    key={colIndex} 
                                    style={{
                                        background: 
                                            `${props.selectedNumbers.includes(number) 
                                                ? number ? "#000" : "#000"
                                                : "#fff6"
                                            }`,
                                        border: `2px ${number ? "#fff" : "#000"} solid`,
                                        margin: "15px"
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "2.2rem",
                                            fontWeight: "700",
                                            margin: "5px",
                                            width: "40px",
                                            height: "40px",
                                        }}
                                    >
                                        {number 
                                            ? <span 
                                                style={{
                                                    color: `${props.selectedNumbers.includes(number) 
                                                        ? props.selectedNumbers[props.selectedNumbers.length-1]===number ? "#fd236c" :"#fff"
                                                        : "#242424"}`
                                                }}>{number}</span>
                                            : <span 
                                                style={{
                                                    fontSize: "1.8rem", 
                                                    color: "#ebe9de",
                                                    transform: "rotate(-15deg)",
                                                }}>Free</span>
                                        }
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BingoCard;