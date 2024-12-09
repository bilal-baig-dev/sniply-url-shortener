import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../config/db/prisma";
import { LoginPagePath } from "../constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: LoginPagePath,
    verifyRequest: "/verify-email",
  },
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "smtp-email" || account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email || (user?.email as string) },
          include: { accounts: true },
        });

        const existingLinkedAccount = existingUser?.accounts.find((el) => el.userId === existingUser.id && el.provider === account.provider);
        if (existingUser && !existingLinkedAccount) {
          const { expires_in = null, refresh_token = null, authorization_details = null, ...accountDetails } = account;
          // Link the OAuth account to the existing user
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              ...accountDetails,
            },
          });

          return true;
        }
      }

      return true;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
