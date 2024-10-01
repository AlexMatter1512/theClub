export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    verified: boolean;
    owner: boolean;
}

export interface Iscrizione_expanded {
    id: string; // iscrizioni.id
    id_lista: string; // liste.id
    nome_lista: string; // liste.nome
    chiusura_lista: string; // liste_eventi.chiusura
    apertura_lista: string; // liste_eventi.apertura
    id_evento: string; // eventi.id
    nome_evento: string; // eventi.nome
    inizio_evento: string; // eventi.inizio
    fine_evento: string; // eventi.fine
    id_cliente: string; // clienti.id
    nome_cliente: string; // clienti.nome
    cognome_cliente: string; // clienti.cognome
    entrato: boolean; // iscrizioni.entrato
    data_iscrizione: string; // iscrizioni.data_iscrizione
    data_ingresso: string; // iscrizioni.data_ingresso
    expand: any | undefined;
}

export interface Evento {
    id: string;
    nome: string;
    inizio: string;
    fine: string;
    poster: string;
    luogo: string;
    created: string;
    updated: string;
}

export interface Cliente {
    id: string;
    username: string;
    email: string;
    nome: string;
    cognome: string;
    data_nascita: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    verified: boolean;
    owner: boolean;
}
export interface Lista {
    id: string;
    nome: string;
    description: string;
    nome_pr: string;
    created: string;
    updated: string;
}

export interface Iscrizione {
    id: string;
    evento: string;
    lista: string;
    prenotati: string[];
    entrati: string[];
    created: string;
    updated: string;
    expand: any;
}

export interface Iscrizione2_duplicate {
    id?: string;
    cliente?: string;
    lista_evento?: string;
    data_iscrizione?: string;
    data_ingresso?: string;
    entrato?: boolean;
    created?: string;
    updated?: string;
}