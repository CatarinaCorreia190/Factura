import * as crypto from "node:crypto";
import { ItemFatura } from "./ItemFatura";

export enum TipoEstado {
    EMITIDA = 'Emitida',
    PAGO = 'Pago',
    ANULADA = 'Anulada',
}

export enum TipoFatura {

}

type PropriedadesFatura = {
    idFatura?: string;
    numeroFatura: string;
    dataEmissao?: Date;
    dataPago?: Date;
    idCliente: string;
    estado?: TipoEstado;
    items?: ItemFatura[];
    criadoEm?: Date;
    actualizadoEm?: Date;
}

export class Fatura {
    private _idFatura: string;
    private _numeroFatura: string;
    private _dataEmissao: Date;
    private _dataPago: Date;
    private _idCliente: string;
    private _estado: TipoEstado;
    private _criadoEm: Date;
    private _actualizadoEm: Date;
    private _items: ItemFatura[];

    public constructor(propriedades: PropriedadesFatura) {
        this._idFatura = propriedades.idFatura ?? crypto.randomUUID();
        this._numeroFatura = propriedades.numeroFatura;
        this._dataEmissao = propriedades.dataEmissao ?? new Date();
        this._dataPago = propriedades.dataPago ?? new Date();
        this._idCliente = propriedades.idCliente;
        this._estado = propriedades.estado ?? TipoEstado.EMITIDA;
        this._criadoEm = propriedades.criadoEm ?? new Date();
        this._actualizadoEm = propriedades.actualizadoEm ?? new Date();
        this._items = propriedades.items ?? []
    }

    get idFatura(): string { return this._idFatura; }
    get numeroFatura(): string { return this._numeroFatura; }
    get dataEmissao(): Date { return this._dataEmissao; }
    get dataPago(): Date { return this._dataPago; }
    get idCliente(): string { return this._idCliente; }
    get estado(): string { return this._estado; }
    get criadoEm(): Date { return this._criadoEm; }
    get actualizadoEm(): Date { return this._actualizadoEm; }
    get items(): any[] { return this._items.map((item) => {
        return {
            idItemFatura: item.idItemFatura,
            idFatura: item.idFatura,
            idProduto: item.idProduto,
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            totalSemImposto: item.totalSemImposto(),
            total: item.total()
        }
    }) }

    set estado(estado: TipoEstado) { this._estado = estado }
    set actualizadoEm(value: Date) { this._actualizadoEm = value; }

    public pagar() {
        if (this._estado != TipoEstado.EMITIDA) throw new Error('Estado Inválido');
        this._estado = TipoEstado.PAGO;
        this._dataPago = new Date();
    }

    public anular() {
        this._estado = TipoEstado.ANULADA;
    }

    addItem(itemFatura: ItemFatura) {
        this._items.forEach((item) => {
            if (item.idProduto == itemFatura.idProduto) {
                item.quantidade = item.quantidade + itemFatura.quantidade;
                return;
            }
        })
        this._items.push(itemFatura);
    }

    total (): number {
        let total = 0;
        this._items.forEach((item) => {
            total += item.total();
        })
        return total;
    }

}