import { useState, useEffect } from 'react';


const LotteryScreen = () => {
    const [number, setNumber] = useState<number>();

    useEffect(() => {
        const generateNumbers = () => {
            // 1から75までの数字をランダムに1個選ぶ
            const randomNumber = Math.floor(Math.random() * 75) + 1;

            setNumber(randomNumber);
        };

        // 0.2秒ごとに数字を生成する
        const interval = setInterval(generateNumbers, 200);

        // コンポーネントのアンマウント時にインターバルをクリアする
        return () => {
            clearInterval(interval);
        };
    }, []);

    return <span>{number}</span>;
};

export default LotteryScreen;
