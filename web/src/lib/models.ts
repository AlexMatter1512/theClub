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