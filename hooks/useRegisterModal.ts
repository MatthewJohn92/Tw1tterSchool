// Questo hook personalizzato `useRegisterModal` utilizza la libreria `zustand` per gestire lo stato di apertura e chiusura di un modale di registrazione.
// Funzionalità principali:

// 1. **Interfaccia `RegisterModalStore`**:
//    - Definisce la struttura dello stato per il modale di registrazione con tre proprietà:
//      - `isOpen`: un booleano che rappresenta se il modale è aperto o chiuso.
//      - `onOpen`: una funzione che imposta `isOpen` su `true`, aprendo così il modale.
//      - `onClose`: una funzione che imposta `isOpen` su `false`, chiudendo così il modale.

// 2. **Hook `useRegisterModal`**:
//    - Utilizza la funzione `create` di `zustand` per creare uno store di stato locale che gestisce l'apertura e la chiusura del modale.
//    - `isOpen` è inizialmente impostato su `false`, quindi il modale è chiuso all'avvio.
//    - Le funzioni `onOpen` e `onClose` consentono rispettivamente di aprire e chiudere il modale modificando lo stato di `isOpen`.

// 3. **Uso del hook**:
//    - Questo hook `useRegisterModal` viene esportato e può essere utilizzato in qualsiasi componente React che ha bisogno di controllare l'apertura o chiusura del modale di registrazione.
//    - Il componente può chiamare `onOpen()` per aprire il modale di registrazione e `onClose()` per chiuderlo, basandosi sullo stato `isOpen`.

// 4. **Semplicità con `zustand`**:
//    - `zustand` fornisce un modo semplice e leggero per gestire lo stato globale o locale senza la complessità di altre soluzioni come Redux.
//    - In questo caso, lo stato del modale di registrazione è gestito centralmente e può essere usato ovunque nell'applicazione senza passare props.


import { create } from 'zustand';

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRegisterModal;
