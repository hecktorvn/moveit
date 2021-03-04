import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import Head from 'next/head';
import { useState } from 'react';

import api from '../services/api';
import styles from '../styles/pages/SignIn.module.css';
import { GetServerSideProps } from 'next';

export default function SignIn() {
    const router = useRouter();

    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleSignin() {
        setError('');
        setLoading(true);

        await api.get(`/users/${user}`).catch(e => {
            setError('Usuário não encontrado!');
        }).then(({data}: any) => {
            if ( !data.name ) {
                setError('Usuário não encontrado!');
            } else {
                Cookies.set('moveit_user', user);
                Cookies.set('moveit_name', data.name);
                router.push('/');
            }
        });

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | move.it</title>
            </Head>

            <div className={styles.containerBox}>
                <img src="/logo-white.svg" alt="Logo"/>
                <strong>Bem-Vindo</strong>
                <p>
                    <img src="/icons/github.svg" alt="Github"/>
                    Faça login com seu github para começar
                </p>

                <section>
                    <input type="text" required placeholder="Digite seu username" onChange={e=>setUser(e.target.value)}/>
                    <button disabled={!user} type="button" onClick={handleSignin}>
                        <img src="/icons/goto.svg" alt="Entrar"/>
                    </button>
                </section>

                {error && (
                    <div className={styles.error}>{error}</div>
                )}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { moveit_user:user } = ctx.req.cookies;
    
  
    if ( user ) {
      ctx.res.writeHead(307, {Location: '/'});
      ctx.res.end();
    }

    return {props:{}};
};