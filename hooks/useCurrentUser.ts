// Questo hook personalizzato `useCurrentUser` utilizza SWR per gestire il recupero e il caching dei dati dell'utente autenticato.
// Funzionalità principali:
// 1. `useSWR` è una libreria React per il fetching di dati con supporto per caching, revalidazione, e gestione degli stati di richiesta (loading, error).
// 2. Viene fatto un fetch all'endpoint `/api/current` utilizzando un "fetcher" personalizzato, che è una funzione di utilità per recuperare dati da un'API.
// 3. SWR restituisce diversi valori:
//    - `data`: i dati recuperati dall'API, in questo caso i dati dell'utente corrente.
//    - `error`: eventuali errori che si verificano durante il fetching dei dati.
//    - `isLoading`: indica se la richiesta è ancora in corso (stato di caricamento).
//    - `mutate`: funzione per aggiornare manualmente i dati (utile per l'aggiornamento locale senza fare nuove richieste).
// 4. Il hook restituisce questi valori in un oggetto, consentendo l'accesso ai dati dell'utente corrente e alla gestione dello stato all'interno dei componenti React.


import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;
