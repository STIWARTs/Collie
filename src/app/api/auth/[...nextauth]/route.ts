import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        '1034507039795-icj64ncocbs10evnd6ctjn45f6qqfnr3.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };
