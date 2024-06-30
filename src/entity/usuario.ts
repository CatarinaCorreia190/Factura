import crypto from "node:crypto";
import {string} from "yup";

export enum TipoUsuario {
    ADMIN = 'Admin',
    USER = 'User'
}

export type PropriedadesUsuario = {
    idUsuario?: string,
    email: string,
    nome: string,
    sobrenome: string,
    password: string,
    tipo: string,
    criadoEm?: Date,
    actualizadoEm?: Date,
}

export class Usuario {
    private _idUsuario: string;
    private _nome: string;
    private _sobrenome: string;
    private _email: string;
    private _password: string;
    private _tipoUsuario: string;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propridedades: PropriedadesUsuario) {
        this._idUsuario = propridedades.idUsuario ?? crypto.randomUUID();
        this._nome = propridedades.nome;
        this._sobrenome = propridedades.sobrenome;
        this._email = propridedades.email;
        this._password = propridedades.password;
        this._tipoUsuario = propridedades.tipo;
        this._criadoEm = propridedades.criadoEm ?? new Date();
        this._actualizadoEm = propridedades.actualizadoEm ?? new Date();
    }


    get idUsuario(): string {
        return this._idUsuario;
    }

    set idUsuario(value: string) {
        this._idUsuario = value;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get sobrenome(): string {
        return this._sobrenome;
    }

    set sobrenome(value: string) {
        this._sobrenome = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get tipoUsuario(): string {
        return this._tipoUsuario;
    }

    set tipoUsuario(value: string) {
        this._tipoUsuario = value;
    }

    get criadoEm(): Date {
        return this._criadoEm;
    }

    set criadoEm(value: Date) {
        this._criadoEm = value;
    }

    get actualizadoEm(): Date {
        return this._actualizadoEm;
    }

    set actualizadoEm(value: Date) {
        this._actualizadoEm = value;
    }
}