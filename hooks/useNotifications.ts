// Questo hook personalizzato `useNotifications` gestisce il recupero delle notifiche di un utente utilizzando SWR per il fetching e la gestione del caching.
// Funzionalità principali:

// 1. **Parametro opzionale `userId`**:
//    - Il parametro `userId` è opzionale e rappresenta l'ID dell'utente per cui si vogliono recuperare le notifiche.
//    - Se `userId` è presente, il `url` viene impostato su `/api/notifications/${userId}`, altrimenti viene impostato su `null`, disabilitando il fetching se non c'è un ID valido.

// 2. **SWR per fetching e caching**:
//    - Utilizza `useSWR` per fare il fetching delle notifiche dall'URL generato.
//    - `fetcher` è una funzione che esegue la richiesta all'API e restituisce i dati.
//    - `useSWR` restituisce vari valori utili:
//      - `data`: contiene le notifiche recuperate.
//      - `error`: contiene eventuali errori che si verificano durante la richiesta.
//      - `isLoading`: stato booleano che indica se i dati sono ancora in fase di caricamento.
//      - `mutate`: una funzione che permette di aggiornare manualmente i dati o ricaricarli.

// 3. **Uso del hook**:
//    - Questo hook può essere utilizzato in qualsiasi componente React che necessita di visualizzare o gestire le notifiche di un utente specifico.
//    - Il componente può usare `data` per accedere alle notifiche, controllare `isLoading` per mostrare un indicatore di caricamento, e usare `mutate` per aggiornare i dati in tempo reale senza rifare la richiesta al server.

// 4. **Gestione URL condizionale**:
//    - Se `userId` non viene passato, il fetching è disabilitato (l'URL è `null`), utile quando non si ha ancora l'ID dell'utente e si vuole evitare richieste inutili.


import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;
