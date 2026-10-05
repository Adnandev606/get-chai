import Stripe from "stripe";
import Payment from "@/models/payment";
import connectDB from "@/db/connectdb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.text();

    const signature = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      await connectDB();

      await Payment.findOneAndUpdate(
        {
          oid: session.id,
        },
        {
          done: true,
        }
      );

      console.log("Payment successful:", session.id);
    }

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error("Stripe Error:", error.message);

    return new Response(
      `Webhook Error: ${error.message}`,
      {
        status: 400,
      }
    );
  }
}