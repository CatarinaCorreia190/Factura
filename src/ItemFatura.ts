import * as crypto from "node:crypto";

export type PropriedadeItemFatura = {
    idItemFatura?: string;
    idFatura: string;
    nomeProduto: string;
    quandidateProduto: number;
    precoUnitario: number;
    imposto: number;
    criadoEm?: Date;
    actualizadoEm?: Date;
}

export class ItemFatura {
    private _idItemFatura: string;
    private _idFatura: string;
    private _nomeProduto: string;
    private _quandidateProduto: number;
    private _precoUnitario: number;
    private _imposto: number;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propriedades: PropriedadeItemFatura) {
        this._idItemFatura = propriedades.idItemFatura ?? crypto.randomUUID();
        this._idFatura = propriedades.idFatura;
        this._nomeProduto = propriedades.nomeProduto;
        this._quandidateProduto = propriedades.quandidateProduto;
        this._precoUnitario = propriedades.precoUnitario;
        this._imposto = propriedades.imposto;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
    }

    get idItemFatura(): string { return this._idItemFatura; }
    get idFatura(): string { return this._idFatura; }
    get nomeProduto(): string { return this._nomeProduto; }
    get quantidade(): number { return this._quandidateProduto; }
    get precoUnitario(): number { return this._precoUnitario; }
    get imposto(): number { return this._imposto; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }

    public totalSemImposto (): number {
        return this._quandidateProduto * this._precoUnitario;
    }

    public total (): number {
        if (this._imposto > 0) return this.totalSemImposto() + this.totalSemImposto()*(this._imposto/100);
        return this.totalSemImposto()
    }
}