import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import {
  ILogin,
  JWTExtended,
  SessionExtended,
  UserExtended,
} from "@/Types/Auth";
import authServices from "@/services/auth.service";
import { AxiosError } from "axios";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as ILogin;

          const result = await authServices.login({ email, password });
          const accessToken = result.data.data.token;

          const me = await authServices.getProfileWithToken(accessToken);
          const user = me.data.data;

          if (
            accessToken &&
            result.status === 200 &&
            user.id &&
            me.status === 200
          ) {
            user.accessToken = accessToken;
            return user;
          }

          return null;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(
              error.response?.data?.message || "Email atau password salah",
            );
          }

          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      if (token.user) {
        session.user = token.user;
        session.accessToken = token.user.accessToken;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
