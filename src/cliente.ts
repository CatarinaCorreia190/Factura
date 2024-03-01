import * as crypto from "node:crypto";

export type PropriedadesCliente = {
    idCliente?: string;
    nif: string;
    nome: string;
    email: string;
    endereco: string;
    criadoEm?: Date;
    actualizadoEm?: Date;
}

export class Cliente {
    private _idCliente: string;
    private _nif: string;
    private _nome: string;
    private _email: string;
    private _endereco: string;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propriedades: PropriedadesCliente) {
        this._idCliente = propriedades.idCliente ?? crypto.randomUUID();
        this._nif = propriedades.nif;
        this._nome = propriedades.nome;
        this._email = propriedades.email;
        this._endereco = propriedades.endereco;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
    }

    get idCliente(): string { return this._idCliente; }
    get nif(): string { return this._nif; }
    get nome(): string { return this._nome; }
    get email(): string { return this._email; }
    get endereco(): string { return this._endereco; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }

    set nome(nome: string) { this._nome = nome }
    set email(email: string) { this._email = email }
    set endereco(email: string) { this._endereco = email }

}