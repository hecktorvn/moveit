import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';

import styles from '../styles/components/Menu.module.css';
import Logo from '../../public/icons/small-logo.svg';
import HomeIcon from '../../public/icons/home.svg';
import AwardIcon from '../../public/icons/award.svg';


function MenuButton ({children, pathname}) {
    const router = useRouter();

    return (
        <li className={router.route === pathname ? styles.active : null}>
            <Link href={pathname}>
                {children}
            </Link>
        </li>
    );
}


export function Menu() {
    const router = useRouter();

    function handleLogout () {
        Cookies.remove('moveit_user');
        router.push('/signin');
    }

    return (
        <div className={styles.container}>
            <Logo className={styles.logo}/>
            
            <section>
                <ul>
                    <MenuButton pathname='/'>
                        <HomeIcon />
                    </MenuButton>

                    <MenuButton pathname='/awards'>
                        <AwardIcon />
                    </MenuButton>
                </ul>
            </section>

            <button type="button" className={styles.buttonLogout} onClick={handleLogout}>Sair</button>
        </div>
    );
}