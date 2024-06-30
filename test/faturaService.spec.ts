import { ClienteService } from "../src/service/clienteService";
import { FaturaService } from "../src/service/faturaService";
import { ProdutoService } from "../src/service/produtoService";
import {ProdutoDatabase} from "../src/database/produtoDatabase";
import {ClienteDatabase} from "../src/database/clienteDatabase";
import {FaturaDatabase} from "../src/database/faturaDatabase";
import PgPromiseAdapter from "../src/database/pgPromiseAdapter";

let pgDatabaseAdapter;
let produtoDatabase;
let clienteDatabase;
let faturaDatabase;
let produtoService;
let clienteService;
let faturaService;

describe("FaturaService Unit Tests", () => {

  beforeAll(async () => {
    pgDatabaseAdapter = new PgPromiseAdapter()
    produtoDatabase = new ProdutoDatabase(pgDatabaseAdapter);
    clienteDatabase = new ClienteDatabase(pgDatabaseAdapter);
    faturaDatabase = new FaturaDatabase(pgDatabaseAdapter);
    produtoService = new ProdutoService(produtoDatabase);
    clienteService = new ClienteService(clienteDatabase);
    faturaService = new FaturaService(faturaDatabase, produtoService, clienteService);
  })

  test("Deve ser possível criar uma fatura", async () => {
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
    const fatura = await faturaService.encontrarPorId(newFatura.idFatura);
    console.log(fatura);
    expect(fatura?.total).toBeGreaterThan(6000);
  }, 10000)

  test('Should be able to get all invoices', async () => {
    const faturas = await faturaService.encontrarTodas();
    expect(faturas).toBeDefined();
    expect(faturas.length).toBeGreaterThan(1)
  }, 10000)

  afterAll(async () => {
    await pgDatabaseAdapter.close()
  })
})