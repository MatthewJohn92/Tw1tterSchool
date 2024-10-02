// Questo hook personalizzato `usePost` gestisce il recupero di un singolo post specifico utilizzando SWR per il fetching e la gestione del caching.
// Funzionalità principali:

// 1. **Parametro `postId`**:
//    - Il parametro `postId` è obbligatorio e rappresenta l'ID del post da recuperare.
//    - Se `postId` è fornito, `useSWR` effettua il fetching dall'endpoint `/api/posts/${postId}`. 
//    - Se `postId` non è presente, il fetching viene disabilitato passando `null` come URL.

// 2. **SWR per fetching e caching**:
//    - Utilizza `useSWR` per fare il fetching del post dall'API. SWR gestisce automaticamente caching, revalidazione e stati di caricamento.
//    - `fetcher` è la funzione che esegue la richiesta GET all'API e restituisce i dati del post.
//    - `useSWR` restituisce:
//      - `data`: i dati del post specifico.
//      - `error`: eventuali errori durante il recupero del post.
//      - `isLoading`: un booleano che indica se i dati sono ancora in fase di caricamento.
//      - `mutate`: una funzione per aggiornare manualmente i dati del post o ricaricarli senza una nuova richiesta.

// 3. **Uso del hook**:
//    - Questo hook viene utilizzato nei componenti React che necessitano di visualizzare o interagire con un singolo post, come una pagina di dettagli di un post o un'interfaccia di editing.
//    - `data` contiene i dati del post, `isLoading` può essere utilizzato per mostrare uno spinner di caricamento, e `mutate` è utile per aggiornamenti in tempo reale del post.

// 4. **Gestione URL condizionale**:
//    - Se `postId` non viene passato, il fetching è disabilitato, evitando così chiamate all'API inutili o errate.

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(postId ? `/api/posts/${postId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;
