import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { fauna, q } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

interface User {
  email: string;
  name: string;
  stripe_customer_id?: string;
}

interface UserScope {
  ref: {
    id: string;
  },
  data: User;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
    return;
  }

  const session = await getSession({ req });

  const userScope = await fauna.query<UserScope>(
    q.Get(
      q.Match(
        q.Index("user_by_email"),
        q.Casefold(session.user.email)
      )
    )
  );

  const user = userScope.data;

  let customerId = user.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
    });

    await fauna.query(
      q.Update(
        q.Ref(
          q.Collection("users"), userScope.ref.id),
        {
          data: {
            stripe_customer_id: customer.id,
          },
        }
      )
    );

    customerId = customer.id;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [{ price: "price_1J45gwBmhRleK2zDvnC1EK0u", quantity: 1 }],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    customer: customerId,
  });

  return res.status(200).json({ checkoutSession: checkoutSession.id });
};
