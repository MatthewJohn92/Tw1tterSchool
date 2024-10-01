// Questo componente React rappresenta un modale per la registrazione di un nuovo account, utilizzando Next.js e Axios per inviare i dati a un endpoint di registrazione.
// Funzionalità principali:
// - Utilizza gli hook personalizzati `useLoginModal` e `useRegisterModal` per gestire l'apertura e chiusura dei modali di login e registrazione.
// - Lo stato locale è gestito con `useState` per catturare e memorizzare i campi di input: email, password, username e nome, oltre allo stato di caricamento.
// - La funzione `onToggle` consente di passare dal modale di registrazione a quello di login, a meno che non ci sia un'operazione di registrazione in corso (controllato tramite `isLoading`).
// - La funzione `onSubmit` invia una richiesta POST all'endpoint `/api/register` per creare un nuovo account con i dati inseriti dall'utente.
// - Se la registrazione è completata con successo, viene mostrato un messaggio di successo con `react-hot-toast` e l'utente viene automaticamente loggato usando la funzione `signIn` di `next-auth`.
// - In caso di errore durante la registrazione, viene mostrato un messaggio di errore.
// - Gli input vengono disabilitati durante il caricamento per evitare invii multipli.
// - Il componente `Modal` visualizza il modale con il titolo "Create an account", l'azione di registrazione e i contenuti per il corpo (i campi di input) e il footer (link per passare al login).



import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
  
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      setIsLoading(false)

      toast.success('Account created.');

      signIn('credentials', {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input 
        disabled={isLoading}
        placeholder="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Sign in</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
