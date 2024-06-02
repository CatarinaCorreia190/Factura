import {ProdutoService} from "../src/service/produtoService";
import {ProdutoDatabase} from "../src/database/produtoDatabase";

describe('ProdutoService Unit Tests', () => {
    test('Deve criar um produto', async () => {
        const produtoDatabase = ProdutoDatabase.getInstance()
        const produtoService = new ProdutoService(produtoDatabase);
        const nome = "arroz";
        const descricao = "Arroz Tio Lucas de 1KG";
        const preco = 2500;
        const regime = 'Regime Geral';
        const produto = await produtoService.criarProduto(nome, descricao, preco, regime);
        const produtoCriado = await produtoService.encontrarPorId(produto.idProduto);
        expect(produtoCriado?.idProduto).toBe(produto.idProduto);
        expect(produtoCriado?.nome).toBe(nome);
        expect(produtoCriado?.descricao).toBe(descricao);
        expect(produtoCriado?.preco).toBe(preco);
        expect(produtoCriado?.regime).toBe(regime);
        expect(produtoCriado?.quantidade).toBe(0);
    })

    test("Deve guardar um produto", async () => {
        const produtoDatabase = ProdutoDatabase.getInstance()
        const produtoService = new ProdutoService(produtoDatabase);
        const nome = "arroz";
        const descricao = "Arroz Tio Lucas de 1KG";
        const preco = 2500;
        const regime = 'Regime Geral';
        const produto = await produtoService.criarProduto(nome, descricao, preco, regime);
        const produtoCriado = await produtoService.encontrarPorId(produto.idProduto);
        const produtoGuardado = await produtoService.addQuantidade(produto.idProduto, 10)
        expect(produtoGuardado?.quantidade).toBe(10);
    })
})