// Questo file definisce un'API route di Next.js per la registrazione di un nuovo utente.
// Funzionalità principali:
// 1. Importa bcrypt per hashare le password prima di salvarle nel database.
// 2. Utilizza Prisma per interagire con il database, tramite l'istanza "prisma" importata.
// 3. La funzione handler gestisce richieste HTTP POST:
//    - Se il metodo della richiesta non è POST, risponde con un errore 405 (Method Not Allowed).
//    - Se è POST, estrae i campi email, username, name e password dal corpo della richiesta.
// 4. Hasha la password dell'utente utilizzando bcrypt con un "salt" di 12.
// 5. Crea un nuovo utente nel database Prisma con i dati forniti, inclusa la password hashata.
// 6. Restituisce una risposta JSON con i dati dell'utente appena creato se l'operazione ha successo.
// 7. In caso di errore, viene catturato e loggato nella console, e la risposta restituisce un errore 400.


import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}