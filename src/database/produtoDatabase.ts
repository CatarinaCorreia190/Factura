import {Produto} from "../entity/produto";

export class ProdutoDatabase {
    private static instance: ProdutoDatabase;
    private _produtos: Produto[] = [];

    static getInstance() {
        if (!ProdutoDatabase.instance) {
            ProdutoDatabase.instance = new ProdutoDatabase();
        }
        return ProdutoDatabase.instance;
    }

    async criar(produto: Produto): Promise<void> {
        this._produtos.push(produto)
    }

    async encontrarPorId(id: string): Promise<Produto | undefined> {
        const produtoEncontrado = this._produtos.filter((produto) => produto.idProduto === id)[0];
        if (!produtoEncontrado) {
            return undefined;
        }
        return produtoEncontrado;
    }

    async encontrarTodos(): Promise<Produto[]> {
        return this._produtos;
    }

    async guardar(produto: Produto): Promise<void> {
        const produtoIndex = this._produtos.findIndex((currentProduto) => currentProduto.idProduto === produto.idProduto);
        if (produtoIndex === -1) return undefined;
        this._produtos[produtoIndex] = produto;
    }
}