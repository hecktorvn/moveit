
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallange, resetChallange, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallange();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallange ? (<>
                <div className={styles.challengeActive}>
                    <header>Ganhe { activeChallange.amount } xp</header>
                    <main>
                        <img src={`icons/${activeChallange.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChallange.description }</p>
                    </main>
                </div>                

                <footer>
                    <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                    >
                        Falhei
                    </button>

                    <button 
                        type="button"
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                    >
                        Completei
                    </button>
                </footer>
            </>) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    );
}