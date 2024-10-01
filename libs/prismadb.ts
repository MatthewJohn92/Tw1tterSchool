// Importa PrismaClient dal pacchetto "@prisma/client"
import { PrismaClient } from "@prisma/client"

// Dichiarazione globale per la variabile "prisma" che può essere di tipo PrismaClient o undefined.
// Questo serve per evitare che TypeScript generi errori quando si utilizza una variabile globale.
declare global {
  var prisma: PrismaClient | undefined
}

// Crea un'istanza di PrismaClient. Se esiste già un'istanza globale di PrismaClient (in `globalThis.prisma`),
// la utilizza, altrimenti crea una nuova istanza.
// Questo approccio evita di creare una nuova istanza ogni volta che questo file viene importato.
// In ambienti di sviluppo, il server può riavviarsi spesso e senza questo meccanismo,
// si rischia di creare molteplici istanze di PrismaClient, il che può portare a problemi di connessione al database.
const client = globalThis.prisma || new PrismaClient()

// Se l'applicazione non è in esecuzione in ambiente di produzione, l'istanza di PrismaClient viene
// assegnata alla variabile globale `globalThis.prisma`.
// Questo permette di riutilizzare la stessa istanza durante l'esecuzione del codice in ambiente di sviluppo,
// evitando di creare una nuova connessione ad ogni modifica del codice.
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// Esporta l'istanza di PrismaClient per poterla utilizzare in altre parti dell'applicazione.
export default client
