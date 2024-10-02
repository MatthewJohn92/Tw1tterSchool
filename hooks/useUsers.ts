// Questo hook personalizzato `useUsers` gestisce il recupero di una lista di utenti utilizzando SWR per il fetching e la gestione del caching.
// Funzionalità principali:

// 1. **SWR per fetching e caching**:
//    - Utilizza `useSWR` per fare il fetching dei dati dall'endpoint `/api/users`, che restituisce una lista di utenti.
//    - `fetcher` è la funzione che esegue la richiesta HTTP all'API e restituisce i dati degli utenti.
//    - `useSWR` restituisce:
//      - `data`: contiene la lista di utenti recuperati.
//      - `error`: eventuali errori che si verificano durante il fetching dei dati.
//      - `isLoading`: uno stato booleano che indica se i dati sono ancora in fase di caricamento.
//      - `mutate`: una funzione che permette di aggiornare manualmente o ricaricare i dati senza una nuova richiesta al server.

// 2. **Uso del hook**:
//    - Questo hook viene utilizzato per ottenere una lista di utenti, ad esempio in un contesto come una pagina di elenco utenti o per popolare una lista di follower.
//    - Il componente che utilizza questo hook può accedere ai dati tramite `data`, gestire lo stato di caricamento con `isLoading`, e aggiornare o ricaricare i dati con `mutate`.

// 3. **Ritorno**:
//    - Ritorna un oggetto contenente `data`, `error`, `isLoading`, e `mutate`, che può essere utilizzato nei componenti React per lavorare con i dati degli utenti in modo reattivo e ottimizzato tramite caching.


import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUsers;
