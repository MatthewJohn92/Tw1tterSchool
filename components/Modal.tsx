import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

/*
  Questo componente React rappresenta un Modal (finestra modale) che può essere utilizzato per mostrare contenuti aggiuntivi
  o chiedere conferme all'utente senza lasciare la pagina attuale. Il Modal è controllato tramite diverse props che 
  ne definiscono il comportamento e l'aspetto.

  Props principali:
  - `isOpen`: determina se il Modal è visibile. Se `false` o non fornito, il Modal non viene visualizzato.
  - `onClose`: funzione da eseguire quando si chiude il Modal, ad esempio quando l'utente clicca sulla "X".
  - `onSubmit`: funzione da eseguire quando l'utente conferma l'azione, ad esempio premendo un pulsante di invio.
  - `title`: opzionale, definisce il titolo del Modal.
  - `body`: opzionale, un elemento React che rappresenta il contenuto principale del Modal.
  - `footer`: opzionale, un elemento React che rappresenta il contenuto del footer (parte inferiore) del Modal.
  - `actionLabel`: etichetta del pulsante principale che esegue l'azione di conferma (submit).
  - `disabled`: se true, disabilita i pulsanti per prevenire azioni durante l'elaborazione o in stati non validi.

  Funzioni principali:
  - `handleClose`: gestisce la chiusura del Modal. Se `disabled` è `true`, impedisce l'azione, altrimenti esegue `onClose`.
  - `handleSubmit`: gestisce l'invio o conferma. Se `disabled` è `true`, l'azione è bloccata, altrimenti esegue `onSubmit`.

  Struttura del componente:
  - Se `isOpen` è `false`, il Modal non viene renderizzato (ritorna `null`).
  - Il Modal viene visualizzato come una finestra centrata e fissata allo schermo con overlay scuro (`bg-neutral-800` con `bg-opacity-70`).
  - È composto da tre sezioni:
    1. **Header**: contiene il titolo (`title`) e un pulsante di chiusura con l'icona "X" (usando `AiOutlineClose` da `react-icons`).
    2. **Body**: mostra il contenuto principale del Modal, passato tramite la prop `body`.
    3. **Footer**: contiene il pulsante di conferma (`Button`), disabilitato se `disabled` è true, e il contenuto opzionale del footer.

  Classi CSS:
  - La struttura utilizza Tailwind CSS per il layout e lo stile, come la gestione della griglia flex, padding e bordi arrotondati.
  - Quando l'utente interagisce con il Modal (ad esempio chiusura o invio), le transizioni CSS aggiungono un tocco di interattività visiva.
*/



interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/*content*/}
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            "
          >
            {/*header*/}
            <div className="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-white">
                {title}
              </h3>
              <button
                className="
                  p-1 
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-10 flex-auto">
              {body}
            </div>
            {/*footer*/}
            <div className="flex flex-col gap-2 p-10">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
