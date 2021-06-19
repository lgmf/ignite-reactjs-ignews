import Head from "next/head";

import styles from "./home.module.scss";

function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <div className={styles.info}>
            <span>👏 Hey, welcome</span>

            <h1>
              News about the <strong>React</strong> world
            </h1>

            <p>
              Get access to all the publications
              <strong> for $9.90 month</strong>
            </p>
          </div>
          <img src="/images/avatar.svg" alt="girl coding" />
        </section>
      </main>
    </>
  );
}

export default Home;
