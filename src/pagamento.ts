import crypto from "node:crypto";

type PropriedadesPagamento = {
    idPagamento?: string;
    idFatura: string;
    dataDePagamento?: Date;
    montantePago: number;
    criadoEm?: Date;
    actualizadoEm?: Date;
}

export class Pagamento {
    private _idPagamento: string;
    private _idFatura: string;
    private _dataDePagamento: Date;
    private _montantePago: number;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propriedades: PropriedadesPagamento) {
        this._idPagamento = propriedades.idPagamento ?? crypto.randomUUID();
        this._idFatura = propriedades.idFatura;
        this._dataDePagamento = propriedades.dataDePagamento ?? new Date();
        this._montantePago = propriedades.montantePago;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
    }

    get idPagamento(): string { return this._idPagamento; }
    get idFatura(): string { return this._idFatura; }
    get dataDePagamento(): Date { return this._dataDePagamento; }
    get montantePago(): number { return this._montantePago; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }
}