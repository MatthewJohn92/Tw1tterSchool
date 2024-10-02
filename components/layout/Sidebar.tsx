// Questo componente `Sidebar` rappresenta una barra laterale per la navigazione dell'applicazione.
// Funzionalità principali:
// 1. **useCurrentUser**:
//    - Usa il hook `useCurrentUser` per recuperare i dati dell'utente corrente (se loggato). Questi dati sono usati per personalizzare i link di navigazione e mostrare il pulsante di logout solo se l'utente è autenticato.

// 2. **Items di navigazione**:
//    - Definisce un array `items` che contiene le opzioni di navigazione della sidebar:
//      - Ogni elemento ha un'icona, una label e un link (`href`).
//      - Alcuni elementi sono condizionati dall'autenticazione (`auth: true`), come le notifiche e il profilo dell'utente.
//      - Se l'utente ha notifiche in sospeso, viene visualizzato un alert per l'icona delle notifiche.

// 3. **Logout**:
//    - Se l'utente è autenticato (`currentUser` esiste), viene mostrato un'icona di logout (`BiLogOut`) che permette all'utente di disconnettersi usando la funzione `signOut` di NextAuth.

// 4. **Componenti**:
//    - `SidebarLogo`: rappresenta il logo della sidebar.
//    - `SidebarItem`: un componente personalizzato per rendere ogni elemento di navigazione.
//    - `SidebarTweetButton`: un pulsante separato che permette all'utente di pubblicare un tweet (o qualsiasi azione correlata).

// 5. **Layout della sidebar**:
//    - La sidebar è strutturata con una `div` che ha una colonna e spaziatura configurata per una visualizzazione reattiva.
//    - Gli elementi della sidebar sono resi dinamicamente con la funzione `map` attraverso l'array `items`.


import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                alert={item.alert}
                auth={item.auth}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
              />
            ))}
            {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
  )
};

export default Sidebar;
