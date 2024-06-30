import { Cliente } from "../entity/cliente";
import pgPromise from "pg-promise";
import Connection from "./connection";

const pgp = pgPromise();

export class ClienteDatabase {
    private static instance: ClienteDatabase;

    public constructor(private readonly connection: Connection) {}

    async criar(cliente: Cliente): Promise<void> {
        const query = `
            INSERT INTO cliente (idcliente, nome, nif, email, endereco)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [cliente.idCliente, cliente.nome, cliente.nif, cliente.email, cliente.endereco];
        await this.connection.query(query, values)
    }

    async encontrarPorCampo(campo: string, valor: string): Promise<Cliente | undefined> {
        const query = `SELECT * FROM cliente WHERE ${campo} = $1`;
        const [result] = await this.connection.query(query, valor);
        if (!result) {
            return undefined;
        }
        const cliente = new Cliente({
            idCliente: result.idcliente,
            nif: result.nif,
            nome: result.nome,
            email: result.email,
            endereco: result.endereco,
            criadoEm: result.criadoEm,
            actualizadoEm: result.actualizadoEm,
        })
        return cliente;
    }

    async encontrarTodos(): Promise<Cliente[]> {
        const query = `SELECT * FROM cliente`;
        const result = await this.connection.query(query, undefined);
        return result.map((cliente: any) => {
            return new Cliente({
                idCliente: cliente.idcliente,
                nif: cliente.nif,
                nome: cliente.nome,
                email: cliente.email,
                endereco: cliente.endereco,
                criadoEm: cliente.criadoEm,
                actualizadoEm: cliente.actualizadoEm,
            })
        });
    }

    async guardar(cliente: Cliente): Promise<void> {
        const query = `UPDATE cliente SET nome = $1, nif = $2, email = $3, endereco = $4, actualizado_em = CURRENT_TIMESTAMP WHERE idcliente = $5`;
        const values = [cliente.nome, cliente.nif, cliente.email, cliente.endereco, cliente.idCliente];
        await this.connection.query(query, values);
    }
}
