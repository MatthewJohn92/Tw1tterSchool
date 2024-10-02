// Questo file definisce una funzione `serverAuth` per autenticare gli utenti lato server in un'API route di Next.js.
// Funzionalità principali:
// 1. Importa `getServerSession` da NextAuth per recuperare la sessione dell'utente autenticato, utilizzando le opzioni di autenticazione definite in `authOptions`.
// 2. Verifica se l'utente è autenticato controllando l'esistenza di un'email nella sessione. Se l'utente non è autenticato, viene lanciato un errore ("Not signed in").
// 3. Utilizza Prisma per cercare l'utente nel database tramite il campo `email` recuperato dalla sessione.
// 4. Se l'utente non viene trovato nel database, viene lanciato un errore.
// 5. Se l'autenticazione ha successo, la funzione restituisce l'oggetto `currentUser` con i dati dell'utente autenticato.
// 6. Questa funzione è utile per proteggere le API routes, assicurandosi che solo gli utenti autenticati possano accedervi.


import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  } 

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;
