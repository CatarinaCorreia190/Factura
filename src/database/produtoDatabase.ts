import { Produto } from "../entity/produto";
import pgPromise from "pg-promise";
import Connection from "./connection";

export class ProdutoDatabase {

    public constructor(private readonly connection: Connection) {}

    async criar(produto: Produto): Promise<void> {
        const query = `INSERT INTO produto (idproduto, nome, descricao, preco, regime, quantidade)VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [produto.idProduto, produto.nome, produto.descricao, produto.preco, produto.regime, produto.quantidade];
        await this.connection.query(query, values);
    }

    async encontrarPorId(id: string): Promise<Produto | undefined> {
        const query = `SELECT * FROM produto WHERE idproduto = $1`;
        const [result] = await this.connection.query(query, id);
        if (!result) {
            return undefined;
        }
        const produto = new Produto({
            idProduto: result.idproduto,
            nome: result.nome,
            descricao: result.descricao,
            preco: parseFloat(result.preco),
            regime: result.regime,
            quantidade: result.quantidade,
            criadoEm: result.criadoEm,
            actualizadoEm: result.actualizadoEm,
        });
        return produto;
    }

    async encontrarTodos(): Promise<Produto[]> {
        const query = `SELECT * FROM produto`;
        const result = await this.connection.query(query, undefined);
        return result.map((produto: any) => {
            return new Produto({
                idProduto: produto.idproduto,
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                regime: produto.regime,
                quantidade: produto.quantidade,
                criadoEm: produto.criadoEm,
                actualizadoEm: produto.actualizadoEm,
            });
        });
    }

    async guardar(produto: Produto): Promise<void> {
        const query = `UPDATE produto SET nome = $1, descricao = $2, preco = $3, regime = $4, quantidade = $5, actualizadoEm = CURRENT_TIMESTAMP WHERE idproduto = $6`;
        const values = [produto.nome, produto.descricao, produto.preco, produto.regime, produto.quantidade, produto.idProduto];
        await this.connection.query(query, values);
    }
}
