import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: { secret: process.env.JWT_SIGIN_PRIVATE_KEY, maxAge: 60 * 60 * 24 },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Email e senha requerido.");
        }

        const url = `${process.env.BASEURL}/login`;

        return await fetch(url, {
          method: "POST",
          headers: { "Content-type": "application/json;charset=UTF-8" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            const authorization = { id: res.accessToken };

            if (authorization.id) {
              return authorization;
            } else {
              throw new Error("Usuário não encontrado.");
            }
          })
          .catch((e) => {
            console.log("error auth", e);
            if (e.message == "fetch failed") {
              throw new Error("Ocorreu um erro inesperado.");
            }
            throw new Error(e.message);
          });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (token.sub) {
        return token;
      } else {
        throw new Error("Usuário inválido.");
      }
    },
    async session({ session, token, user }) {
      if (!token.sub) {
        throw new Error("Sessão inválida.");
      }

      return { ...session, accessToken: token.sub };
    },
  },
});
