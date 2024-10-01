// Questo file configura NextAuth per l'autenticazione in un'applicazione Next.js utilizzando Prisma come adapter e bcrypt per la gestione delle password.
// Funzionalità principali:
// 1. Importa bcrypt per confrontare le password hashate con quelle fornite durante il login.
// 2. Importa NextAuth e AuthOptions per definire le opzioni di autenticazione.
// 3. Viene utilizzato il PrismaAdapter per collegare NextAuth al database Prisma.
// 4. Utilizza il provider "credentials" per l'autenticazione manuale con email e password.
//    - Verifica che l'utente esista nel database e che abbia una password hashata.
//    - Confronta la password inserita dall'utente con quella hashata nel database usando bcrypt.
//    - Se le credenziali sono valide, restituisce l'utente, altrimenti lancia un errore.
// 5. Abilita il debug in ambiente di sviluppo per facilitare la risoluzione di problemi.
// 6. Utilizza JSON Web Token (JWT) per le sessioni, con un segreto per firmare i token.
// 7. I segreti per JWT e NextAuth sono recuperati dalle variabili d'ambiente.


import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
