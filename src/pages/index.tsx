import { GetStaticProps } from "next";
import Head from "next/head";

import { PriceFormatter } from "../utils/price-formatter";
import { stripe } from "../services/stripe";

import { SubscribeButton } from "../components";

import styles from "./home.module.scss";

interface HomeProduct {
  product: {
    priceId: string;
    amount: number;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1J45gwBmhRleK2zDvnC1EK0u");

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  };

  const twentyFourHours = 60 * 60 * 24;

  return {
    props: {
      product,
    },
    revalidate: twentyFourHours,
  };
};

function Home({ product }: HomeProduct) {
  const price = PriceFormatter.format(product.amount);

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
              <strong> for {price} month</strong>
            </p>

            <SubscribeButton priceId={product.priceId} />
          </div>
          <img src="/images/avatar.svg" alt="girl coding" />
        </section>
      </main>
    </>
  );
}

export default Home;
