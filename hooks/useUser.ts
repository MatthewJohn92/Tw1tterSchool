// Questo hook personalizzato `useUser` gestisce il recupero dei dati di un singolo utente specifico utilizzando SWR per il fetching e la gestione del caching.
// Funzionalità principali:

// 1. **Parametro `userId`**:
//    - Il parametro `userId` è obbligatorio e rappresenta l'ID dell'utente da recuperare.
//    - Se `userId` è fornito, `useSWR` effettua il fetching dall'endpoint `/api/users/${userId}`.
//    - Se `userId` non è presente, viene passato `null` come URL, disabilitando il fetching.

// 2. **SWR per fetching e caching**:
//    - Utilizza `useSWR` per gestire il fetching e il caching dei dati dell'utente.
//    - `fetcher` è la funzione che esegue la richiesta GET all'API e restituisce i dati dell'utente.
//    - `useSWR` restituisce:
//      - `data`: i dati dell'utente recuperato.
//      - `error`: eventuali errori durante il fetching.
//      - `isLoading`: indica se i dati sono ancora in fase di caricamento.
//      - `mutate`: una funzione per aggiornare manualmente i dati dell'utente o ricaricarli senza una nuova richiesta.

// 3. **Uso del hook**:
//    - Questo hook è utile per componenti che necessitano di visualizzare o gestire i dati di un utente specifico, come un profilo utente o pagine che mostrano i dettagli di un utente.
//    - Il componente che utilizza questo hook può accedere ai dati dell'utente tramite `data`, gestire lo stato di caricamento con `isLoading`, e aggiornare i dati dell'utente con `mutate`.

// 4. **Gestione URL condizionale**:
//    - Se `userId` non viene passato, il fetching è disabilitato, evitando così richieste non necessarie o errate.


import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUser;
