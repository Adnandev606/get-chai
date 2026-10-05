"use server";

import Stripe from "stripe";
import Payment from "@/models/payment";
import connectDb from "@/db/connectdb";
import User from "@/models/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  // Jis user ko payment milni hai usko find karo
  const user = await User.findOne({
    username: to_username
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Amount ko number mein convert karo
  const amountInCents = Math.round(Number(amount) * 100);

  if (!amountInCents || amountInCents < 100) {
    throw new Error("Invalid amount");
  }

  // Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: `Support @${to_username}`
          },

          unit_amount: amountInCents
        },

        quantity: 1
      }
    ],

    mode: "payment",

    success_url:
      `${process.env.NEXT_PUBLIC_URL}/${to_username}?paymentdone=true`,

    cancel_url:
      `${process.env.NEXT_PUBLIC_URL}/${to_username}?paymentcancelled=true`,

    metadata: {
      to_username: to_username,
      name: paymentform.name,
      message: paymentform.message
    }
  });

  // Payment ko initially pending rakho
  await Payment.create({
    oid: session.id,
    amount: Number(amount),
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    done: false
  });

  return {
    id: session.id,
    url: session.url
  };
};


export const fetchuser = async (username) => {
  await connectDb();

  const user = await User.findOne({
    username: username
  });

  if (!user) {
    return null;
  }

  return user.toObject({
    flattenObjectIds: true
  });
};


export const fetchpayments = async (username) => {
  await connectDb();

  const payments = await Payment.find({
    to_user: username,
    done: true
  })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return payments;
};


export const updateProfile = async (data, oldusername) => {
  await connectDb();

  const ndata = Object.fromEntries(data);

  if (oldusername !== ndata.username) {

    const existingUser = await User.findOne({
      username: ndata.username
    });

    if (existingUser) {
      return {
        error: "Username already exists"
      };
    }

    await User.updateOne(
      {
        email: ndata.email
      },
      ndata
    );

    await Payment.updateMany(
      {
        to_user: oldusername
      },
      {
        to_user: ndata.username
      }
    );

  } else {

    await User.updateOne(
      {
        email: ndata.email
      },
      ndata
    );
  }

  return {
    success: true
  };
};
export const updateUser = async (form) => {
  await connectDb();

  const user = await User.findOneAndUpdate(
    {
      email: form.email
    },
    {
      name: form.name,
      username: form.username,
      profilepic: form.profilepic,
      coverpic: form.coverpic,
      stripeid: form.stripeid,
      stripesecret: form.stripesecret,
      updatedAt: new Date()
    },
    {
      new: true,
      upsert: true
    }
  );

  return {
    success: true,
    user: JSON.parse(JSON.stringify(user))
  };
};