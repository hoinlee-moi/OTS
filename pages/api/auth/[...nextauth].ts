import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/util/database";
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
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
    jwt: async ({ token, user }: any) => {
      if (user) {
        user.password=null
        token.user = {
          ...user,
        };
      }
      return token as any;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
  // callbacks: {
  //   async signIn({ user: { id, name, image, email } }) {
  //     if (!email) {
  //       return false;
  //     }
  //     // addUser({
  //     //   id,
  //     //   name: name || '',
  //     //   image,
  //     //   email,
  //     //   nickname: email.split('@')[0],
  //     // });
  //     return true;
  //   },
  //   async session({ session, token }) {
  //     const user = session?.user;
  //     if (user) {
  //       session.user = {
  //         ...user,
  //         // nickname: user.email?.split('@')[0] || '',
  //         // id: token.id as string,
  //       };
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  // },
  //   pages: {
  //     signIn: '/',
  //   },
  secret: process.env.NEXT_PUBLIC_JWT_PASSWORD,
};
export default NextAuth(authOptions);
