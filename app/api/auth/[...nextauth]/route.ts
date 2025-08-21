/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { name: 'email', type: 'email' },
        password: { name: 'password', type: 'password' },
      },
      async authorize(credentials) {
        // Replace with a real DB lookup
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'adminpass') {
          return { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' };
        }
        if (credentials?.email === 'user@example.com' && credentials?.password === 'userpass') {
          return { id: '2', name: 'Customer User', email: 'user@example.com', role: 'customer' };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
