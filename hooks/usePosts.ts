// Questo hook personalizzato `usePosts` gestisce il recupero di una lista di post, con la possibilità di filtrare per un utente specifico, utilizzando SWR per il fetching e la gestione del caching.
// Funzionalità principali:

// 1. **Parametro opzionale `userId`**:
//    - Se viene passato un `userId`, il `url` verrà impostato su `/api/posts?userId=${userId}` per filtrare i post in base all'ID dell'utente.
//    - Se `userId` non è fornito, verrà utilizzato l'endpoint generico `/api/posts` per recuperare tutti i post disponibili.

// 2. **SWR per fetching e caching**:
//    - Utilizza `useSWR` per fare il fetching dei dati dall'URL generato.
//    - `fetcher` è la funzione che esegue la richiesta HTTP all'API e restituisce i dati dei post.
//    - `useSWR` restituisce:
//      - `data`: contiene la lista di post recuperati (potrebbe essere filtrata in base a `userId`).
//      - `error`: contiene eventuali errori che si verificano durante il fetching dei post.
//      - `isLoading`: indica se i dati sono ancora in fase di caricamento.
//      - `mutate`: una funzione che permette di aggiornare manualmente o ricaricare i dati senza una nuova richiesta.

// 3. **Uso del hook**:
//    - Questo hook viene utilizzato per visualizzare una lista di post in un feed globale o nel profilo di un utente specifico.
//    - Il componente che usa questo hook può accedere ai dati dei post tramite `data`, gestire lo stato di caricamento con `isLoading`, e aggiornare o ricaricare i dati con `mutate`.

// 4. **Gestione URL condizionale**:
//    - L'URL cambia dinamicamente in base alla presenza di `userId`. Se fornito, recupera i post di un utente specifico, altrimenti tutti i post disponibili.


import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;
