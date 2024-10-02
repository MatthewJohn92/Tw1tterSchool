// Questo componente React `EditModal` permette agli utenti di modificare il loro profilo, inclusi il nome, il username, la bio e le immagini di copertina e profilo.
// Funzionalità principali:
// 1. **Gestione dello stato utente**:
//    - Utilizza `useCurrentUser` per ottenere i dati dell'utente corrente.
//    - Utilizza `useUser` con l'ID dell'utente corrente per recuperare i dati aggiornati dopo una modifica e `mutateFetchedUser` per aggiornare il cache.
//    - Usa lo stato locale per memorizzare i campi `profileImage`, `coverImage`, `name`, `username`, e `bio`.
//    - Ogni volta che i dati dell'utente cambiano, un effetto (`useEffect`) aggiorna automaticamente i campi del form con i valori correnti dell'utente.

// 2. **Form di modifica del profilo**:
//    - Include componenti di input per il caricamento delle immagini (`ImageUpload`) e campi di testo (`Input`) per modificare il nome, username e bio.
//    - I campi sono disabilitati mentre la richiesta è in corso (quando `isLoading` è true).

// 3. **Gestione della richiesta di aggiornamento**:
//    - Quando l'utente invia il form, viene chiamata una funzione `onSubmit`.
//    - Questa funzione invia una richiesta PATCH all'endpoint `/api/edit` con i dati aggiornati (nome, username, bio, e le immagini di copertina e profilo).
//    - Se l'aggiornamento ha successo, i dati dell'utente sono aggiornati nel cache usando `mutateFetchedUser`, e viene mostrato un messaggio di successo con `toast.success()`.
//    - In caso di errore, viene mostrato un messaggio di errore con `toast.error()`.

// 4. **Modale**:
//    - Il contenuto del form viene reso all'interno di un componente `Modal`.
//    - Il modale include un titolo, i campi di input per le modifiche e un pulsante "Save" per inviare le modifiche.

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading} 
      />
      <Input 
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading} 
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;
