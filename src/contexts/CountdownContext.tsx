import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number,
    seconds: number,
    defTime: number,
    time: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode
}


export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { newChallenge } = useContext(ChallengesContext);
    
    const defTime = 0.25 * 60;
    const [time, setTime] = useState(defTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time % 60);

    function startCountdown() {
        setIsActive(true);
    }
    
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(defTime);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && Math.floor(time) > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if ( isActive && time <= 0 ) {
            newChallenge();
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time]);
    
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            defTime,
            time,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}