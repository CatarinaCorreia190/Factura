import { ClienteService } from "../src/service/clienteService";
import { FaturaService } from "../src/service/faturaService";
import { ProdutoService } from "../src/service/produtoService";
import {ProdutoDatabase} from "../src/database/produtoDatabase";
import {ClienteDatabase} from "../src/database/clienteDatabase";
import {FaturaDatabase} from "../src/database/faturaDatabase";

describe("FaturaService Unit Tests", () => {
  test("Deve ser possível criar uma fatura", async () => {
    const produtoDatabase = ProdutoDatabase.getInstance();
    const clienteDatabase = ClienteDatabase.getInstance()
    const faturaDatabase = FaturaDatabase.getInstance()
    const produtoService = new ProdutoService(produtoDatabase);
    const clienteService = new ClienteService(clienteDatabase);
    const faturaService = new FaturaService(faturaDatabase, produtoService, clienteService);

    const idCliente = await clienteService.criarCliente("Any Name", "0987654321LA098", "example@example.com", "Luanda, Angola");
    const idProduto_1 = await produtoService.criarProduto("arroz", "Arroz Tio Lucas de 1KG", 500, "Regime Geral");
    const idProduto_2 = await produtoService.criarProduto("feijão", "Feijão Amarelo 1KG", 2500, "Regime Geral");
    produtoService.addQuantidade(idProduto_1, 10);
    produtoService.addQuantidade(idProduto_2, 10);
    const produto_1 = await produtoService.encontrarPorId(idProduto_1);
    const produto_2 = await produtoService.encontrarPorId(idProduto_2);
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
    const idFatura = await faturaService.criarFatura(idCliente, items);
    const fatura = await faturaService.encontrarPorId(idFatura);
    console.log(fatura);
    expect(fatura?.total()).toBeGreaterThan(6000);
  })
})