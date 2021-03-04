import axios from "axios";
import Head from "next/head";
import { Menu } from "../components/Menu";
import styles from '../styles/pages/Awards.module.css'

export default function Awards({ ranking }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ranking | move.it</title>
            </Head>
            <Menu />

            <div className={styles.containerLeadborad}>
                <section>
                    <h2>Leaderboard</h2>

                    <ul className={styles.leaderboard}>
                        <li className={styles.header}>
                            <span>POSIÇÃO</span>
                            <span>USUÁRIO</span>
                            <span>DESAFIOS</span>
                            <span>EXPERIÊNCIA</span>
                        </li>
                        
                        {ranking.map((item, i) => (
                            <li key={i}>
                                <div>{i+1}º</div>

                                <div className={styles.profile}>
                                    <img src={`https://github.com/${item.user}.png`} alt={item.user}/>
                                    <div>
                                        <strong>{item.user}</strong>
                                        <p>
                                            <img src="icons/level.svg" alt="Level"/>
                                            Level {item.level}
                                        </p>
                                    </div>
                                </div>

                                <p><strong>{item.challenges}</strong> <span>completados</span></p>

                                <p><strong>{item.experience}</strong> <span>xp</span></p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}


export const getServerSideProps = async (ctx) => {
    const { moveit_user:user } = ctx.req.cookies;
    const {data} = await axios.get(process.env.HOST + '/api/challenges');
  
    if ( !user ) {
      ctx.res.writeHead(307, {Location: '/signin'});
      ctx.res.end();
    }
    
    return {props: {
        ranking: data
    }};
};