// Questo hook personalizzato `useLike` gestisce la logica per mettere "mi piace" o rimuoverlo da un post in un'applicazione.
// Funzionalità principali:

// 1. **Stato dell'utente corrente**:
//    - Usa `useCurrentUser` per ottenere i dati dell'utente attualmente loggato.
//    - Usa `usePost` per ottenere i dati specifici del post su cui l'utente sta interagendo, con `mutateFetchedPost` per aggiornare il cache del post.
//    - Usa `usePosts` per aggiornare il cache di tutti i post associati a un determinato utente (opzionalmente) usando `mutateFetchedPosts`.

// 2. **hasLiked**:
//    - Usa `useMemo` per determinare se l'utente corrente ha già messo "mi piace" al post.
//    - Verifica se l'ID dell'utente corrente è presente nell'array `likedIds` del post recuperato (`fetchedPost`).
//    - Se l'utente ha già messo "mi piace", restituisce `true`, altrimenti `false`.

// 3. **toggleLike**:
//    - La funzione `toggleLike` è utilizzata per aggiungere o rimuovere un "mi piace" su un post.
//    - Se l'utente corrente non è autenticato (`currentUser` non è presente), apre il modale di login con `loginModal.onOpen()`.
//    - Se l'utente ha già messo "mi piace", viene inviata una richiesta DELETE all'endpoint `/api/like` per rimuovere il "mi piace".
//    - Se l'utente non ha ancora messo "mi piace", viene inviata una richiesta POST all'endpoint `/api/like` per aggiungere il "mi piace".
//    - Dopo la richiesta, `mutateFetchedPost` e `mutateFetchedPosts` vengono chiamati per aggiornare il cache e riflettere immediatamente i cambiamenti sul post e sui post dell'utente.
//    - Mostra un messaggio di successo usando `toast.success()` in caso di successo, o `toast.error()` in caso di errore.

// 4. **Ritorno**:
//    - Ritorna un oggetto che contiene:
//      - `hasLiked`: uno stato booleano che indica se l'utente corrente ha messo "mi piace" al post.
//      - `toggleLike`: la funzione per aggiungere o rimuovere un "mi piace" dal post.


import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;
