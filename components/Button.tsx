interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  secondary, 
  fullWidth, 
  onClick, 
  large, 
  disabled, 
  outline 
}) => {
  return ( 

    /*
  Questo componente React rappresenta un pulsante altamente personalizzabile.
  Le seguenti proprietà (props) influenzano il comportamento e l'aspetto del pulsante:

  1. `disabled`: se impostato su true, disabilita il pulsante, rendendolo non cliccabile e cambiandone lo stile visivo.
  2. `onClick`: una funzione che viene eseguita quando il pulsante viene cliccato.
  3. `fullWidth`: se true, il pulsante si estende per l'intera larghezza del contenitore; altrimenti, si adatta alla dimensione del suo contenuto.
  4. `secondary`: se true, il pulsante assume uno stile alternativo, con sfondo bianco, testo nero e bordo nero.
  5. `large`: se true, aumenta la dimensione del pulsante (testo più grande e più padding).
  6. `outline`: se true, il pulsante diventa trasparente con un bordo bianco e testo bianco.
  7. `label`: rappresenta il testo che verrà visualizzato all'interno del pulsante.

  Il componente utilizza le classi CSS dinamicamente in base alle props passate, applicando stili specifici
  (come colore di sfondo, testo, dimensioni, bordo, ecc.) per rendere il pulsante visivamente interattivo e accessibile.
*/

    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-sky-500'}
        ${secondary ? 'text-black' : 'text-white'}
        ${secondary ? 'border-black' : 'border-sky-500'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}
      `}
    >
      {label}
    </button>
   );
}
 
export default Button;