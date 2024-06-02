import {ProdutoService} from "../src/service/produtoService";
import {ClienteService} from "../src/service/clienteService";
import {FaturaService} from "../src/service/faturaService";
import {PagamentoService} from "../src/service/pagamentoService";
import {ProdutoDatabase} from "../src/database/produtoDatabase";
import {ClienteDatabase} from "../src/database/clienteDatabase";
import {FaturaDatabase} from "../src/database/faturaDatabase";
import {PagamentoDatabase} from "../src/database/pagamentoDatabase";

describe('PagamentoService unit tests', () => {
    test("Deve criar um pagamento e alterar o estado da fatura para pago", async () => {
        const produtoDatabase = ProdutoDatabase.getInstance();
        const clienteDatabase = ClienteDatabase.getInstance()
        const faturaDatabase = FaturaDatabase.getInstance()
        const pagamentoDatabase = PagamentoDatabase.getInstance()
        const produtoService = new ProdutoService(produtoDatabase);
        const clienteService = new ClienteService(clienteDatabase);
        const faturaService = new FaturaService(faturaDatabase, produtoService, clienteService);
        const pagamentoService = new PagamentoService(pagamentoDatabase, faturaService);

        const cliente = await clienteService.criarCliente("Any Name", "0987654321LA098", "example@example.com", "Luanda, Angola");
        const Produto_1 = await produtoService.criarProduto("arroz", "Arroz Tio Lucas de 1KG", 500, "Regime Geral");
        const Produto_2 = await produtoService.criarProduto("feijão", "Feijão Amarelo 1KG", 2500, "Regime Geral");
        produtoService.addQuantidade(Produto_1.idProduto, 10);
        produtoService.addQuantidade(Produto_2.idProduto, 10);
        const produto_1 = await produtoService.encontrarPorId(Produto_1.idProduto);
        const produto_2 = await produtoService.encontrarPorId(Produto_2.idProduto);
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
        const newFatura = await faturaService.criarFatura(cliente.idCliente, items);
        const fatura = await faturaService.encontrarPorId(newFatura.idFatura);
        const newPagamento = await pagamentoService.criarPagamento(newFatura.idFatura, 7000)
        const pagamento = await pagamentoService.encontrarPorId(newPagamento.idPagamento);
        console.log(fatura);
        console.log(pagamento);
        expect(fatura?.estado).toBe("Pago");
        expect(pagamento?.idFatura).toBe(fatura?.idFatura);
    })
})