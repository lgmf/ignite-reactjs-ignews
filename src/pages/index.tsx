import styles from '../styles/home.module.scss';

function Home() {
  return (
    <h1 className={styles.title}>
      Hello <span>World</span>
    </h1>
  )
}

export default Home;