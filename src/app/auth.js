import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      trustHost: true,

      async authorize(credential) {
        const email = credential?.email;
        const password = credential?.password;

        const userData = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            return data;
          });

        const user = userData.data;

        console.log(userData)
        if (userData?.status === "ok") {
          return user;

        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.name = user.user.name;
        token.email = user.user.email;
        token.type = user.user;
        token.token = user.token;

      }
      return token;

    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.type = token.type;
        session.user.token = token.token;

      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  }

});
