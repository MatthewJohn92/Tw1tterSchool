// Questa API route di Next.js gestisce le richieste GET per recuperare un elenco di utenti dal database utilizzando Prisma.
// Funzionalità principali:
// 1. **Metodo della richiesta**:
//    - Verifica se il metodo della richiesta è 'GET'. Se il metodo è diverso, restituisce un errore 405 (Method Not Allowed).
  
// 2. **Interazione con Prisma**:
//    - Utilizza Prisma per eseguire una query al database, recuperando tutti gli utenti con `prisma.user.findMany()`.
//    - Gli utenti vengono ordinati in base alla data di creazione (`createdAt`) in ordine decrescente, quindi gli utenti più recenti sono restituiti per primi.

// 3. **Risposta**:
//    - Se la query ha successo, la risposta JSON contiene l'elenco degli utenti con uno stato 200.
//    - Se si verifica un errore, viene catturato e loggato nella console, e la risposta restituisce uno stato 400 (Bad Request).


import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(users);
  } catch(error) {
    console.log(error);
    return res.status(400).end();
  }
}
