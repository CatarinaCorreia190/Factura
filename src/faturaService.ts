import { ClienteService } from "./clienteService";
import { Fatura } from "./fatura";
import {ItemFatura} from "./ItemFatura";
import { TipoRegime } from "./produto";
import {ProdutoService} from "./produtoService";

export class FaturaService {
  private static instance: FaturaService;
  private _faturas: Fatura[] = [];
  private readonly _produtoService: ProdutoService;
  private readonly _clienteService: ClienteService;

  private constructor(
    produtoService: ProdutoService,
    clienteService: ClienteService
  ) {
    this._produtoService = produtoService;
    this._clienteService = clienteService;
  }

  static getInstance(
    produtoService: ProdutoService,
    clienteService: ClienteService
  ) {
    if (!FaturaService.instance) {
      FaturaService.instance = new FaturaService(
        produtoService,
        clienteService
      );
    }
    return FaturaService.instance;
  }

  criarFatura(idCliente: string, items: ItemInput[]): string {
    const clientAlreadyExists = this._clienteService.encontrarPorId(idCliente);
    if (!clientAlreadyExists) throw new Error("Cliente inexistente");
    const fatura = new Fatura({ idCliente });
    items.forEach((item) => {
      const produto = this._produtoService.encontrarPorId(item.idProduto);
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
    });
    this._faturas.push(fatura);
    return fatura.idFatura;
  }

  encontrarPorId(id: string): Fatura | undefined {
    const fatura = this._faturas.filter((faturaE) => faturaE.idFatura == id)[0];
    if (!fatura) return undefined;
    return fatura;
  }

  encontrarTodas(): Fatura[] {
    return this._faturas;
  }

  guardar(fatura: Fatura): Fatura | undefined {
    const faturaIndex = this._faturas.findIndex((currentFatura) => currentFatura.idFatura === fatura.idFatura);
    if (faturaIndex === -1) return undefined;
    this._faturas[faturaIndex] = fatura;
  }


  anular(id: string): Fatura {
    const fatura = this._faturas.filter((faturaE) => faturaE.idFatura == id)[0];
    if (!fatura) throw new Error("Fatura inexistente");
    fatura.anular()
    this.guardar(fatura);
    return fatura;
  }

  //Imprimir PDF
}

type ItemInput = {
  idProduto: string;
  quantidade: number;
  imposto: number;
};