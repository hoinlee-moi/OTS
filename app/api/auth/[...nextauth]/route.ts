import { signUp } from "./../../../../util/api";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/util/database";
import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

type user = {
  _id: ObjectId;
  emailId: string;
  password: string;
  nickname: string;
  profileUrl: string;
  gender: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { emailId, password } = credentials as {
          emailId: string;
          password: string;
        };
        if (emailId.trim().length > 0 && password.trim().length > 0) {
          try {
            let db = (await connectDB).db("OTS");
            let user = await db
              .collection("user")
              .findOne({ emailId: emailId });
            if (!user) {
              return null;
            }
            const pwCheck = await bcrypt.compare(password, user.password);
            if (!pwCheck) {
              return null;
            }
            return Promise.resolve(user) as any;
          } catch (error) {
            console.log(error);
            return null;
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        delete user.password;
        token.user = {
          ...user,
        };
      }
      if (trigger === "update") {
        if (session.info) {
          token.user = {
            ...session.info,
          };
        }
      }
      return token as any;
    },
    session: async ({ session, token, user }: any) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
