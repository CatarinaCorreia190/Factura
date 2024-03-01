import * as crypto from "node:crypto";

export enum TipoEstado {
    PAGO = 'Pago',
    ANULADA = 'Anulada',
}

type PropriedadesFatura = {
    idFatura?: string;
    dataEmissao: Date;
    idCliente: string;
    montanteTotal: number;
    estado: TipoEstado;
    criadoEm?: Date;
    actualizadoEm?: Date;
}

export class Fatura {
    private _idFatura: string;
    private _dataEmissao: Date;
    private _idCliente: string;
    private _montanteTotal: number;
    private _estado: TipoEstado;
    private _criadoEm: Date;
    private _actualizadoEm: Date;

    public constructor(propriedades: PropriedadesFatura) {
        this._idFatura = propriedades.idFatura ?? crypto.randomUUID();
        this._dataEmissao = propriedades.dataEmissao;
        this._idCliente = propriedades.idCliente;
        this._montanteTotal = propriedades.montanteTotal;
        this._estado = propriedades.estado == 'Pago'? TipoEstado.PAGO : TipoEstado.ANULADA;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
    }

    get idFatura(): string { return this._idFatura; }
    get dataEmissao(): Date { return this._dataEmissao; }
    get idCliente(): string { return this._idCliente; }
    get montanteTotal(): number { return this._montanteTotal; }
    get estado(): string { return this._estado; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }

    set estado(estado: TipoEstado) { this._estado = estado }
    set actualizadoEm(value: Date) { this._actualizadoEm = value; }
}