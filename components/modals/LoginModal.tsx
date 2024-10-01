// Questo componente React rappresenta un modale (finestra di dialogo) per il login, utilizzando Next.js e il pacchetto "next-auth" per l'autenticazione.
// Funzionalità principali:
// - Usa due hook personalizzati: `useLoginModal` e `useRegisterModal`, che gestiscono lo stato di apertura e chiusura dei rispettivi modali.
// - Lo stato locale è gestito tramite `useState` per salvare l'email, la password e lo stato di caricamento (quando si sta inviando la richiesta di login).
// - Il login avviene con la funzione `signIn` del pacchetto "next-auth", che invia le credenziali (email e password) per l'autenticazione.
// - Se il login ha successo, viene mostrato un messaggio di conferma con il pacchetto `react-hot-toast`, il modale di login viene chiuso.
// - In caso di errore durante il login, viene mostrato un messaggio di errore.
// - Include un link nel footer per passare al modale di registrazione, che chiude il modale di login e apre quello di registrazione.
// - Gli input per l'email e la password sono disabilitati durante il caricamento per evitare doppie richieste.
// - Il modale viene reso tramite il componente `Modal`, con un titolo ("Login"), un'azione ("Sign in") e il contenuto del corpo e del footer.


import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        email,
        password,
      });

      toast.success('Logged in');

      loginModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading} 
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twitter?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create an account</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
