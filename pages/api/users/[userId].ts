// Questa API route di Next.js gestisce le richieste GET per ottenere informazioni su un utente specifico e il conteggio dei suoi follower dal database utilizzando Prisma.
// Funzionalità principali:
// 1. **Metodo della richiesta**:
//    - Verifica se il metodo della richiesta è 'GET'. Se il metodo è diverso, restituisce un errore 405 (Method Not Allowed).

// 2. **Estrazione del `userId`**:
//    - Estrae il parametro `userId` dalla query string della richiesta (`req.query`).
//    - Se `userId` non è presente o non è una stringa, viene lanciato un errore con il messaggio 'Invalid ID'.

// 3. **Ricerca dell'utente nel database**:
//    - Utilizza Prisma per cercare un utente con il metodo `findUnique`, filtrando per l'ID dell'utente passato come parametro.

// 4. **Calcolo del conteggio dei follower**:
//    - Utilizza Prisma per contare quanti utenti seguono l'utente corrente. Lo fa eseguendo una query con `user.count()` cercando tutti gli utenti il cui array `followingIds` contiene l'`userId` corrente.

// 5. **Risposta**:
//    - Se la richiesta ha successo, restituisce una risposta JSON con i dati dell'utente e il conteggio dei follower (incluso nel campo `followersCount`) con uno stato 200.
//    - In caso di errore, l'errore viene loggato nella console e la risposta restituisce uno stato 400 (Bad Request).

import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    })

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
