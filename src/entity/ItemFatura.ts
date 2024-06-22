import * as crypto from "node:crypto";

export type PropriedadeItemFatura = {
  idItemFatura?: string;
  idFatura: string;
  idProduto: string;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  imposto: number;
  criadoEm?: Date;
  actualizadoEm?: Date;
};

export class ItemFatura {
    private _idItemFatura: string;
    private _idFatura: string;
    private _idProduto: string;
    private _nomeProduto: string;
    private _quantidate: number;
    private _precoUnitario: number;
    private _imposto: number;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propriedades: PropriedadeItemFatura) {
        this._idItemFatura = propriedades.idItemFatura ?? crypto.randomUUID();
        this._idFatura = propriedades.idFatura;
        this._idProduto = propriedades.idProduto;
        this._nomeProduto = propriedades.nomeProduto;
        this._quantidate = propriedades.quantidade;
        this._precoUnitario = propriedades.precoUnitario;
        this._imposto = propriedades.imposto;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
    }

    get idItemFatura(): string { return this._idItemFatura; }
    get idFatura(): string { return this._idFatura; }
    get idProduto(): string { return this._idProduto; }
    get nomeProduto(): string { return this._nomeProduto }
    get quantidade(): number { return this._quantidate; }
    get precoUnitario(): number { return this._precoUnitario; }
    get imposto(): number { return this._imposto; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }

    set quantidade(quantidade: number) { this._quantidate = quantidade; }

    public totalSemImposto (): number {
        return this._quantidate * this._precoUnitario;
    }

    public total (): number {
        if (this._imposto > 0) return this.totalSemImposto() + this.totalSemImposto()*(this._imposto/100);
        return this.totalSemImposto()
    }
}