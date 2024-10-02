// Questo file definisce il componente principale dell'applicazione Next.js, che avvolge l'intera app con layout e provider globali.
// Funzionalità principali:
// 1. **SessionProvider**: Il componente avvolge l'applicazione per fornire l'accesso alla sessione di NextAuth in tutto il progetto.
//    - `SessionProvider` viene configurato con la sessione passata attraverso `pageProps.session`, utile per la gestione dell'autenticazione in diverse pagine.
// 2. **Toaster**: Il componente `Toaster` di `react-hot-toast` gestisce le notifiche a livello globale per mostrare messaggi come successo o errori, ad esempio durante il login o la registrazione.
// 3. **Modals**: I modali di login, registrazione e modifica del profilo (`LoginModal`, `RegisterModal`, `EditModal`) sono inclusi qui per essere disponibili in tutta l'applicazione.
// 4. **Layout**: Il componente `Layout` avvolge i contenuti delle pagine, fornendo una struttura comune (come intestazione, menu di navigazione, ecc.) per tutte le pagine.
// 5. **Component**: Rappresenta il contenuto specifico di ciascuna pagina. `Component` e `pageProps` sono passati automaticamente da Next.js per rendere ogni pagina con i relativi dati.
// 6. **globals.css**: Importa lo stile globale dell'applicazione, applicando stili comuni in tutto il progetto.


import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import '@/styles/globals.css'
import EditModal from '@/components/modals/EditModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <EditModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
