import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext'

import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { Menu } from '../components/Menu';
import axios from 'axios';

interface HomeProps {
  user: any
}

export default function Home({user}: HomeProps) {
  return (
    <ChallengesProvider
      level={ Number(user.level) }
      currentExperience={ Number(user.currentExperience) }
      challengesCompleted={ Number(user.challenges) }
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <Menu />

        <div className={styles.boxContainer}>
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>

              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { moveit_user:user } = ctx.req.cookies;
  let props = {user};

  if ( !user ) {
    ctx.res.writeHead(307, {Location: '/signin'});
    ctx.res.end();
    return {props:{}};
  }

  const {data} = await axios.get(process.env.HOST + '/api/challenges?userId=' + props.user);
  props.user = data.length > 0 ? data[0] : {};
  
  return { props };
};