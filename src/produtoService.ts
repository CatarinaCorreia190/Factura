import {Produto, TipoRegime} from "./produto";

export class ProdutoService {
    private static instance: ProdutoService;
    private _produtos: Produto[] = [];

    static getInstance() {
        if (!ProdutoService.instance) {
            ProdutoService.instance = new ProdutoService();
        }
        return ProdutoService.instance;
    }

    criarProduto(nome: string, descricao: string, preco: number, regime: string): string {
        const produtoExistente = this._produtos.filter((produto) => produto.nome === nome)[0];
        if (produtoExistente) {
            throw new Error(`Produto já existe`);
        }
        const regimeProduto = regime === 'Regime Geral' ? TipoRegime.REGIME_GERAL : TipoRegime.EXENTO;
        const produto = new Produto({nome, descricao, preco, regime: regimeProduto});
        this._produtos.push(produto);
        return produto.idProduto;
    }

    encontrarPorId(id: string): Produto | undefined {
        const produto = this._produtos.filter((produto) => produto.idProduto === id)[0];
        if (!produto) {
            return undefined;
        }
        return produto;
    }

    encontrarTodos(): Produto[] {
        return this._produtos;
    }

    actualizarProduto(id: string, nome: string, descricao: string, preco: number): void {
        const produto = this._produtos.filter((produto) => produto.idProduto === id)[0];
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.actualizadoEm = new Date();
        const produtoIndex = this._produtos.findIndex((produto) => produto.idProduto === id);
        this._produtos[produtoIndex] = produto;
    }

    addQuantidade(id: string, quantidade: number): void {
        const produto = this._produtos.filter((produto) => produto.idProduto === id)[0];
        if (!produto) throw new Error('Produto não encontrado');
        produto.quantidade = quantidade;
        const produtosIndex = this._produtos.findIndex((produto) => produto.idProduto === id);
        this._produtos[produtosIndex] = produto;
    }
}