// Questo file definisce una funzione "fetcher" personalizzata utilizzata con SWR per recuperare dati da un'API.
// Funzionalità principali:
// 1. Utilizza Axios per effettuare una richiesta HTTP GET all'URL passato come parametro.
// 2. Quando la richiesta ha successo, restituisce solo i dati (`res.data`) della risposta.
// 3. Viene esportata come funzione di utilità per essere utilizzata da SWR o altri componenti che richiedono il fetching di dati da API.
//    - Ad esempio, nel caso dell'hook `useSWR`, `fetcher` viene passato per recuperare dati in modo efficiente da un endpoint API.


import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
