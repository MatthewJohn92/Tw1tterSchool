// Questo file definisce un'API route di Next.js per ottenere i dati dell'utente autenticato.
// Funzionalità principali:
// 1. Gestisce solo richieste HTTP di tipo GET. Se il metodo della richiesta non è GET, restituisce un errore 405 (Method Not Allowed).
// 2. Utilizza `serverAuth` per autenticare l'utente. Questa funzione verifica se l'utente è autenticato e restituisce l'utente corrente dal database.
// 3. Se `serverAuth` ha successo, restituisce i dati dell'utente corrente come risposta JSON con uno status 200.
// 4. Se si verifica un errore durante l'autenticazione o il recupero dei dati dell'utente, l'errore viene loggato nella console e restituisce una risposta con status 400 (Bad Request).


import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
