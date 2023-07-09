import { useState } from "react";

type Props = {
    onGameStart: (hostName: string, playerNames: string[]) => void
};

// ホストユーザーがビンゴゲームを開始するコンポーネント
const GameStart = (props: Props) => {
    const [numPlayers, setNumPlayers] = useState<number>(2);
    // const [hostName, setHostName] = useState<string>("Host");

    const [playerNames, setPlayerNames] = useState<string[]>([]);

    const handleStart = () => {
        props.onGameStart("HOST", playerNames.slice(0, numPlayers));
    };

    const handlePlayerNameChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = e.target.value.trim();
        setPlayerNames(updatedPlayerNames);
    };

    const renderPlayerInputs = () => {
        const inputs = [];
        for (let i = 0; i < numPlayers; i++) {
            inputs.push(
                <input
                    key={i}
                    type="text"
                    maxLength={10}
                    value={playerNames[i] || ''}
                    onChange={(e) => handlePlayerNameChange(i, e)}
                    placeholder={`プレイヤー ${i + 1} `}
                />
            );
        }
        return inputs;
    };

    const hasEnoughPlayerNames = (numPlayers: number, playerNames: string[]): boolean => {
        // playerNames 配列に numPlayers 以上のプレイヤーの名前が含まれている場合は true を返し、含まれていない場合は false を返す
        return numPlayers <= playerNames
                                .slice(0, numPlayers) // playerNames 配列を最初の numPlayers 要素に切り抜く。
                                .filter(Boolean) // 次に、結果の配列に対して filter() メソッドを呼び出して、空の文字列を削除。
                                .length;
    };
    const isUnique = (array: string[]) => {
        const set = new Set(array);
        return set.size === array.length;
    };
    
  
    return (
        <div>
            <h1 style={{textAlign: "center", margin: "35px 0 30px"}}><em>B!NGO</em></h1>

            <div style={{background: "#fff5", padding: "20px", borderRadius: "10px"}}>
                {/* <h3 style={{margin: "20px 10px 0px"}}>- ホスト名</h3>
                <input
                    type="text"
                    maxLength={15}
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="ホスト名"
                /> */}

                <h3 style={{margin: "20px 10px 0px"}}>- プレイヤー数</h3>
                <input
                    type="number"
                    min={1}
                    max={50}
                    value={numPlayers}
                    onChange={
                        (e) => {
                            let  num = Number(e.target.value);
                            (num > 20) 
                                ? setNumPlayers(20) 
                                : (num < 1) ? setNumPlayers(1) : setNumPlayers(Number(e.target.value))
                        }
                    }
                />

                <h3 style={{margin: "20px 10px 0px"}}>- プレイヤー名</h3>
                {renderPlayerInputs()}

                <div style={{backgroundColor: "#fff", width: "180px", borderRadius: "8px", margin: "50px auto 20px"}}>
                    <button 
                        type="submit"
                        style={{fontSize: "1.5rem", width: "180px", padding: "6px"}}
                        onClick={handleStart}
                        disabled={
                            // !hostName || 
                            !hasEnoughPlayerNames(numPlayers, playerNames) || 
                            !isUnique(playerNames.slice(0, numPlayers))
                        }
                    >
                        はじめる
                    </button>    
                </div>

            </div>
      </div>
    );
};

export default GameStart;