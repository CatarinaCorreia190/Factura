import {Produto, TipoRegime} from "../entity/produto";
import {ProdutoDatabase} from "../database/produtoDatabase";

export class ProdutoService {
    private readonly _produtoDatabase: ProdutoDatabase;


    constructor(produtoDatabase: ProdutoDatabase) {
        this._produtoDatabase = produtoDatabase;
    }

    async criarProduto(nome: string, descricao: string, preco: number, regime: string): Promise<Produto> {
        const regimeProduto = regime === 'Regime Geral' ? TipoRegime.REGIME_GERAL : TipoRegime.EXENTO;
        const produto = new Produto({nome, descricao, preco, regime: regimeProduto});
        await this._produtoDatabase.criar(produto);
        return produto;
    }

    async encontrarPorId(id: string): Promise<Produto | undefined> {
        return await this._produtoDatabase.encontrarPorId(id);
    }

    async encontrarTodos(): Promise<Produto[]> {
        return await this._produtoDatabase.encontrarTodos();
    }

    async actualizarProduto(id: string, nome: string, descricao: string, preco: number, regime: string): Promise<Produto> {
        const produto = await this._produtoDatabase.encontrarPorId(id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.regime = regime;
        produto.actualizadoEm = new Date();
        this._produtoDatabase.guardar(produto);
        return produto;
    }

    async addQuantidade(id: string, quantidade: number): Promise<Produto> {
        const produto = await this._produtoDatabase.encontrarPorId(id);
        if (!produto) throw new Error('Produto não encontrado');
        produto.quantidade = parseInt(String(produto.quantidade)) + parseInt(String(quantidade));
        await this._produtoDatabase.guardar(produto);
        return produto;
    }

    async actualizarQuantidade(id: string, quantidade: number): Promise<Produto> {
        const produto = await this._produtoDatabase.encontrarPorId(id);
        if (!produto) throw new Error('Produto não encontrado');
        produto.quantidade = quantidade;
        await this._produtoDatabase.guardar(produto);
        return produto;
    }
}