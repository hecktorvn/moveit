import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar () {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
    let percentToNextLevel = Math.floor(currentExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0px</span>
            <div>
                <div style={{width: `${percentToNextLevel || '0'}%`}} />

                {currentExperience > 0 && (
                    <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
                        {currentExperience}xp
                    </span>
                )}
            </div>
            <span>{experienceToNextLevel}px</span>
        </header>
    );
}