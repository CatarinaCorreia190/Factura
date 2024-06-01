import {ProdutoService} from "../src/produtoService";
import {ItemFaturaService} from "../src/itemFaturaService";
import * as crypto from "node:crypto";



describe("ItemFaturaService unit tests", () => {
    test("Deve ser possível criar um item de fatura", () => {
        const produtoService = ProdutoService.getInstance();
        const nome = "arroz";
        const descricao = "Arroz Tio Lucas de 1KG";
        const preco = 2500;
        const regime = 'Regime Geral';
        const idProduto = produtoService.criarProduto(nome, descricao, preco, regime);
        produtoService.addQuantidade(idProduto, 10);
        const itemFatura = ItemFaturaService.getInstance(produtoService);
        const idFatura = crypto.randomUUID();
        const quantidade = 3;
        itemFatura.criarItemFatura(idFatura, idProduto, quantidade);
        const items = itemFatura.encontrarPorIdFatura(idFatura);
        expect(items![0].idFatura).toBe(idFatura);
        expect(items![0].precoUnitario).toBe(preco);
        expect(items![0].quantidade).toBe(quantidade);
        expect(items![0].totalSemImposto()).toBe(quantidade*preco);
        expect(items![0].total()).toBeGreaterThan(items![0].totalSemImposto());
    })
})