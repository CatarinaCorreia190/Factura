import { ClienteService } from "./clienteService";
import { Fatura } from "../entity/fatura";
import {ItemFatura} from "../entity/ItemFatura";
import { TipoRegime } from "../entity/produto";
import {ProdutoService} from "./produtoService";
import {FaturaDatabase} from "../database/faturaDatabase";

export class FaturaService {
  private readonly _faturaDatabase: FaturaDatabase;
  private readonly _produtoService: ProdutoService;
  private readonly _clienteService: ClienteService;

  public constructor(
    faturaDatabase: FaturaDatabase,
    produtoService: ProdutoService,
    clienteService: ClienteService
  ) {
    this._faturaDatabase = faturaDatabase;
    this._produtoService = produtoService;
    this._clienteService = clienteService;
  }

  async criarFatura(idCliente: string, items: ItemInput[]): Promise<Fatura> {
    const clientAlreadyExists = await this._clienteService.encontrarPorId(idCliente);
    if (!clientAlreadyExists) throw new Error("Cliente inexistente");
    const fatura = new Fatura({ idCliente });
    for (const item of items) {
      const produto = await this._produtoService.encontrarPorId(item.idProduto);
      if (!produto) throw new Error("Produto não encontrado");
      if (produto.quantidade < item.quantidade) throw new Error("Quantidade insuficiente");
      const newItem = new ItemFatura({
        idFatura: fatura.idFatura,
        idProduto: item.idProduto,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
        imposto: produto.regime == TipoRegime.REGIME_GERAL ? 14 : 0,
      });
      fatura.addItem(newItem);
    }
    this._faturaDatabase.criar(fatura);
    return fatura;
  }

  async encontrarPorId(id: string): Promise<Fatura | undefined> {
    const fatura = await this._faturaDatabase.encontrarPorId(id);
    if (!fatura) return undefined;
    return fatura;
  }

  async encontrarTodas(): Promise<Fatura[]> {
    return await this._faturaDatabase.encontrarTodos();
  }

  async pagar(id: string): Promise<Fatura> {
    const fatura = await this._faturaDatabase.encontrarPorId(id);
    if (!fatura) throw new Error("Fatura inexistente");
    fatura.pagar()
    this._faturaDatabase.guardar(fatura);
    return fatura;
  }

  async anular(id: string): Promise<Fatura> {
    const fatura = await this._faturaDatabase.encontrarPorId(id);
    if (!fatura) throw new Error("Fatura inexistente");
    fatura.anular()
    this._faturaDatabase.guardar(fatura);
    return fatura;
  }

  //Imprimir PDF
}

type ItemInput = {
  idProduto: string;
  quantidade: number;
  imposto: number;
};