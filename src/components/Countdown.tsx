import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const {
        minutes, 
        seconds, 
        defTime,
        time,
        hasFinished, 
        isActive, 
        resetCountdown, 
        startCountdown
    } = useContext(CountdownContext);

    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    const progressTime = Math.floor((defTime - time) * 100 / defTime);

    return (<>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>

        {hasFinished ? (
            <button 
                className={`${styles.countdownButton} ${styles.countdownButtonCompleted}`}
                disabled
            >
                Ciclo encerrado
                <img src="icons/check_circle.svg" alt="checked"/>
            </button>

        ) : (<>
            {isActive ? (
                <button 
                    type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                >
                    Abandonar ciclo
                    <div className={styles.progressTime} style={{width: `${progressTime}%`}}></div>
                </button>
            ) : (
                <button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                >
                    Iniciar um ciclo
                </button>
            )}
        </>)}
    </>);
}