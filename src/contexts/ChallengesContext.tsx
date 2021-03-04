import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challanges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import axios from 'axios';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number, 
    currentExperience: number, 
    challengesCompleted: number,
    activeChallange: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void,
    newChallenge: () => void,
    resetChallange: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0);

    const [activeChallange, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const experience = Math.pow(level * 4, 2) + currentExperience;

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        if( challengesCompleted > 0 ) {
            saveInDatabase();
        }
    }, [challengesCompleted, level, currentExperience]);

    async function saveInDatabase() {
        await axios.post('/api/challenges', {
            userId: 'hecktorvn', 
            level, 
            challenges: challengesCompleted, 
            currentExperience: currentExperience, 
            experience
        });
    }

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function newChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[ randomChallengeIndex ];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if ( Notification.permission === 'granted' ) {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallange() {
        setActiveChallenge(null);
    }

    async function completeChallenge() {
        if ( !activeChallange ) {
            return;
        }
        
        const { amount } = activeChallange;
        let finalExperience = currentExperience + amount;
        if ( finalExperience >= experienceToNextLevel ) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience( finalExperience );
        setActiveChallenge(null);
        setChallengesCompleted( challengesCompleted + 1 );
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallange,
                experienceToNextLevel,
                levelUp,
                newChallenge,
                resetChallange,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}