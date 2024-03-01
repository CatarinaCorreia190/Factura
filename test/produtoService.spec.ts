import {ProdutoService} from "../src/produtoService";

describe('ProdutoService Unit Tests', () => {
    test('Deve criar um produto', async () => {
        const produtoService = ProdutoService.getInstance();
        const nome = "arroz";
        const descricao = "Arroz Tio Lucas de 1KG";
        const preco = 2500;
        const regime = 'Regime Geral';
        const idProduto = produtoService.criarProduto(nome, descricao, preco, regime);
        const produtoCriado = produtoService.encontrarPorId(idProduto);
        expect(produtoCriado?.idProduto).toBe(idProduto);
        expect(produtoCriado?.nome).toBe(nome);
        expect(produtoCriado?.descricao).toBe(descricao);
        expect(produtoCriado?.preco).toBe(preco);
        expect(produtoCriado?.regime).toBe(regime);
        expect(produtoCriado?.quantidade).toBe(0);
    })
})