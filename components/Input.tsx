/*
  Questo componente React rappresenta un campo di input personalizzato che permette all'utente di inserire del testo o altri tipi di dati.
  Il componente è completamente controllato tramite le props fornite, consentendo flessibilità nell'uso e nello stile.

  Props principali:
  - `placeholder`: una stringa opzionale che fornisce un testo segnaposto visualizzato quando l'input è vuoto.
  - `value`: il valore attuale del campo di input. È controllato tramite la prop, rendendo l'input un componente controllato.
  - `type`: specifica il tipo di input (es: "text", "password", "email"). Di default è "text" se non specificato.
  - `disabled`: se true, disabilita l'input, impedendo modifiche e cambiando lo stile visivo per riflettere lo stato di disabilitazione.
  - `onChange`: una funzione da chiamare ogni volta che l'input cambia. Passa l'evento di cambiamento come argomento, utile per gestire l'aggiornamento dello stato.
  - `label`: un'etichetta opzionale che appare sopra il campo di input, utilizzata per descrivere il campo stesso.

  Struttura del componente:
  - Se la prop `label` è fornita, viene visualizzato un elemento `<p>` sopra il campo di input che rappresenta l'etichetta, stilizzata con classe Tailwind CSS.
  - L'elemento `<input>` viene configurato con diverse classi CSS per gestire l'aspetto e il comportamento, inclusi:
    - **w-full**: il campo di input occupa l'intera larghezza disponibile.
    - **bg-black**: sfondo nero per il campo di input.
    - **text-white**: il testo inserito è bianco.
    - **border-2** e **border-neutral-800**: gestisce il bordo con uno spessore di 2px e un colore neutro scuro.
    - **focus:border-sky-500**: cambia il colore del bordo al celeste quando l'input è focalizzato.
    - **disabled:bg-neutral-900**: cambia il colore di sfondo quando l'input è disabilitato.
    - **disabled:opacity-70** e **disabled:cursor-not-allowed**: riduce l'opacità e cambia il cursore per indicare che l'input è disabilitato.
  - Il componente è reattivo e interattivo grazie a classi di **transizione** che aggiungono effetti visivi durante il focus o quando l'input è disabilitato.

  Questo componente è particolarmente utile in situazioni in cui è necessario un input personalizzato con un design specifico
  e si desidera un controllo totale su come reagisce agli eventi come cambiamenti di valore o stato di disabilitazione.
*/


interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
  }
  
  const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
    return (
      <div className="w-full">
        {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
        <input
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className="
            w-full
            p-4 
            text-lg 
            bg-black 
            border-2
            border-neutral-800 
            rounded-md
            outline-none
            text-white
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
        />
      </div>
     );
  }
   
  export default Input;