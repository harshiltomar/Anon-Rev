// PROVIDERS STUFF
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text ",
          placeholder: "harshil@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "abc@123",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            // A Logic with a OR which search based on any of these that Exist
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your Account first");
          }

          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorret Password");
          }
        } catch (error: any) {
          throw new error(error);
        }
      },
    }),
  ],
  // Callbacks, basically async fn to control what happens when an action is performed
  // Highly helpful in Access Controls without DB and integrate with external DB or APIs
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },

  // This make automatic non branded auth page of Signin
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
