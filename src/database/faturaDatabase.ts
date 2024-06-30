import { Fatura } from "../entity/fatura";
import pgPromise from "pg-promise";
import Connection from "./connection";
import {TipoRegime} from "../entity/produto";
import {ItemFatura} from "../entity/ItemFatura";

const pgp = pgPromise();

export class FaturaDatabase {

    public constructor(private readonly connection: Connection) {}

    async criar(fatura: Fatura): Promise<void> {
        const itemsJson = fatura.items.map(item => ({
            idItemFatura: item.idItemFatura,
            idFatura: item.idFatura,
            idProduto: item.idProduto,
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            imposto: 14,
        }));

        await this.connection.query('SELECT create_fatura_with_items($1, $2, $3, $4, $5)', [
            fatura.idFatura,
            fatura.numeroFatura,
            fatura.idCliente,
            fatura.estado,
            JSON.stringify(itemsJson)
        ]);
    }

    async encontrarPorId(id: string): Promise<Fatura | undefined> {
        let query = `SELECT * FROM fatura WHERE idFatura = $1`;
        const [result] = await this.connection.query(query, id);
        if (!result) {
            return undefined;
        }
        const fatura = new Fatura({
            idFatura: result.idfatura,
            numeroFatura: result.numerofatura,
            dataEmissao: result.dataemissao,
            dataPago: result.datapago,
            idCliente: result.idcliente,
            estado: result.estado,
            criadoEm: result.criadoem,
            actualizadoEm: result.actualizadoem,
        });
        const queryItems = `SELECT * FROM itemfatura WHERE idFatura = $1`;
        const resultItems = await this.connection.query(queryItems, id);
        resultItems.forEach(item => {
            const newItem = new ItemFatura({
                idItemFatura: item.iditemfatura,
                idFatura: item.idfatura,
                idProduto: item.idproduto,
                nomeProduto: item.nomeProduto,
                quantidade: item.quantidade,
                precoUnitario: parseFloat(item.precounitario),
                imposto: parseFloat(item.imposto),
                criadoEm: item.criadoem,
                actualizadoEm: item.actualizadoem
            })
            fatura.addItem(newItem)
        })
        return fatura;
    }

    async encontrarTodos(): Promise<Fatura[]> {
        const query = `SELECT * FROM fatura`;
        const faturas = await this.connection.query(query, undefined);
        const invoices: Fatura[] = []
        for (const fatura of faturas) {
            const faturaRestored = new Fatura({
                idFatura: fatura.idfatura,
                numeroFatura: fatura.numerofatura,
                dataEmissao: fatura.dataemissao,
                dataPago: fatura.datapago,
                idCliente: fatura.idcliente,
                estado: fatura.estado,
                criadoEm: fatura.criadoem,
                actualizadoEm: fatura.actualizadoem,
            });

            const queryItems = `SELECT * FROM itemfatura WHERE idFatura = $1`;
            const resultItems = await this.connection.query(queryItems, faturaRestored.idFatura);
            resultItems.forEach(item => {
                const newItem = new ItemFatura({
                    idItemFatura: item.iditemfatura,
                    idFatura: item.idfatura,
                    idProduto: item.idproduto,
                    nomeProduto: item.nomeProduto,
                    quantidade: item.quantidade,
                    precoUnitario: parseFloat(item.precounitario),
                    imposto: parseFloat(item.imposto),
                    criadoEm: item.criadoem,
                    actualizadoEm: item.actualizadoem
                })
                faturaRestored.addItem(newItem)
            });
            invoices.push(faturaRestored);
        }
        return invoices
    }

    async guardar(fatura: Fatura): Promise<void> {
        const query = `
            UPDATE fatura
            SET numeroFatura = $1, dataEmissao = $2, dataPago = $3, idCliente = $4, estado = $5, actualizadoEm = CURRENT_TIMESTAMP
            WHERE idFatura = $6
        `;
        const values = [fatura.numeroFatura, fatura.dataEmissao, fatura.dataPago, fatura.idCliente, fatura.estado, fatura.idFatura];
        await this.connection.query(query, values);
    }
}
