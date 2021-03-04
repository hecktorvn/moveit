import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile () {
    const { level } = useContext(ChallengesContext);
    const [user, setUser] = useState('');
    const [name, setName] = useState(Cookies.get('moveit_name'));

    useEffect(() => {
        setUser(Cookies.get('moveit_user'));
        setName(Cookies.get('moveit_name'));
    }, []);

    return (
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${user}.png`} alt="Hecktor Viegas"/>
            <div>
                <strong>{name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}