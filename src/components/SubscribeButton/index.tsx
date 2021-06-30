import { signIn, useSession } from "next-auth/client";
import httpClient from "../../services/http-client";
import { getStripeJs } from "../../services/stripe-client";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const { data } = await httpClient.post("/subscribe");
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: data.checkoutSession });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
