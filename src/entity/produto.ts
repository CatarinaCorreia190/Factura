import * as crypto from "node:crypto";

export enum TipoRegime {
    REGIME_GERAL = 'Regime Geral',
    EXENTO = 'Regime de Não Sujeição'
}

export type PropriedadesProduto = {
    idProduto?: string;
    nome: string;
    descricao: string;
    preco: number;
    regime: TipoRegime;
    quantidade?: number;
    criadoEm?: Date;
    actualizadoEm?: Date;
}

export class Produto {
    private _idProduto: string;
    private _nome: string;
    private _descricao: string;
    private _preco: number;
    private _quantidade: number;
    private _regime: string;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propriedades: PropriedadesProduto) {
        this._idProduto = propriedades.idProduto ?? crypto.randomUUID();
        this._nome = propriedades.nome;
        this._descricao = propriedades.descricao;
        this._preco = propriedades.preco;
        this._quantidade = propriedades.quantidade ?? 0;
        this._regime = propriedades.regime;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
    }

    get idProduto(): string { return this._idProduto; }
    get nome(): string { return this._nome; }
    get descricao(): string { return this._descricao; }
    get preco(): number { return this._preco; }
    get quantidade(): number { return this._quantidade; }
    get regime(): string { return this._regime; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }

    set nome(nome: string) { this._nome = nome }
    set descricao(descricao: string) { this._descricao = descricao }
    set preco(preco: number) { this._preco = preco }
    set quantidade(quantidade: number) { this._quantidade = quantidade }
    set regime(regime: string) { this._regime = regime }
    set actualizadoEm(date: Date) { this._actualizadoEm = date; }
}