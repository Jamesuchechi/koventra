import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Admin Password',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const password = credentials?.password as string | undefined;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (!expectedPassword || !password) {
          console.error('Missing admin password configuration or password was not provided.');
          return null;
        }

        if (password !== expectedPassword) {
          return null;
        }

        return {
          id: 'admin',
          name: 'Administrator',
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
});
