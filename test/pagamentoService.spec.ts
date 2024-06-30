import {ProdutoService} from "../src/service/produtoService";
import {ClienteService} from "../src/service/clienteService";
import {FaturaService} from "../src/service/faturaService";
import {PagamentoService} from "../src/service/pagamentoService";
import {ProdutoDatabase} from "../src/database/produtoDatabase";
import {ClienteDatabase} from "../src/database/clienteDatabase";
import {FaturaDatabase} from "../src/database/faturaDatabase";
import {PagamentoDatabase} from "../src/database/pagamentoDatabase";
import PgPromiseAdapter from "../src/database/pgPromiseAdapter";

let pgDatabaseAdapter;
let produtoDatabase;
let clienteDatabase;
let faturaDatabase;
let produtoService;
let clienteService;
let faturaService;
let pagamentoDatabase;

describe('PagamentoService unit tests', () => {
    beforeAll(() => {
        pgDatabaseAdapter = new PgPromiseAdapter()
        produtoDatabase = new ProdutoDatabase(pgDatabaseAdapter);
        clienteDatabase = new ClienteDatabase(pgDatabaseAdapter)
        faturaDatabase = new FaturaDatabase(pgDatabaseAdapter)
        pagamentoDatabase = new PagamentoDatabase(pgDatabaseAdapter)
        produtoService = new ProdutoService(produtoDatabase);
        clienteService = new ClienteService(clienteDatabase);
        faturaService = new FaturaService(faturaDatabase, produtoService, clienteService);
    })

    test("Deve criar um pagamento e alterar o estado da fatura para pago", async () => {
        const pagamentoService = new PagamentoService(pagamentoDatabase, faturaService);

        const cliente = await clienteService.criarCliente("Any Name", `0987654321${Math.random()}LA098`, `example${Math.random()}@example.com`, "Luanda, Angola");
        const Produto_1 = await produtoService.criarProduto("arroz", "Arroz Tio Lucas de 1KG", 500, "Regime Geral");
        const Produto_2 = await produtoService.criarProduto("feijão", "Feijão Amarelo 1KG", 2500, "Regime Geral");
        await produtoService.addQuantidade(Produto_1.idProduto, 10);
        await produtoService.addQuantidade(Produto_2.idProduto, 10);
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
        const newPagamento = await pagamentoService.criarPagamento(newFatura.idFatura, 7000)
        const fatura = await faturaService.encontrarPorId(newFatura.idFatura);
        const pagamento = await pagamentoService.encontrarPorId(newPagamento.idPagamento);
        console.log(fatura);
        console.log(pagamento);
        expect(fatura?.estado).toBe("Pago");
        expect(pagamento?.idFatura).toBe(fatura?.idFatura);
    }, 10000);

    test('Should return all payments',  async () => {
        const pagamentoService = new PagamentoService(pagamentoDatabase, faturaService);
        const pagamentos = await pagamentoService.encontrarTodos()
        expect(pagamentos.length).toBeGreaterThan(1)
    })

    afterAll(() => {
        pgDatabaseAdapter.close()
    })
})