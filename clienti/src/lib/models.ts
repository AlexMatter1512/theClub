export interface Cliente {
    id: string;
    username: string;
    email: string;
    nome: string;
    data_nascita: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    verified: boolean;
    owner: boolean;
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