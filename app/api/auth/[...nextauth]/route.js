import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import mongoose from "mongoose";
import User from "@/models/user";
import connectDB from "@/db/connectdb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // if (account?.provider === "github") {
   
   if (user && user.email){
      
await connectDB()
        const currentUser = await User.findOne({
          email: user.email,
        });

        if (!currentUser) {
          const newUser = new User({
            email: user.email,
           username: user.email.split("@")[0],
          });

          await newUser.save();

          user.name = newUser.username;
        } else {
          user.name = currentUser.username;
        }
        
      }

      return true;
    },
  },
});

export { authoptions as GET, authoptions as POST };