import {ProdutoService} from "../src/produtoService";
import {ClienteService} from "../src/clienteService";
import {FaturaService} from "../src/faturaService";
import {PagamentoService} from "../src/pagamentoService";

describe('PagamentoService unit tests', () => {
    test("Deve criar um pagamento e alterar o estado da fatura para pago", () => {
        const produtoService = ProdutoService.getInstance();
        const clienteService = ClienteService.getInstance();
        const faturaService = FaturaService.getInstance(produtoService, clienteService);
        const pagamentoService = PagamentoService.getInstance(faturaService);

        const idCliente = clienteService.criarCliente("Any Name", "0987654321LA098", "example@example.com", "Luanda, Angola");
        const idProduto_1 = produtoService.criarProduto("arroz", "Arroz Tio Lucas de 1KG", 500, "Regime Geral");
        const idProduto_2 = produtoService.criarProduto("feijão", "Feijão Amarelo 1KG", 2500, "Regime Geral");
        produtoService.addQuantidade(idProduto_1, 10);
        produtoService.addQuantidade(idProduto_2, 10);
        const produto_1 = produtoService.encontrarPorId(idProduto_1);
        const produto_2 = produtoService.encontrarPorId(idProduto_2);
        const items = [
            {
                idProduto: produto_1!.idProduto,
                quantidade: 2,
                imposto: 7,
            },
            {
                idProduto: produto_2!.idProduto,
                quantidade: 2,
                imposto: 7,
            },
        ];
        const idFatura = faturaService.criarFatura(idCliente, items);
        const idPagamento = pagamentoService.criarPagamento(idFatura, 7000)
        const pagamento = pagamentoService.encontrarPorId(idPagamento);
        const fatura = faturaService.encontrarPorId(idFatura);
        console.log(fatura);
        console.log(pagamento);
        expect(fatura?.estado).toBe("Pago");
        expect(pagamento?.idFatura).toBe(idFatura);
    })
})