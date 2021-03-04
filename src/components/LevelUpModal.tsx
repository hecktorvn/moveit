import { useContext } from 'react';

import Twitter from '../../public/icons/twitter.svg';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, challengesCompleted, experienceToNextLevel, closeLevelUpModal } = useContext(ChallengesContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <section>
                    <header>{level}</header>

                    <strong>Parabéns</strong>
                    <p>Você alcançou um novo level.</p>

                    <button type="button" onClick={closeLevelUpModal}>
                        <img src="/icons/close.svg" alt="Fechar modal"/>
                    </button>
                </section>

                <a target="_blank" href={`https://twitter.com/intent/tweet?text=${process.env.HOST}/api/share?level=${level}&challenges=${challengesCompleted}&experience=${experienceToNextLevel}`} className={styles.twitter}>
                    Compartilhar no Twitter
                    <Twitter />
                </a>
            </div>
        </div>
    );
}