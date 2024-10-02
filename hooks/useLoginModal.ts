// Questo codice utilizza la libreria `zustand` per creare un hook personalizzato `useLoginModal` che gestisce lo stato di apertura e chiusura di un modale di login.
// Funzionalità principali:

// 1. **Interfaccia `LoginModalStore`**:
//    - Definisce la struttura dello stato del modale, con tre proprietà:
//      - `isOpen`: un booleano che rappresenta se il modale è aperto o chiuso.
//      - `onOpen`: una funzione che imposta `isOpen` su `true`, aprendo così il modale.
//      - `onClose`: una funzione che imposta `isOpen` su `false`, chiudendo così il modale.

// 2. **Hook `useLoginModal`**:
//    - Utilizza `create` di `zustand` per creare uno store di stato locale, che contiene:
//      - `isOpen`: inizialmente impostato su `false`, indicando che il modale è chiuso all'avvio.
//      - `onOpen`: imposta `isOpen` su `true`, utilizzata per aprire il modale.
//      - `onClose`: imposta `isOpen` su `false`, utilizzata per chiudere il modale.

// 3. **Uso del hook**:
//    - Questo hook `useLoginModal` viene esportato e può essere utilizzato in qualsiasi componente React che ha bisogno di controllare l'apertura o chiusura del modale di login.
//    - Il componente che usa questo hook può chiamare `onOpen()` per aprire il modale e `onClose()` per chiuderlo, basandosi sullo stato `isOpen`.

// 4. **Semplicità con `zustand`**:
//    - `zustand` fornisce una semplice e leggera soluzione per gestire lo stato globale o locale senza la complessità di Redux.
//    - In questo caso, lo stato del modale è gestito centralmente e può essere usato ovunque nell'applicazione senza passare proprietà.

import { create } from 'zustand';

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useLoginModal;
