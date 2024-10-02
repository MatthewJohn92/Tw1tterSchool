// Questo componente `SidebarItem` rappresenta un singolo elemento della sidebar, che può essere un collegamento di navigazione o un'azione (come il logout).
// Funzionalità principali:
// 1. **Props (SidebarItemProps)**:
//    - `label`: La label di testo che descrive l'elemento.
//    - `icon`: L'icona dell'elemento, fornita come tipo `IconType` dalle librerie di icone di React.
//    - `href`: URL di destinazione per la navigazione (opzionale).
//    - `onClick`: Funzione che viene eseguita quando l'elemento viene cliccato (opzionale).
//    - `auth`: Indica se l'elemento richiede autenticazione. Se impostato su `true` e l'utente non è autenticato, viene aperto il modale di login.
//    - `alert`: Se impostato su `true`, mostra un'icona di avviso (un punto blu) accanto all'elemento (ad esempio per notifiche).

// 2. **Gestione del click (handleClick)**:
//    - Se viene fornita una funzione `onClick`, questa viene eseguita al click.
//    - Se l'elemento richiede autenticazione (`auth: true`) ma l'utente non è autenticato, viene aperto il modale di login tramite `loginModal.onOpen()`.
//    - Se l'utente è autenticato o l'autenticazione non è richiesta, e c'è un `href`, la funzione `router.push(href)` effettua la navigazione all'URL specificato.

// 3. **Icona e Alert**:
//    - L'icona viene resa tramite il componente `Icon`, e viene visualizzata sia nella versione mobile (icone grandi) che desktop (icone piccole e testo).
//    - Se `alert` è true, viene visualizzato un punto blu accanto all'icona per attirare l'attenzione (utilizzato, ad esempio, per notifiche).

// 4. **Responsività**:
//    - Il componente è progettato per essere responsive:
//      - Nella visualizzazione mobile (classi `lg:hidden`), viene mostrata solo l'icona grande.
//      - Nella visualizzazione desktop (`lg:flex`), vengono mostrati sia l'icona che la label di testo.
//    - Gli effetti hover aggiungono un'ombra leggera intorno all'icona per migliorare l'interattività.

// 5. **Styling**:
//    - Viene utilizzato Tailwind CSS per il layout e lo stile, con classi come `rounded-full`, `hover:bg-slate-300` e `cursor-pointer` per gestire l'aspetto e le interazioni del componente.


import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/router';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} color="white" />
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
    </div>
  );
}

export default SidebarItem;