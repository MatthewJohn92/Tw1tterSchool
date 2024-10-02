// Questo hook personalizzato `useFollow` gestisce la logica di seguire o smettere di seguire un utente in un'applicazione.
// Funzionalità principali:

// 1. **Stato dell'utente corrente**:
//    - Usa `useCurrentUser` per ottenere i dati dell'utente attualmente loggato e la funzione `mutateCurrentUser` per aggiornare il cache dei dati dell'utente corrente.
//    - Usa `useUser` per ottenere i dati dell'utente che l'utente corrente vuole seguire o smettere di seguire, con `mutateFetchedUser` per aggiornare i suoi dati.

// 2. **isFollowing**:
//    - Usa `useMemo` per determinare se l'utente corrente sta seguendo l'utente con `userId`. Controlla se l'`userId` è presente nella lista `followingIds` dell'utente corrente.
//    - Se `followingIds` contiene l'`userId`, allora l'utente sta seguendo quell'utente.

// 3. **toggleFollow**:
//    - La funzione `toggleFollow` è la funzione principale per seguire o smettere di seguire un utente.
//    - Se l'utente corrente non è autenticato (`currentUser` non è presente), apre il modale di login tramite `loginModal.onOpen()`.
//    - Se l'utente è già seguito, viene inviata una richiesta DELETE all'endpoint `/api/follow` per smettere di seguire l'utente.
//    - Se l'utente non è seguito, viene inviata una richiesta POST all'endpoint `/api/follow` per seguire l'utente.
//    - Dopo la richiesta, `mutateCurrentUser` e `mutateFetchedUser` sono chiamati per aggiornare i dati nel cache e riflettere immediatamente i cambiamenti nello stato di "seguito".
//    - Mostra un messaggio di successo usando `toast.success()` in caso di successo o `toast.error()` in caso di errore.

// 4. **Ritorno**:
//    - Ritorna un oggetto che contiene:
//      - `isFollowing`: uno stato booleano che indica se l'utente corrente sta seguendo l'utente con `userId`.
//      - `toggleFollow`: la funzione per seguire o smettere di seguire un utente.


import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow;
