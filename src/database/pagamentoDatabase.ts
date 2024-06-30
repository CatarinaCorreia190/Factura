import { Pagamento } from "../entity/pagamento";
import pgPromise from "pg-promise";
import Connection from "./connection";

const pgp = pgPromise();

export class PagamentoDatabase {

    public constructor(private readonly connection: Connection) {}

    async criar(pagamento: Pagamento): Promise<void> {
        const query = `INSERT INTO pagamento (idPagamento, idFatura, dataDePagamento, montantePago) VALUES ($1, $2, $3, $4)`;
        const values = [pagamento.idPagamento, pagamento.idFatura, pagamento.dataDePagamento, pagamento.montantePago];
        await this.connection.query(query, values);
    }

    async encontrarPorCampo(campo: string, valor: string): Promise<Pagamento | undefined> {
        const query = `SELECT * FROM pagamento WHERE ${campo} = $1`;
        const [result] = await this.connection.query(query, valor);
        if (!result) {
            return undefined;
        }
        const pagamento = new Pagamento({
            idPagamento: result.idpagamento,
            idFatura: result.idfatura,
            dataDePagamento: result.dataDepagamento,
            montantePago: result.montantepago,
            criadoEm: result.criadoem,
            actualizadoEm: result.actualizadoem,
        });
        return pagamento;
    }

    async encontrarTodos(): Promise<Pagamento[]> {
        const query = `SELECT * FROM pagamento`;
        const result = await this.connection.query(query, undefined);
        return result.map((pagamento: any) => {
            return new Pagamento({
                idPagamento: result.idpagamento,
                idFatura: result.idfatura,
                dataDePagamento: result.dataDepagamento,
                montantePago: result.montantepago,
                criadoEm: result.criadoem,
                actualizadoEm: result.actualizadoem,
            });
        });
    }

    async guardar(pagamento: Pagamento): Promise<void> {
        const query = `UPDATE pagamento SET idFatura = $1, dataDePagamento = $2, montantePago = $3, actualizadoEm = CURRENT_TIMESTAMP WHERE idPagamento = $4`;
        const values = [pagamento.idFatura, pagamento.dataDePagamento, pagamento.montantePago, pagamento.idPagamento];
        await this.connection.query(query, values);
    }
}
