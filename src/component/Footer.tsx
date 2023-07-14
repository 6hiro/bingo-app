import useToggle from '../hooks/useToggle';
import { BINGO_GAME } from '../types';
import { useCallback, useState } from "react";
import { delay } from "../utils/delay";
import { ImSpinner11 } from 'react-icons/im';
import LotteryScreen from "./LotteryScreen";
import useAudio from '../hooks/useAudio';

type Props = {
    onNumberSelected: (number: number) => void,
    bingoGameState: BINGO_GAME,
};

const Footer = (props: Props) => {
    // const rouletteSound = new Audio("./finish.mp3");
    // const finishSound = new Audio("./finish.mp3");
    const [isVisible, setIsVisible] = useToggle(false);
    // const [rouletteAudio, rouletteAudioState, rouletteAudioControls] = useAudio({ src: "./roulette.mp3", autoPlay: false, loop:false, id: 'audio' });

    
    let reversedSelectedNumbers = props.bingoGameState.selectedNumbers.map((_, i, a) => a[a.length - 1 - i])

    const [isSpinning, setIsSpinning] = useState<boolean>(false);

    
    const handleSpin = useCallback(async() => {
        // console.log(rouletteAudioState.duration)
        // if(!rouletteAudioState.duration)return
        if(props.bingoGameState.numPlayers === props.bingoGameState.winnerNames.flat().length ) return

        if(!isSpinning && !isVisible){
            setIsVisible(true);
            setIsSpinning(true);

            const audio = new Audio("./roulette.mp3");
            audio.currentTime = 0;
             audio.play();

            await new Audio("./roulette.mp3").play();
            // rouletteAudioControls.seek(0);
            // rouletteAudioControls.play();
            
            await delay(2800);
    
            const availableNumbers: number[] = Array.from({ length: 75 }, (_, index) => index + 1).filter(
                (number) => !props.bingoGameState.selectedNumbers.includes(number)
            );
            const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
    
    
            props.onNumberSelected(randomNumber);
            // console.log(rouletteAudioState.playing)
    
            setIsSpinning(false);
            
            // rouletteAudioState.playing && rouletteAudioControls.pause();
            
            await delay(2200);
            

            setIsVisible(false);
        }
    }, [props.bingoGameState, isSpinning, isVisible]);


    return (
        <>
            {isVisible
                ?   <div 
                        className="lottery_screen"
                        style={{backgroundColor: `${isSpinning ? "#111" : "#fd236c"}`}}
                    >  
                        {isSpinning ? <div><LotteryScreen /> </div> : null }

                        {!isSpinning  
                            ? <div style={{color: "#fff", display: "flex"}} className="selected_number">
                                    {props.bingoGameState.selectedNumbers.length > 1 
                                        ? props.bingoGameState.selectedNumbers[props.bingoGameState.selectedNumbers.length-1] 
                                        : null}
                                </div>
                            : null
                        }
                    </div>
                : null
            }

            <footer className={`footer`}>
                <div className="footer__inner">
                    <div className="footer__nav" style={{display: "flex", overflowY: "hidden"}}>

                        {reversedSelectedNumbers.map((n, i) => {
                            return (n ? <div 
                                            key={i} 
                                            style={{
                                                backgroundColor: `${i===0 ? "#fd236c" : "#fff8"}`,
                                                color: `${i===0 ? "#fff" : "#000"}`,
                                                margin: "0 8px",
                                                fontSize: "2rem",
                                                borderRadius: "50%",
                                                border: "2px solid #fff",
                                                width: "52px",
                                                height: "52px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "52px",
                                                    height: "52px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >{n}</div>
                                        </div>
                                    : null                    
                            )
                        })}
        
                    </div>

                    <div 
                        className={`footer__spin ${isSpinning ? "is_spinning" : ""} ${isVisible || props.bingoGameState.numPlayers === props.bingoGameState.winnerNames.flat().length ? "is_disable" : ""}`}
                        onClick={handleSpin} 
                    >
                        {/* {rouletteAudio} */}
                        <ImSpinner11 />
                    </div>
                    
                </div>
            </footer>
        </>
    );
};

export default Footer;