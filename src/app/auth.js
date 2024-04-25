import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  auth,
  signIn,

  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      name: "credentials",

      async authorize(credential) {
        const email = credential?.email;
        const password = credential?.password;

        const userData = await fetch(
          "http://202.51.182.190:5412/api/web-app/login",
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

        if (userData?.status === "ok") {
          return user;
          
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

        if(user){
          token.name = user.user.name;
          token.email = user.user.email;
          token.type = user.user.type;
          token.token = user.token;
        }
       
    
        return token;
     
    },
    async session({ session, token }) {
        if(token){
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
  },
  secret: process.env.AUTH_SECRET,
});
